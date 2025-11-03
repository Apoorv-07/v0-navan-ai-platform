import express from "express"
import cors from "cors"
import authRoutes from "./routes/auth"
import { connectDB } from "./config/database"

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true,
  }),
)
app.use(express.json())

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ 
    status: "ok",
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  })
})

// Database health check endpoint
app.get("/api/health/db", async (req, res) => {
  try {
    const mongoose = await connectDB()
    const dbState = mongoose.connection.readyState
    const states = {
      0: "disconnected",
      1: "connected",
      2: "connecting",
      3: "disconnecting"
    }
    res.json({ 
      status: states[dbState] || "unknown",
      state: dbState
    })
  } catch (error) {
    res.status(503).json({ 
      status: "error",
      message: "Database connection failed",
      error: error.message
    })
  }
})

// Routes
app.use("/api/auth", authRoutes)

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error("Error:", err)
  const status = err.status || 500
  const message = err.message || "Internal server error"
  res.status(status).json({ 
    error: message,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack })
  })
})

// Graceful shutdown handler
process.on("SIGTERM", async () => {
  console.log("SIGTERM signal received: closing HTTP server")
  // Add shutdown logic here if needed
  process.exit(0)
})

// Start server
if (process.env.NODE_ENV !== "test") {
  connectDB()
    .then(() => {
      console.log("Database connected successfully")
      app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`)
        console.log(`Environment: ${process.env.NODE_ENV || "development"}`)
      })
    })
    .catch((error) => {
      console.error("Failed to start server:", error)
      console.error("Error details:", error.message)
      process.exit(1)
    })
}

export default app

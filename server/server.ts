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

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" })
})

// Routes
app.use("/api/auth", authRoutes)

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err)
  res.status(500).json({ error: "Internal server error" })
})

// Start server
if (process.env.NODE_ENV !== "test") {
  connectDB()
    .then(() => {
      app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`)
      })
    })
    .catch(console.error)
}

export default app

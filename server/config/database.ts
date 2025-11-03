import mongoose from "mongoose"

// MongoDB connection string from environment or fallback to provided connection string
const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://apoorvs07:Apoo@123@navan1.zf0nb6a.mongodb.net/?appName=Navan1"

// Global cache for MongoDB connection
let cached = global.mongoose

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null }
}

/**
 * Connect to MongoDB with proper error handling and connection options
 * @returns {Promise} MongoDB connection instance
 */
export async function connectDB() {
  // Return existing connection if available
  if (cached.conn) {
    console.log("Using cached MongoDB connection")
    return cached.conn
  }

  // Create new connection if no promise exists
  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      family: 4, // Use IPv4, skip trying IPv6
    }

    console.log("Connecting to MongoDB...")
    cached.promise = mongoose.connect(MONGODB_URI, opts)
      .then((mongoose) => {
        console.log("MongoDB connected successfully")
        return mongoose
      })
      .catch((error) => {
        console.error("MongoDB connection error:", error)
        cached.promise = null
        throw error
      })
  }

  try {
    cached.conn = await cached.promise
  } catch (e) {
    cached.promise = null
    console.error("Failed to establish MongoDB connection:", e)
    throw new Error(`MongoDB connection failed: ${e.message}`)
  }

  // Set up connection event listeners
  mongoose.connection.on("error", (err) => {
    console.error("MongoDB connection error:", err)
  })

  mongoose.connection.on("disconnected", () => {
    console.warn("MongoDB disconnected")
  })

  mongoose.connection.on("reconnected", () => {
    console.log("MongoDB reconnected")
  })

  return cached.conn
}

/**
 * Disconnect from MongoDB gracefully
 */
export async function disconnectDB() {
  try {
    if (cached.conn) {
      await mongoose.disconnect()
      cached.conn = null
      cached.promise = null
      console.log("MongoDB disconnected successfully")
    }
  } catch (error) {
    console.error("Error disconnecting from MongoDB:", error)
    throw error
  }
}

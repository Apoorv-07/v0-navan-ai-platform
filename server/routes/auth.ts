import express, { type Request, type Response } from "express"
import jwt from "jsonwebtoken"
import User from "../models/User"
import { connectDB } from "../config/database"

const router = express.Router()

router.post("/register", async (req: Request, res: Response) => {
  try {
    await connectDB()
    const { email, password } = req.body

    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" })
    }

    const user = new User({
      email,
      passwordHash: password,
      isVerified: false,
    })

    await user.save()

    const accessToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || "dev-secret", { expiresIn: "1h" })

    const refreshToken = jwt.sign({ userId: user._id }, process.env.JWT_REFRESH_SECRET || "dev-refresh-secret", {
      expiresIn: "7d",
    })

    user.refreshTokens.push(refreshToken)
    await user.save()

    res.status(201).json({
      accessToken,
      refreshToken,
      userId: user._id,
      companyId: user.companyId,
    })
  } catch (error) {
    res.status(500).json({ error: "Registration failed" })
  }
})

router.post("/login", async (req: Request, res: Response) => {
  try {
    await connectDB()
    const { email, password } = req.body

    const user = await User.findOne({ email })
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: "Invalid credentials" })
    }

    const accessToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || "dev-secret", { expiresIn: "1h" })

    const refreshToken = jwt.sign({ userId: user._id }, process.env.JWT_REFRESH_SECRET || "dev-refresh-secret", {
      expiresIn: "7d",
    })

    user.refreshTokens.push(refreshToken)
    await user.save()

    res.json({
      accessToken,
      refreshToken,
      userId: user._id,
      companyId: user.companyId,
    })
  } catch (error) {
    res.status(500).json({ error: "Login failed" })
  }
})

export default router

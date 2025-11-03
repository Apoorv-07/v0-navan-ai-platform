import express from "express"
import { authMiddleware, type AuthRequest } from "../middleware/auth"
import Message from "../models/Message"
import Match from "../models/Match"

const router = express.Router()

router.post("/", authMiddleware, async (req: AuthRequest, res) => {
  try {
    const { matchId, receiverId, content, attachments = [] } = req.body
    const senderId = req.userId

    // Verify match exists
    const match = await Match.findById(matchId)
    if (!match) {
      return res.status(404).json({ error: "Match not found" })
    }

    const message = new Message({
      matchId,
      senderId,
      receiverId,
      content,
      attachments,
    })

    await message.save()

    res.status(201).json(message)
  } catch (error) {
    res.status(500).json({ error: "Failed to send message" })
  }
})

router.get("/:matchId", authMiddleware, async (req, res) => {
  try {
    const { matchId } = req.params

    const messages = await Message.find({ matchId }).populate("senderId", "email").sort({ createdAt: 1 })

    res.json(messages)
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch messages" })
  }
})

router.patch("/:messageId/read", authMiddleware, async (req, res) => {
  try {
    const message = await Message.findByIdAndUpdate(req.params.messageId, { readAt: new Date() }, { new: true })
    res.json(message)
  } catch (error) {
    res.status(500).json({ error: "Failed to update message" })
  }
})

router.get("/", authMiddleware, async (req: AuthRequest, res) => {
  try {
    const messages = await Message.find({
      $or: [{ senderId: req.userId }, { receiverId: req.userId }],
    })
      .populate("matchId")
      .sort({ createdAt: -1 })

    // Group by conversation
    const conversations = new Map()
    messages.forEach((msg) => {
      const otherId = msg.senderId.toString() === req.userId ? msg.receiverId : msg.senderId
      const key = otherId.toString()
      if (!conversations.has(key)) {
        conversations.set(key, msg)
      }
    })

    res.json(Array.from(conversations.values()))
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch conversations" })
  }
})

export default router

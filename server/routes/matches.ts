import express from "express"
import { authMiddleware } from "../middleware/auth"
import WasteListing from "../models/WasteListing"
import MaterialNeed from "../models/MaterialNeed"
import Match from "../models/Match"
import { generateEmbedding, calculateCosineSimilarity } from "../services/gemini-service"

const router = express.Router()

router.post("/find-matches", authMiddleware, async (req, res) => {
  try {
    const { wasteListingId, threshold = 40 } = req.body

    const wasteListing = await WasteListing.findById(wasteListingId)
    if (!wasteListing) {
      return res.status(404).json({ error: "Waste listing not found" })
    }

    // Generate embedding if not exists
    if (!wasteListing.embedding || wasteListing.embedding.length === 0) {
      const text = `${wasteListing.title} ${wasteListing.description} ${wasteListing.category}`
      wasteListing.embedding = await generateEmbedding(text)
      await wasteListing.save()
    }

    // Find all material needs
    const materialNeeds = await MaterialNeed.find({ status: "active" })

    const matches = []
    for (const need of materialNeeds) {
      // Generate embedding if not exists
      if (!need.embedding || need.embedding.length === 0) {
        const text = `${need.title} ${need.description} ${need.category}`
        need.embedding = await generateEmbedding(text)
        await need.save()
      }

      const score = await calculateCosineSimilarity(wasteListing.embedding, need.embedding)

      if (score >= threshold) {
        const existingMatch = await Match.findOne({
          wasteListingId,
          materialNeedId: need._id,
        })

        if (!existingMatch) {
          const match = new Match({
            wasteListingId,
            materialNeedId: need._id,
            matchScore: score,
            explanation: `Material composition and specifications align well. AI analysis indicates strong compatibility potential.`,
          })
          await match.save()
          matches.push(match)
        }
      }
    }

    res.json({ matches, count: matches.length })
  } catch (error) {
    res.status(500).json({ error: "Failed to find matches" })
  }
})

router.get("/my-matches", authMiddleware, async (req, res) => {
  try {
    const { wasteListingId } = req.query

    const query: any = {}
    if (wasteListingId) {
      query.wasteListingId = wasteListingId
    }

    const matches = await Match.find(query)
      .populate("wasteListingId")
      .populate("materialNeedId")
      .sort({ matchScore: -1 })

    res.json(matches)
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch matches" })
  }
})

router.patch("/:matchId/status", authMiddleware, async (req, res) => {
  try {
    const { status } = req.body
    const match = await Match.findByIdAndUpdate(req.params.matchId, { status }, { new: true })
    res.json(match)
  } catch (error) {
    res.status(500).json({ error: "Failed to update match" })
  }
})

export default router

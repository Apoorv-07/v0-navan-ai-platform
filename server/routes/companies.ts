import express from "express"
import { authMiddleware, type AuthRequest } from "../middleware/auth"
import Company from "../models/Company"
import Match from "../models/Match"
import Message from "../models/Message"
import WasteListing from "../models/WasteListing"

const router = express.Router()

router.get("/:companyId", async (req, res) => {
  try {
    const company = await Company.findById(req.params.companyId).populate("users", "email")
    if (!company) {
      return res.status(404).json({ error: "Company not found" })
    }
    res.json(company)
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch company" })
  }
})

router.patch("/:companyId", authMiddleware, async (req: AuthRequest, res) => {
  try {
    const { name, industry, location, description, logoUrl } = req.body

    const company = await Company.findByIdAndUpdate(
      req.params.companyId,
      { name, industry, location, description, logoUrl },
      { new: true },
    )

    res.json(company)
  } catch (error) {
    res.status(500).json({ error: "Failed to update company" })
  }
})

router.get("/:companyId/analytics", async (req, res) => {
  try {
    const { companyId } = req.params

    // Get all matches for this company (both waste listings and material needs)
    const wasteListings = await WasteListing.find({ companyId })
    const wasteListingIds = wasteListings.map((w) => w._id)

    const matches = await Match.find({
      wasteListingId: { $in: wasteListingIds },
    })
      .populate("wasteListingId")
      .lean()

    // Group matches by month for timeline
    const matchesByMonth: { [key: string]: { matches: number; contacts: number } } = {}
    matches.forEach((match) => {
      const date = new Date(match.createdAt)
      const monthKey = date.toLocaleString("default", { month: "short" })
      if (!matchesByMonth[monthKey]) {
        matchesByMonth[monthKey] = { matches: 0, contacts: 0 }
      }
      matchesByMonth[monthKey].matches += 1
      if (match.status !== "new") {
        matchesByMonth[monthKey].contacts += 1
      }
    })

    // Get waste by category
    const wasteByCategory: { [key: string]: number } = {}
    wasteListings.forEach((listing) => {
      wasteByCategory[listing.category] = (wasteByCategory[listing.category] || 0) + listing.quantity
    })

    // Calculate match quality distribution
    const matchQuality = {
      excellent: matches.filter((m) => m.matchScore >= 80).length,
      good: matches.filter((m) => m.matchScore >= 60 && m.matchScore < 80).length,
      moderate: matches.filter((m) => m.matchScore < 60).length,
    }

    // Get messages count
    const messagingMatches = matches.map((m) => m._id)
    const messages = await Message.find({
      matchId: { $in: messagingMatches },
    })

    // Calculate statistics
    const totalMatches = matches.length
    const contactedMatches = matches.filter((m) => m.status !== "new").length
    const avgMatchScore = matches.length > 0 ? matches.reduce((sum, m) => sum + m.matchScore, 0) / matches.length : 0
    const conversionRate = matches.length > 0 ? (contactedMatches / matches.length) * 100 : 0

    // Calculate environmental impact (placeholder calculations)
    const co2Saved = wasteListings.reduce((sum, listing) => {
      return sum + listing.quantity * 2.5 // ~2.5kg CO2 per unit diverted
    }, 0)
    const waterSaved = wasteListings.reduce((sum, listing) => {
      return sum + listing.quantity * 50 // ~50L water per unit diverted
    }, 0)
    const energySaved = wasteListings.reduce((sum, listing) => {
      return sum + listing.quantity * 0.5 // ~0.5 kWh per unit diverted
    }, 0)

    const monthlyData = Object.entries(matchesByMonth).map(([month, data]) => ({
      month,
      matches: data.matches,
      contacts: data.contacts,
    }))

    const categoryData = Object.entries(wasteByCategory).map(([category, amount]) => ({
      category,
      amount,
    }))

    res.json({
      matchesByMonth: monthlyData,
      wasteByCategory: categoryData,
      matchQuality: {
        excellent: matchQuality.excellent,
        good: matchQuality.good,
        moderate: matchQuality.moderate,
      },
      statistics: {
        totalMatches,
        contactedMatches,
        avgMatchScore: Math.round(avgMatchScore),
        conversionRate: Math.round(conversionRate),
        messageCount: messages.length,
      },
      environmental: {
        co2Saved: Math.round(co2Saved),
        waterSaved: Math.round(waterSaved),
        energySaved: Math.round(energySaved),
      },
    })
  } catch (error) {
    console.error("Analytics error:", error)
    res.status(500).json({ error: "Failed to fetch analytics" })
  }
})

export default router

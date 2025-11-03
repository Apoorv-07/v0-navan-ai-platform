"use client"

import { useState } from "react"
import { Navbar } from "@/components/Navbar"
import { Sidebar } from "@/components/Sidebar"
import { MatchCard } from "@/components/MatchCard"
import { MatchFilters } from "@/components/MatchFilters"
import { MatchExplanationModal } from "@/components/MatchExplanationModal"

const mockMatches = [
  {
    id: 1,
    title: "Industrial Plastic Pellets",
    company: "TechRecycle Inc.",
    location: "Los Angeles, CA",
    matchScore: 92,
    quantity: "500kg/week",
    category: "Plastics",
    explanation:
      "High-quality plastic waste matches your specified composition requirements perfectly. Nearby location reduces transportation costs.",
  },
  {
    id: 2,
    title: "Metal Scraps - Aluminum",
    company: "MetalWorks Ltd.",
    location: "San Francisco, CA",
    matchScore: 78,
    quantity: "200 units/month",
    category: "Metals",
    explanation:
      "Good material grade match with compatible specifications. Existing logistics network can facilitate transport.",
  },
  {
    id: 3,
    title: "Textile Waste - Cotton Blend",
    company: "Sustainable Fabrics Co.",
    location: "Long Beach, CA",
    matchScore: 65,
    quantity: "1 ton/week",
    category: "Textiles",
    explanation: "Moderate match on material type. Additional processing may be required for your specifications.",
  },
  {
    id: 4,
    title: "Electronics E-Waste",
    company: "CircuitSalvage",
    location: "Oakland, CA",
    matchScore: 88,
    quantity: "100kg/month",
    category: "Electronics",
    explanation: "Excellent match for refurbishment potential. Similar quality standards and market demand.",
  },
]

export default function MatchesPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [selectedMatch, setSelectedMatch] = useState<(typeof mockMatches)[0] | null>(null)
  const [showExplanation, setShowExplanation] = useState(false)

  return (
    <main className="min-h-screen grid-bg">
      <Navbar />
      <div className="flex pt-20">
        <Sidebar />
        <div className="flex-1 p-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar Filters */}
            <div className="lg:col-span-1">
              <MatchFilters onFilterChange={(filters) => console.log("Filters:", filters)} />
            </div>

            {/* Matches Grid */}
            <div className="lg:col-span-3 space-y-8">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-4xl font-bold text-glow mb-2">AI Matches</h1>
                  <p className="text-foreground/60">Found {mockMatches.length} perfect matches for your needs</p>
                </div>

                {/* View toggle */}
                <div className="flex gap-2">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`px-4 py-2 rounded-lg transition ${
                      viewMode === "grid" ? "glass-hover" : "text-foreground/60"
                    }`}
                  >
                    Grid
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`px-4 py-2 rounded-lg transition ${
                      viewMode === "list" ? "glass-hover" : "text-foreground/60"
                    }`}
                  >
                    List
                  </button>
                </div>
              </div>

              {/* Matches */}
              <div className={`${viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 gap-4" : "space-y-4"}`}>
                {mockMatches.map((match) => (
                  <MatchCard
                    key={match.id}
                    title={match.title}
                    company={match.company}
                    location={match.location}
                    matchScore={match.matchScore}
                    quantity={match.quantity}
                    category={match.category}
                    onView={() => {
                      setSelectedMatch(match)
                      setShowExplanation(true)
                    }}
                    onContact={() => console.log("Contact:", match.company)}
                  />
                ))}
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-center gap-2">
                <button className="px-4 py-2 glass-hover rounded-lg">Previous</button>
                {[1, 2, 3, 4, 5].map((page) => (
                  <button
                    key={page}
                    className={`w-10 h-10 rounded-lg transition ${
                      page === 1
                        ? "bg-gradient-to-r from-cyan-500/30 to-green-500/30 border border-cyan-500/50"
                        : "glass-hover"
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <button className="px-4 py-2 glass-hover rounded-lg">Next</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Match Explanation Modal */}
      {selectedMatch && (
        <MatchExplanationModal
          isOpen={showExplanation}
          onClose={() => setShowExplanation(false)}
          wasteTitle={selectedMatch.title}
          needTitle="Your Material Need"
          matchScore={selectedMatch.matchScore}
          explanation={selectedMatch.explanation}
        />
      )}
    </main>
  )
}

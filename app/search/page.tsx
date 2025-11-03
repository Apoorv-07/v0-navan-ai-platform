"use client"

import { useState } from "react"
import { Navbar } from "@/components/Navbar"
import { Sidebar } from "@/components/Sidebar"
import { SearchBar } from "@/components/SearchBar"
import { CategoryBrowser } from "@/components/CategoryBrowser"
import { MatchCard } from "@/components/MatchCard"

const mockResults = [
  {
    id: 1,
    title: "Industrial Plastic Pellets",
    company: "TechRecycle Inc.",
    location: "Los Angeles, CA",
    matchScore: 92,
    quantity: "500kg/week",
    category: "Plastics",
  },
  {
    id: 2,
    title: "Metal Scraps - Aluminum",
    company: "MetalWorks Ltd.",
    location: "San Francisco, CA",
    matchScore: 78,
    quantity: "200 units/month",
    category: "Metals",
  },
]

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState("relevance")

  return (
    <main className="min-h-screen grid-bg">
      <Navbar />
      <div className="flex pt-20">
        <Sidebar />
        <div className="flex-1 p-8">
          <div className="space-y-8">
            {/* Search section */}
            <div className="space-y-4">
              <div>
                <h1 className="text-4xl font-bold text-glow mb-2">Discover Materials</h1>
                <p className="text-foreground/60">Find waste streams and materials from suppliers worldwide</p>
              </div>

              <SearchBar onSearch={setSearchQuery} />

              {/* Sort dropdown */}
              <div className="flex items-center gap-4">
                <label className="text-foreground/60 text-sm">Sort by:</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="glass px-4 py-2 text-foreground text-sm rounded-lg"
                >
                  <option value="relevance">Relevance</option>
                  <option value="newest">Newest</option>
                  <option value="match-score">Best Match</option>
                  <option value="quantity">Quantity</option>
                </select>
              </div>
            </div>

            {/* Search results or category browser */}
            {searchQuery || selectedCategory ? (
              <div className="space-y-6">
                <p className="text-foreground/60">
                  Found {mockResults.length} results {searchQuery ? `for "${searchQuery}"` : `in ${selectedCategory}`}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {mockResults.map((result) => (
                    <MatchCard
                      key={result.id}
                      title={result.title}
                      company={result.company}
                      location={result.location}
                      matchScore={result.matchScore}
                      quantity={result.quantity}
                      category={result.category}
                      onView={() => console.log("View:", result.id)}
                      onContact={() => console.log("Contact:", result.company)}
                    />
                  ))}
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-center gap-2">
                  <button className="px-4 py-2 glass-hover rounded-lg">Previous</button>
                  <button className="w-10 h-10 rounded-lg bg-gradient-to-r from-cyan-500/30 to-green-500/30 border border-cyan-500/50">
                    1
                  </button>
                  <button className="w-10 h-10 rounded-lg glass-hover">2</button>
                  <button className="px-4 py-2 glass-hover rounded-lg">Next</button>
                </div>
              </div>
            ) : (
              <CategoryBrowser onSelectCategory={setSelectedCategory} />
            )}
          </div>
        </div>
      </div>
    </main>
  )
}

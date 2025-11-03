"use client"

import { useState } from "react"

interface MatchFiltersProps {
  onFilterChange: (filters: any) => void
}

export function MatchFilters({ onFilterChange }: MatchFiltersProps) {
  const [expandedFilters, setExpandedFilters] = useState<string | null>(null)
  const [filters, setFilters] = useState({
    scoreMin: 40,
    distance: 500,
    categories: [] as string[],
  })

  const categories = ["Plastics", "Metals", "Electronics", "Textiles", "Paper", "Glass", "Organic"]

  const handleCategoryToggle = (category: string) => {
    const updated = filters.categories.includes(category)
      ? filters.categories.filter((c) => c !== category)
      : [...filters.categories, category]

    const newFilters = { ...filters, categories: updated }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  const handleScoreChange = (value: number) => {
    const newFilters = { ...filters, scoreMin: value }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  const handleDistanceChange = (value: number) => {
    const newFilters = { ...filters, distance: value }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  return (
    <div className="glass p-6 space-y-4 h-fit sticky top-28">
      <h3 className="text-lg font-bold text-foreground">Filters</h3>

      {/* Match Score Filter */}
      <div>
        <button
          onClick={() => setExpandedFilters(expandedFilters === "score" ? null : "score")}
          className="w-full text-left font-medium text-foreground/80 flex items-center justify-between"
        >
          Match Score
          <span>{expandedFilters === "score" ? "−" : "+"}</span>
        </button>

        {expandedFilters === "score" && (
          <div className="mt-4 space-y-2">
            <input
              type="range"
              min="0"
              max="100"
              value={filters.scoreMin}
              onChange={(e) => handleScoreChange(Number(e.target.value))}
              className="w-full"
            />
            <p className="text-sm text-foreground/60">Minimum: {filters.scoreMin}%</p>
          </div>
        )}
      </div>

      {/* Distance Filter */}
      <div>
        <button
          onClick={() => setExpandedFilters(expandedFilters === "distance" ? null : "distance")}
          className="w-full text-left font-medium text-foreground/80 flex items-center justify-between"
        >
          Distance
          <span>{expandedFilters === "distance" ? "−" : "+"}</span>
        </button>

        {expandedFilters === "distance" && (
          <div className="mt-4 space-y-2">
            <input
              type="range"
              min="0"
              max="1000"
              value={filters.distance}
              onChange={(e) => handleDistanceChange(Number(e.target.value))}
              className="w-full"
            />
            <p className="text-sm text-foreground/60">{filters.distance} km radius</p>
          </div>
        )}
      </div>

      {/* Category Filter */}
      <div>
        <button
          onClick={() => setExpandedFilters(expandedFilters === "category" ? null : "category")}
          className="w-full text-left font-medium text-foreground/80 flex items-center justify-between"
        >
          Category
          <span>{expandedFilters === "category" ? "−" : "+"}</span>
        </button>

        {expandedFilters === "category" && (
          <div className="mt-4 space-y-2">
            {categories.map((cat) => (
              <label key={cat} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.categories.includes(cat)}
                  onChange={() => handleCategoryToggle(cat)}
                  className="w-4 h-4"
                />
                <span className="text-foreground/80 text-sm">{cat}</span>
              </label>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

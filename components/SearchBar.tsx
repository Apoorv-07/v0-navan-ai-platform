"use client"

import { useState } from "react"

interface SearchBarProps {
  onSearch: (query: string) => void
}

export function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState("")
  const [showSuggestions, setShowSuggestions] = useState(false)

  const suggestions = ["Plastic waste", "Metal scraps", "Electronic waste", "Textile materials", "Paper recyclables"]

  const handleSearch = (searchQuery: string) => {
    onSearch(searchQuery)
    setShowSuggestions(false)
  }

  return (
    <div className="relative w-full max-w-2xl">
      <div className="glass flex items-center gap-2 px-4">
        <span className="text-xl">🔍</span>
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setShowSuggestions(true)
          }}
          onKeyPress={(e) => e.key === "Enter" && handleSearch(query)}
          onFocus={() => setShowSuggestions(true)}
          placeholder="Search listings, companies, or materials..."
          className="flex-1 bg-transparent py-3 text-foreground placeholder-muted-foreground focus:outline-none"
        />
        <button
          onClick={() => handleSearch(query)}
          className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-green-500 text-background font-semibold rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 transition"
        >
          Search
        </button>
      </div>

      {showSuggestions && (
        <div className="absolute top-full mt-2 w-full glass rounded-lg overflow-hidden z-10">
          {suggestions.map((suggestion) => (
            <button
              key={suggestion}
              onClick={() => handleSearch(suggestion)}
              className="w-full text-left px-4 py-2 text-foreground/80 hover:bg-white/10 transition border-b border-white/5 last:border-b-0"
            >
              <span className="text-muted-foreground">🔍</span> {suggestion}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

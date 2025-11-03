"use client"

const categories = [
  { name: "Plastics", icon: "♻️", color: "from-cyan-500 to-blue-500" },
  { name: "Metals", icon: "🔧", color: "from-gray-400 to-gray-500" },
  { name: "Electronics", icon: "📱", color: "from-purple-500 to-pink-500" },
  { name: "Textiles", icon: "👕", color: "from-rose-500 to-pink-500" },
  { name: "Paper", icon: "📄", color: "from-amber-500 to-orange-500" },
  { name: "Glass", icon: "🥤", color: "from-blue-300 to-blue-400" },
  { name: "Organic", icon: "🌱", color: "from-green-500 to-emerald-500" },
  { name: "Mixed", icon: "📦", color: "from-gray-500 to-slate-600" },
]

interface CategoryBrowserProps {
  onSelectCategory: (category: string) => void
}

export function CategoryBrowser({ onSelectCategory }: CategoryBrowserProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-glow mb-4">Browse by Category</h2>
        <p className="text-foreground/60">Explore materials and waste streams</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {categories.map((category) => (
          <button
            key={category.name}
            onClick={() => onSelectCategory(category.name)}
            className="glass-hover p-6 space-y-3 group"
          >
            <div className={`text-5xl transform group-hover:scale-110 transition`}>{category.icon}</div>
            <p className="font-bold text-foreground">{category.name}</p>
          </button>
        ))}
      </div>
    </div>
  )
}

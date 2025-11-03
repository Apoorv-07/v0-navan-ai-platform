"use client"

interface MatchCardProps {
  title: string
  company: string
  location: string
  matchScore: number
  quantity: string
  category: string
  onView: () => void
  onContact: () => void
}

export function MatchCard({
  title,
  company,
  location,
  matchScore,
  quantity,
  category,
  onView,
  onContact,
}: MatchCardProps) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return "from-green-500 to-green-400"
    if (score >= 60) return "from-yellow-500 to-yellow-400"
    return "from-orange-500 to-orange-400"
  }

  const getScoreLabel = (score: number) => {
    if (score >= 80) return "Excellent"
    if (score >= 60) return "Good"
    return "Moderate"
  }

  return (
    <div className="glass-hover p-6 space-y-4">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-foreground mb-1">{title}</h3>
          <p className="text-foreground/60 text-sm">{company}</p>
          <p className="text-foreground/40 text-xs">{location}</p>
        </div>

        {/* Match score circle */}
        <div className="relative w-24 h-24 flex items-center justify-center">
          <svg className="transform -rotate-90" viewBox="0 0 100 100" width="100" height="100">
            <circle cx="50" cy="50" r="45" fill="none" stroke="rgb(51, 65, 85)" strokeWidth="4" />
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke={`url(#scoreGradient${matchScore})`}
              strokeWidth="4"
              strokeDasharray={`${2 * Math.PI * 45 * (matchScore / 100)} ${2 * Math.PI * 45}`}
              strokeLinecap="round"
            />
            <defs>
              <linearGradient id={`scoreGradient${matchScore}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop
                  offset="0%"
                  stopColor={
                    getScoreColor(matchScore).split(" ")[0] === "from-green-500"
                      ? "#22c55e"
                      : getScoreColor(matchScore).split(" ")[0] === "from-yellow-500"
                        ? "#eab308"
                        : "#f97316"
                  }
                />
                <stop
                  offset="100%"
                  stopColor={
                    getScoreColor(matchScore).split(" ")[1].replace("to-", "") === "green-400"
                      ? "#4ade80"
                      : getScoreColor(matchScore).split(" ")[1].replace("to-", "") === "yellow-400"
                        ? "#facc15"
                        : "#fb923c"
                  }
                />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute text-center">
            <div className="text-3xl font-bold text-glow">{matchScore}%</div>
            <p className="text-xs text-foreground/60">{getScoreLabel(matchScore)}</p>
          </div>
        </div>
      </div>

      <div className="flex gap-2 text-sm">
        <span className="px-3 py-1 glass rounded-full text-foreground/80">{category}</span>
        <span className="px-3 py-1 glass rounded-full text-foreground/80">{quantity}</span>
      </div>

      <div className="flex gap-3">
        <button onClick={onView} className="flex-1 px-4 py-2 glass-hover rounded-lg font-medium transition">
          View Details
        </button>
        <button
          onClick={onContact}
          className="flex-1 px-4 py-2 bg-gradient-to-r from-cyan-500 to-green-500 text-background font-medium rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 transition"
        >
          Contact
        </button>
      </div>
    </div>
  )
}

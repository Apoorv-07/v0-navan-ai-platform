"use client"

export function DashboardOverview() {
  const stats = [
    { label: "Active Listings", value: "12", color: "from-cyan-500 to-blue-500" },
    { label: "Match Count", value: "8", color: "from-green-500 to-cyan-500" },
    { label: "Messages", value: "5", color: "from-purple-500 to-pink-500" },
    { label: "CO₂ Saved", value: "2.4T", color: "from-green-500 to-lime-500" },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-glow mb-2">Welcome back!</h1>
        <p className="text-foreground/60">Here's your waste symbiosis dashboard</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="glass-hover p-6 space-y-4">
            <p className="text-foreground/60 text-sm">{stat.label}</p>
            <div className={`text-4xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
              {stat.value}
            </div>
          </div>
        ))}
      </div>

      <div>
        <h2 className="text-2xl font-bold text-foreground mb-4">Recent Matches</h2>
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="glass-hover p-4 flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Plastic Waste Match</p>
                <p className="text-foreground/60 text-sm">Company XYZ - Match Score: 85%</p>
              </div>
              <button className="px-4 py-2 bg-cyan-500/20 text-cyan-400 rounded-lg hover:bg-cyan-500/30 transition">
                View
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

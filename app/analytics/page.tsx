"use client"

import { useEffect, useState } from "react"
import { Navbar } from "@/components/Navbar"
import { Sidebar } from "@/components/Sidebar"
import { AnalyticsChart } from "@/components/AnalyticsChart"
import { ImpactCalculator } from "@/components/ImpactCalculator"
import { useAuth } from "@/hooks/useAuth"

export default function AnalyticsPage() {
  const { user } = useAuth()
  const [analytics, setAnalytics] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        if (!user?.companyId) {
          setLoading(false)
          return
        }

        const response = await fetch(`/api/companies/${user.companyId}/analytics`)
        if (!response.ok) throw new Error("Failed to fetch analytics")

        const data = await response.json()
        setAnalytics(data)
      } catch (error) {
        console.error("Error fetching analytics:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchAnalytics()
  }, [user?.companyId])

  if (loading) {
    return (
      <main className="min-h-screen grid-bg">
        <Navbar />
        <div className="flex pt-20">
          <Sidebar />
          <div className="flex-1 p-8">
            <div className="glass p-8 text-center">Loading analytics...</div>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen grid-bg">
      <Navbar />
      <div className="flex pt-20">
        <Sidebar />
        <div className="flex-1 p-8 space-y-8">
          <div>
            <h1 className="text-4xl font-bold text-glow mb-2">Analytics & Impact</h1>
            <p className="text-foreground/60">Track your waste management performance and environmental impact</p>
          </div>

          <ImpactCalculator
            environmental={{
              co2: analytics?.environmental.co2Saved || 0,
              water: analytics?.environmental.waterSaved || 0,
              energy: analytics?.environmental.energySaved || 0,
            }}
          />

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="glass p-6 space-y-4">
              <h3 className="text-xl font-bold text-foreground">Matches & Contacts Over Time</h3>
              <AnalyticsChart type="line" data={analytics?.matchesByMonth} />
            </div>

            <div className="glass p-6 space-y-4">
              <h3 className="text-xl font-bold text-foreground">Waste by Category</h3>
              <AnalyticsChart type="bar" data={analytics?.wasteByCategory} />
            </div>
          </div>

          {/* Match Quality Distribution */}
          <div className="glass p-6 space-y-4">
            <h3 className="text-xl font-bold text-foreground">Match Quality Distribution</h3>
            {analytics?.matchQuality && (
              <AnalyticsChart
                type="pie"
                data={[
                  { name: `Excellent (80+)`, value: analytics.matchQuality.excellent, color: "#22c55e" },
                  { name: `Good (60-79)`, value: analytics.matchQuality.good, color: "#eab308" },
                  { name: `Moderate (40-59)`, value: analytics.matchQuality.moderate, color: "#f97316" },
                ]}
              />
            )}
          </div>

          {/* Insights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="glass p-6 space-y-2">
              <p className="text-foreground/60 text-sm">Best Category</p>
              <p className="text-2xl font-bold text-glow">{analytics?.wasteByCategory?.[0]?.category || "N/A"}</p>
              <p className="text-xs text-foreground/40">
                {analytics?.matchesByMonth?.[0]?.matches || 0} matches this period
              </p>
            </div>
            <div className="glass p-6 space-y-2">
              <p className="text-foreground/60 text-sm">Avg Match Score</p>
              <p className="text-2xl font-bold text-glow">{analytics?.statistics?.avgMatchScore || 0}%</p>
              <p className="text-xs text-foreground/40">Quality indicator</p>
            </div>
            <div className="glass p-6 space-y-2">
              <p className="text-foreground/60 text-sm">Conversion Rate</p>
              <p className="text-2xl font-bold text-glow">{Math.round(analytics?.statistics?.conversionRate || 0)}%</p>
              <p className="text-xs text-foreground/40">Contacts → Transactions</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

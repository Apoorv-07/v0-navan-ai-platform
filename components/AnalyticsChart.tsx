"use client"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

interface AnalyticsChartProps {
  type: "line" | "bar" | "pie"
  data?: any[]
}

export function AnalyticsChart({ type, data }: AnalyticsChartProps) {
  // Default data for fallback
  const lineData = data || [
    { month: "Jan", matches: 12, contacts: 8 },
    { month: "Feb", matches: 19, contacts: 14 },
    { month: "Mar", matches: 15, contacts: 11 },
    { month: "Apr", matches: 28, contacts: 22 },
    { month: "May", matches: 35, contacts: 29 },
    { month: "Jun", matches: 42, contacts: 38 },
  ]

  const barData = data || [
    { category: "Plastics", amount: 1200 },
    { category: "Metals", amount: 850 },
    { category: "Electronics", amount: 620 },
    { category: "Textiles", amount: 450 },
    { category: "Paper", amount: 380 },
  ]

  const pieData = data || [
    { name: "Excellent (80+)", value: 45, color: "#22c55e" },
    { name: "Good (60-79)", value: 35, color: "#eab308" },
    { name: "Moderate (40-59)", value: 20, color: "#f97316" },
  ]

  return (
    <div className="w-full h-80">
      <ResponsiveContainer width="100%" height="100%">
        {type === "line" ? (
          <LineChart data={lineData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis stroke="rgba(255,255,255,0.6)" />
            <YAxis stroke="rgba(255,255,255,0.6)" />
            <Tooltip contentStyle={{ backgroundColor: "rgba(26,31,58,0.8)", border: "none", borderRadius: "8px" }} />
            <Legend />
            <Line type="monotone" dataKey="matches" stroke="#00d9ff" strokeWidth={2} dot={{ fill: "#00d9ff" }} />
            <Line type="monotone" dataKey="contacts" stroke="#39ff14" strokeWidth={2} dot={{ fill: "#39ff14" }} />
          </LineChart>
        ) : type === "bar" ? (
          <BarChart data={barData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis stroke="rgba(255,255,255,0.6)" dataKey="category" />
            <YAxis stroke="rgba(255,255,255,0.6)" />
            <Tooltip contentStyle={{ backgroundColor: "rgba(26,31,58,0.8)", border: "none", borderRadius: "8px" }} />
            <Bar dataKey="amount" fill="#00d9ff" radius={[8, 8, 0, 0]} />
          </BarChart>
        ) : (
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, value }) => `${name} ${value}%`}
              outerRadius={120}
              fill="#8884d8"
              dataKey="value"
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip contentStyle={{ backgroundColor: "rgba(26,31,58,0.8)", border: "none", borderRadius: "8px" }} />
          </PieChart>
        )}
      </ResponsiveContainer>
    </div>
  )
}

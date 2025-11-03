"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"

interface ChecklistGroup {
  title: string
  description: string
  items: ChecklistItem[]
}

interface ChecklistItem {
  id: string
  label: string
  completed: boolean
}

export default function DeploymentChecklist() {
  const [groups, setGroups] = useState<ChecklistGroup[]>([
    {
      title: "Prerequisites",
      description: "Ensure all required tools are installed",
      items: [
        { id: "node", label: "Node.js v18+ installed (verify: node --version)", completed: false },
        { id: "npm", label: "npm installed (verify: npm --version)", completed: false },
        { id: "git", label: "Git installed (verify: git --version)", completed: false },
        { id: "mongodb", label: "MongoDB Atlas account created or local MongoDB installed", completed: false },
      ],
    },
    {
      title: "Local Development Setup",
      description: "Get Navan running on your computer",
      items: [
        { id: "clone", label: "Repository cloned", completed: false },
        { id: "env-backend", label: "Backend .env file created with MONGODB_URI", completed: false },
        { id: "env-frontend", label: "Frontend .env.local created with NEXT_PUBLIC_API_URL", completed: false },
        { id: "install-root", label: "Root dependencies installed (npm install)", completed: false },
        { id: "install-server", label: "Backend dependencies installed (cd server && npm install)", completed: false },
        {
          id: "install-frontend",
          label: "Frontend dependencies installed (cd frontend && npm install)",
          completed: false,
        },
        { id: "mongodb-conn", label: "MongoDB connection tested successfully", completed: false },
      ],
    },
    {
      title: "Local Testing",
      description: "Verify core functionality works locally",
      items: [
        { id: "backend-running", label: "Backend running on localhost:5000 without errors", completed: false },
        { id: "frontend-running", label: "Frontend running on localhost:3000 without errors", completed: false },
        { id: "landing-page", label: "Can access landing page in browser", completed: false },
        { id: "register", label: "Can register new user account", completed: false },
        { id: "login", label: "Can login with registered credentials", completed: false },
        { id: "waste-listing", label: "Can create waste listing", completed: false },
        { id: "material-need", label: "Can create material need", completed: false },
        { id: "dashboard", label: "Can access dashboard after login", completed: false },
        { id: "matches", label: "Can view matches", completed: false },
        { id: "analytics", label: "Can view analytics dashboard", completed: false },
        { id: "messages", label: "Can send and receive messages", completed: false },
        { id: "no-console-errors", label: "No console errors in browser (press F12)", completed: false },
      ],
    },
    {
      title: "Production Deployment",
      description: "Prepare for deployment to hosting",
      items: [
        { id: "hosting-account", label: "Hosting account created (Render/Vercel/Railway)", completed: false },
        {
          id: "mongodb-prod",
          label: "Production MongoDB Atlas cluster created with new credentials",
          completed: false,
        },
        { id: "jwt-secrets", label: "Generated new JWT secrets for production", completed: false },
        { id: "env-prod", label: "Production environment variables configured on hosting platform", completed: false },
        { id: "git-ready", label: "All code committed and pushed to main branch", completed: false },
        { id: "backend-deployed", label: "Backend deployed and running on production server", completed: false },
        { id: "frontend-deployed", label: "Frontend deployed and accessible", completed: false },
        { id: "backend-url", label: "Copied production backend URL to frontend env vars", completed: false },
        { id: "cors-updated", label: "Backend CORS updated with production frontend URL", completed: false },
      ],
    },
    {
      title: "Production Testing",
      description: "Verify everything works in production",
      items: [
        { id: "prod-register", label: "Can register in production", completed: false },
        { id: "prod-login", label: "Can login in production", completed: false },
        { id: "prod-listing", label: "Can create listing in production", completed: false },
        { id: "prod-db", label: "Data persists in production database", completed: false },
        { id: "prod-api", label: "Frontend connects to backend API successfully", completed: false },
        { id: "prod-errors", label: "No errors in production (check browser console)", completed: false },
      ],
    },
  ])

  const toggleItem = (groupIndex: number, itemIndex: number) => {
    const updatedGroups = [...groups]
    updatedGroups[groupIndex].items[itemIndex].completed = !updatedGroups[groupIndex].items[itemIndex].completed
    setGroups(updatedGroups)
  }

  const toggleGroup = (groupIndex: number) => {
    const updatedGroups = [...groups]
    const allCompleted = updatedGroups[groupIndex].items.every((item) => item.completed)
    updatedGroups[groupIndex].items = updatedGroups[groupIndex].items.map((item) => ({
      ...item,
      completed: !allCompleted,
    }))
    setGroups(updatedGroups)
  }

  const getCompletionPercentage = (items: ChecklistItem[]) => {
    const completed = items.filter((item) => item.completed).length
    return Math.round((completed / items.length) * 100)
  }

  const totalCompleted = groups.reduce((sum, group) => sum + group.items.filter((item) => item.completed).length, 0)
  const totalItems = groups.reduce((sum, group) => sum + group.items.length, 0)
  const totalPercentage = Math.round((totalCompleted / totalItems) * 100)

  const resetAll = () => {
    const resetGroups = groups.map((group) => ({
      ...group,
      items: group.items.map((item) => ({ ...item, completed: false })),
    }))
    setGroups(resetGroups)
  }

  return (
    <main className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-glow">Deployment Checklist</h1>
          <p className="text-lg text-foreground/60">Complete all steps to successfully deploy Navan</p>
        </div>

        {/* Overall Progress */}
        <Card className="glass p-6 space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Overall Progress</h2>
            <Button variant="outline" size="sm" onClick={resetAll}>
              Reset All
            </Button>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-foreground/80">
                {totalCompleted} / {totalItems} items completed
              </span>
              <span className="text-glow font-bold text-lg">{totalPercentage}%</span>
            </div>
            <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-cyan-500 to-green-500 transition-all duration-300"
                style={{ width: `${totalPercentage}%` }}
              />
            </div>
          </div>
        </Card>

        {/* Checklist Groups */}
        <div className="space-y-6">
          {groups.map((group, groupIndex) => {
            const percentage = getCompletionPercentage(group.items)
            const groupCompleted = group.items.every((item) => item.completed)

            return (
              <Card key={group.title} className="glass p-6 space-y-4">
                {/* Group Header */}
                <div className="space-y-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <h2 className="text-xl font-bold flex items-center gap-3">
                        <span className="text-2xl">{groupCompleted ? "✅" : "⏳"}</span>
                        {group.title}
                      </h2>
                      <p className="text-sm text-foreground/60">{group.description}</p>
                    </div>
                    <span className="text-sm font-semibold text-glow">{percentage}%</span>
                  </div>
                  <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-cyan-500 to-green-500 transition-all duration-300"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>

                {/* Items */}
                <div className="space-y-3 pt-4 border-t border-white/10">
                  {group.items.map((item, itemIndex) => (
                    <label
                      key={item.id}
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 cursor-pointer transition"
                      onClick={() => toggleItem(groupIndex, itemIndex)}
                    >
                      <Checkbox checked={item.completed} onChange={() => {}} />
                      <span
                        className={`flex-1 ${item.completed ? "line-through text-foreground/50" : "text-foreground"}`}
                      >
                        {item.label}
                      </span>
                    </label>
                  ))}
                </div>

                {/* Group Complete Button */}
                {!groupCompleted && (
                  <Button
                    variant="outline"
                    className="w-full mt-4 bg-transparent"
                    onClick={() => toggleGroup(groupIndex)}
                  >
                    Mark Group Complete
                  </Button>
                )}
              </Card>
            )
          })}
        </div>

        {/* Completion Message */}
        {totalPercentage === 100 && (
          <Card className="glass p-6 text-center space-y-4 border-green-500/50 bg-green-500/10">
            <h3 className="text-2xl font-bold text-green-400">🎉 All Done!</h3>
            <p className="text-foreground/80">Your Navan platform is ready for production deployment.</p>
            <p className="text-sm text-foreground/60">Visit the deployment guide for final steps and monitoring.</p>
          </Card>
        )}
      </div>
    </main>
  )
}

"use client"

import { useState } from "react"

interface CompanyProfileProps {
  isEditing?: boolean
}

export function CompanyProfile({ isEditing: defaultIsEditing = false }: CompanyProfileProps) {
  const [isEditing, setIsEditing] = useState(defaultIsEditing)
  const [formData, setFormData] = useState({
    name: "Navan Demo Company",
    industry: "Waste Management",
    location: "San Francisco, CA",
    description: "Committed to circular economy and sustainable waste management practices.",
    logoUrl: "/generic-company-logo.png",
  })

  const handleSave = () => {
    setIsEditing(false)
    console.log("Save company profile:", formData)
    // TODO: Call API to update company profile
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-4xl font-bold text-glow mb-2">Company Profile</h1>
          <p className="text-foreground/60">Manage your company information and public profile</p>
        </div>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="px-4 py-2 glass-hover rounded-lg font-medium transition"
        >
          {isEditing ? "Cancel" : "Edit"}
        </button>
      </div>

      <div className="glass p-8 space-y-6">
        {/* Logo */}
        <div>
          <p className="text-sm font-medium text-foreground/80 mb-4">Company Logo</p>
          <div className="flex items-start gap-6">
            <img
              src={formData.logoUrl || "/placeholder.svg"}
              alt="Company logo"
              className="w-32 h-32 rounded-lg object-cover glass"
            />
            {isEditing && (
              <div className="flex-1">
                <div className="border-2 border-dashed border-cyan-500/30 rounded-lg p-6 text-center hover:border-cyan-500/50 transition cursor-pointer">
                  <input type="file" accept="image/*" className="hidden" id="logo-upload" />
                  <label htmlFor="logo-upload" className="cursor-pointer space-y-2">
                    <p className="text-3xl">📷</p>
                    <p className="text-sm text-foreground/60">Click to upload new logo</p>
                  </label>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Form fields */}
        <div className="space-y-6">
          {[
            { label: "Company Name", key: "name" },
            { label: "Industry", key: "industry" },
            { label: "Location", key: "location" },
          ].map((field) => (
            <div key={field.key}>
              <label className="block text-sm font-medium text-foreground/80 mb-2">{field.label}</label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData[field.key as keyof typeof formData]}
                  onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                  className="w-full glass-hover px-4 py-3 text-foreground"
                />
              ) : (
                <p className="text-foreground/80">{formData[field.key as keyof typeof formData]}</p>
              )}
            </div>
          ))}

          <div>
            <label className="block text-sm font-medium text-foreground/80 mb-2">Description</label>
            {isEditing ? (
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full glass-hover px-4 py-3 text-foreground resize-none"
                rows={4}
              />
            ) : (
              <p className="text-foreground/80">{formData.description}</p>
            )}
          </div>
        </div>

        {/* Trust score */}
        <div className="space-y-4">
          <h3 className="font-bold text-foreground">Trust Score</h3>
          <div className="flex items-center gap-4">
            <div className="relative w-32 h-32">
              <svg className="transform -rotate-90" viewBox="0 0 100 100" width="128" height="128">
                <circle cx="50" cy="50" r="45" fill="none" stroke="rgb(51, 65, 85)" strokeWidth="4" />
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="url(#trustGradient)"
                  strokeWidth="4"
                  strokeDasharray={`${2 * Math.PI * 45 * 0.75} ${2 * Math.PI * 45}`}
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient id="trustGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#00d9ff" />
                    <stop offset="100%" stopColor="#39ff14" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="text-3xl font-bold text-glow">75</div>
                <p className="text-xs text-foreground/60">/ 100</p>
              </div>
            </div>

            <div className="flex-1 space-y-2">
              <p className="text-sm text-foreground/80">
                <span className="text-green-400">✓</span> Verified member
              </p>
              <p className="text-sm text-foreground/80">
                <span className="text-green-400">✓</span> 47 completed transactions
              </p>
              <p className="text-sm text-foreground/80">
                <span className="text-cyan-400">●</span> Response time: 2.5 hours
              </p>
              <p className="text-sm text-foreground/80">
                <span className="text-cyan-400">●</span> Reliability: 96%
              </p>
            </div>
          </div>
        </div>

        {/* Verification badges */}
        <div className="space-y-4">
          <h3 className="font-bold text-foreground">Verification Badges</h3>
          <div className="flex gap-4 flex-wrap">
            <div className="glass p-4 rounded-lg flex items-center gap-3 hover:border-cyan-500/50 transition">
              <span className="text-2xl">✓</span>
              <div>
                <p className="text-sm font-medium text-foreground">Email Verified</p>
                <p className="text-xs text-foreground/60">Verified 3 months ago</p>
              </div>
            </div>
            <div className="glass p-4 rounded-lg flex items-center gap-3 hover:border-cyan-500/50 transition">
              <span className="text-2xl">✓</span>
              <div>
                <p className="text-sm font-medium text-foreground">Business License</p>
                <p className="text-xs text-foreground/60">Verified 6 months ago</p>
              </div>
            </div>
          </div>
        </div>

        {isEditing && (
          <button
            onClick={handleSave}
            className="w-full px-4 py-3 bg-gradient-to-r from-cyan-500 to-green-500 text-background font-bold rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 transition"
          >
            Save Changes
          </button>
        )}
      </div>
    </div>
  )
}

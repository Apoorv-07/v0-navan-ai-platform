"use client"

import { useState, useEffect } from "react"

interface ImpactCalculatorProps {
  environmental?: {
    co2: number
    water: number
    energy: number
  }
}

export function ImpactCalculator({ environmental }: ImpactCalculatorProps) {
  const [co2Saved, setCo2Saved] = useState(environmental?.co2 || 0)
  const [waterSaved, setWaterSaved] = useState(environmental?.water || 0)
  const [energySaved, setEnergySaved] = useState(environmental?.energy || 0)

  useEffect(() => {
    if (environmental) {
      setCo2Saved(environmental.co2)
      setWaterSaved(environmental.water)
      setEnergySaved(environmental.energy)
    }
  }, [environmental])

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-bold text-glow mb-4">Your Environmental Impact</h3>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="glass p-6 space-y-3">
          <p className="text-foreground/60 text-sm">CO₂ Saved</p>
          <div className="text-4xl font-bold text-green-400">{co2Saved.toFixed(0)} kg</div>
          <p className="text-xs text-foreground/40">Trees equivalent: {(co2Saved / 25).toFixed(0)}</p>
        </div>

        <div className="glass p-6 space-y-3">
          <p className="text-foreground/60 text-sm">Water Saved</p>
          <div className="text-4xl font-bold text-cyan-400">{waterSaved.toFixed(0)} L</div>
          <p className="text-xs text-foreground/40">Showers: {(waterSaved / 80).toFixed(0)}</p>
        </div>

        <div className="glass p-6 space-y-3">
          <p className="text-foreground/60 text-sm">Energy Saved</p>
          <div className="text-4xl font-bold text-green-300">{energySaved.toFixed(0)} kWh</div>
          <p className="text-xs text-foreground/40">Homes powered: {(energySaved / 30).toFixed(1)}</p>
        </div>
      </div>

      <button className="w-full glass-hover px-4 py-3 text-sm font-medium rounded-lg transition">
        Download Impact Report
      </button>
    </div>
  )
}

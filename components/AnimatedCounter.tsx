"use client"

import { useState, useEffect } from "react"

interface AnimatedCounterProps {
  target: number
  label: string
  suffix?: string
}

export function AnimatedCounter({ target, label, suffix = "" }: AnimatedCounterProps) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let animationId: number
    const duration = 2000
    const start = Date.now()

    const animate = () => {
      const elapsed = Date.now() - start
      const progress = Math.min(elapsed / duration, 1)
      setCount(Math.floor(progress * target))

      if (progress < 1) {
        animationId = requestAnimationFrame(animate)
      }
    }

    animationId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationId)
  }, [target])

  return (
    <div className="text-center">
      <div className="text-4xl font-bold text-glow">
        {count.toLocaleString()}
        {suffix}
      </div>
      <p className="text-foreground/60 text-sm mt-2">{label}</p>
    </div>
  )
}

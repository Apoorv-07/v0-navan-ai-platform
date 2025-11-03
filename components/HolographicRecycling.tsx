"use client"

import { useEffect, useRef } from "react"

export function HolographicRecycling() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationId: number
    const width = canvas.width
    const height = canvas.height
    let time = 0

    const drawRecyclingSymbol = (x: number, y: number, size: number, rotation: number) => {
      ctx!.save()
      ctx!.translate(x, y)
      ctx!.rotate(rotation)

      ctx!.strokeStyle = "#00d9ff"
      ctx!.lineWidth = 2
      ctx!.fillStyle = "rgba(0, 217, 255, 0.1)"

      // Draw three curved arrows
      for (let i = 0; i < 3; i++) {
        const angle = (i * Math.PI * 2) / 3
        ctx!.save()
        ctx!.rotate(angle)

        // Arrow shaft
        ctx!.beginPath()
        ctx!.arc(0, 0, size / 2, Math.PI / 6, Math.PI / 3, false)
        ctx!.stroke()

        // Arrow head
        ctx!.beginPath()
        ctx!.moveTo((size / 2) * Math.cos(Math.PI / 3), (size / 2) * Math.sin(Math.PI / 3))
        ctx!.lineTo((size / 2) * Math.cos(Math.PI / 3) - 8, (size / 2) * Math.sin(Math.PI / 3) - 8)
        ctx!.lineTo((size / 2) * Math.cos(Math.PI / 3) + 8, (size / 2) * Math.sin(Math.PI / 3) - 8)
        ctx!.fill()

        ctx!.restore()
      }

      ctx!.restore()
    }

    const animate = () => {
      time += 0.005

      // Clear canvas
      ctx!.fillStyle = "rgba(11, 20, 35, 0.1)"
      ctx!.fillRect(0, 0, width, height)

      // Draw rotating recycling symbols
      drawRecyclingSymbol(width / 2, height / 2, 80, time)
      drawRecyclingSymbol(width / 2, height / 2, 60, -time * 1.5)

      // Draw particles
      ctx!.fillStyle = "rgba(0, 217, 255, 0.6)"
      for (let i = 0; i < 5; i++) {
        const angle = (i * Math.PI * 2) / 5 + time
        const x = width / 2 + Math.cos(angle) * 100
        const y = height / 2 + Math.sin(angle) * 100
        ctx!.fillRect(x, y, 3, 3)
      }

      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => cancelAnimationFrame(animationId)
  }, [])

  return <canvas ref={canvasRef} width={400} height={300} className="mx-auto" />
}

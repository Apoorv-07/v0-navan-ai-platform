"use client"

import type React from "react"

interface StepProps {
  stepNumber: number
  totalSteps: number
  title: string
  description: string
  children: React.ReactNode
  onNext: () => void
  onPrevious: () => void
  canNext: boolean
}

export function MultiStepForm({
  stepNumber,
  totalSteps,
  title,
  description,
  children,
  onNext,
  onPrevious,
  canNext,
}: StepProps) {
  return (
    <div className="space-y-8">
      {/* Progress indicator */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold text-glow">{title}</h2>
          <span className="text-foreground/60">
            Step {stepNumber} of {totalSteps}
          </span>
        </div>
        <p className="text-foreground/60">{description}</p>

        {/* Progress bar */}
        <div className="w-full h-1 glass rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-cyan-500 to-green-500 transition-all duration-300"
            style={{ width: `${(stepNumber / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      {/* Content */}
      <div className="glass p-8 space-y-6">{children}</div>

      {/* Navigation */}
      <div className="flex gap-4 justify-between">
        <button
          onClick={onPrevious}
          disabled={stepNumber === 1}
          className="px-6 py-3 glass-hover disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        <button
          onClick={onNext}
          disabled={!canNext}
          className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-green-500 text-background font-semibold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-cyan-500/50 transition"
        >
          {stepNumber === totalSteps ? "Submit" : "Next"}
        </button>
      </div>
    </div>
  )
}

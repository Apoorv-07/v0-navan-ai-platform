"use client"

interface MatchExplanationModalProps {
  isOpen: boolean
  onClose: () => void
  wasteTitle: string
  needTitle: string
  matchScore: number
  explanation: string
}

export function MatchExplanationModal({
  isOpen,
  onClose,
  wasteTitle,
  needTitle,
  matchScore,
  explanation,
}: MatchExplanationModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="glass p-8 max-w-lg w-full space-y-6 rounded-xl">
        <div>
          <h2 className="text-2xl font-bold text-glow mb-2">Why This Match?</h2>
          <p className="text-foreground/60 text-sm">Understanding your AI-powered connection</p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-foreground/60 text-sm">Offering</p>
              <p className="font-medium text-foreground">{wasteTitle}</p>
            </div>
            <div className="text-2xl glow-cyan">↔</div>
            <div className="text-right">
              <p className="text-foreground/60 text-sm">Seeking</p>
              <p className="font-medium text-foreground">{needTitle}</p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-cyan-500/20 to-green-500/20 p-4 rounded-lg border border-cyan-500/30">
            <p className="text-sm font-medium text-cyan-400 mb-2">Match Score: {matchScore}%</p>
            <p className="text-foreground/80">{explanation}</p>
          </div>

          <div className="space-y-2">
            <h3 className="font-medium text-foreground">Key Factors</h3>
            <ul className="space-y-1 text-sm text-foreground/60">
              <li>✓ Material composition compatibility</li>
              <li>✓ Quantity requirements aligned</li>
              <li>✓ Geographic proximity favorable</li>
              <li>✓ Quality specifications match</li>
            </ul>
          </div>
        </div>

        <button onClick={onClose} className="w-full px-4 py-2 glass-hover rounded-lg font-medium transition">
          Close
        </button>
      </div>
    </div>
  )
}

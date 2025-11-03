"use client"

interface MessageBubbleProps {
  content: string
  timestamp: string
  isOwn: boolean
  status?: "sending" | "sent" | "read"
}

export function MessageBubble({ content, timestamp, isOwn, status }: MessageBubbleProps) {
  return (
    <div className={`flex ${isOwn ? "justify-end" : "justify-start"} mb-4`}>
      <div
        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
          isOwn
            ? "bg-gradient-to-r from-cyan-500/30 to-green-500/30 border border-cyan-500/50 text-foreground"
            : "glass text-foreground"
        }`}
      >
        <p className="text-sm">{content}</p>
        <div className="flex items-center justify-end gap-2 mt-1">
          <p className="text-xs text-foreground/60">{timestamp}</p>
          {isOwn && status && (
            <span className="text-xs">{status === "sending" ? "⏱" : status === "sent" ? "✓" : "✓✓"}</span>
          )}
        </div>
      </div>
    </div>
  )
}

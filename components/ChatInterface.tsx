"use client"

import { useState, useRef, useEffect } from "react"
import { MessageBubble } from "./MessageBubble"

interface ChatInterfaceProps {
  conversationId: string
  companyName: string
}

export function ChatInterface({ conversationId, companyName }: ChatInterfaceProps) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      content: "Hi, I am interested in your plastic waste listings.",
      timestamp: "10:30 AM",
      isOwn: false,
      status: "read" as const,
    },
    {
      id: 2,
      content: "We have 500kg available this week. Interested?",
      timestamp: "10:31 AM",
      isOwn: false,
      status: "read" as const,
    },
    {
      id: 3,
      content: "Yes! Can you provide quality specs and pricing?",
      timestamp: "10:35 AM",
      isOwn: true,
      status: "read" as const,
    },
  ])

  const [newMessage, setNewMessage] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = () => {
    if (!newMessage.trim()) return

    const newMsg = {
      id: messages.length + 1,
      content: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      isOwn: true,
      status: "sending" as const,
    }

    setMessages([...messages, newMsg])
    setNewMessage("")

    // Simulate message sent
    setTimeout(() => {
      setMessages((prev) => prev.map((msg) => (msg.id === newMsg.id ? { ...msg, status: "sent" as const } : msg)))
    }, 500)

    // Simulate message read
    setTimeout(() => {
      setMessages((prev) => prev.map((msg) => (msg.id === newMsg.id ? { ...msg, status: "read" as const } : msg)))
    }, 1000)
  }

  return (
    <div className="glass flex-1 flex flex-col">
      {/* Header */}
      <div className="border-b border-white/10 p-4">
        <h3 className="text-lg font-bold text-foreground">{companyName}</h3>
        <p className="text-xs text-foreground/60">Active now</p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <MessageBubble
            key={message.id}
            content={message.content}
            timestamp={message.timestamp}
            isOwn={message.isOwn}
            status={message.status}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t border-white/10 p-4 space-y-3">
        <div className="flex gap-2">
          <button className="p-2 glass-hover rounded-lg text-foreground/60 hover:text-foreground">📎</button>
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            placeholder="Type your message..."
            className="flex-1 glass px-4 py-2 text-foreground placeholder-muted-foreground rounded-lg"
          />
          <button
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
            className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-green-500 text-background font-semibold rounded-lg disabled:opacity-50 hover:shadow-lg hover:shadow-cyan-500/50 transition"
          >
            Send
          </button>
        </div>
        <div className="flex gap-2">
          <button className="text-sm text-foreground/60 hover:text-foreground px-3 py-1 glass-hover rounded">
            Quick reply: Quality specs
          </button>
          <button className="text-sm text-foreground/60 hover:text-foreground px-3 py-1 glass-hover rounded">
            Quick reply: Pricing
          </button>
        </div>
      </div>
    </div>
  )
}

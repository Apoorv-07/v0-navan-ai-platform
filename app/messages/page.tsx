"use client"

import { useState } from "react"
import { Navbar } from "@/components/Navbar"
import { Sidebar } from "@/components/Sidebar"
import { ConversationList } from "@/components/ConversationList"
import { ChatInterface } from "@/components/ChatInterface"

const mockConversations = [
  {
    id: "1",
    company: "TechRecycle Inc.",
    lastMessage: "Yes! Can you provide quality specs and pricing?",
    timestamp: "10:35 AM",
    unreadCount: 0,
  },
  {
    id: "2",
    company: "MetalWorks Ltd.",
    lastMessage: "What is your minimum order quantity?",
    timestamp: "2:15 PM",
    unreadCount: 2,
  },
  {
    id: "3",
    company: "Sustainable Fabrics Co.",
    lastMessage: "Can you arrange logistics?",
    timestamp: "Yesterday",
    unreadCount: 1,
  },
  {
    id: "4",
    company: "CircuitSalvage",
    lastMessage: "We would love to work with you!",
    timestamp: "3 days ago",
    unreadCount: 0,
  },
]

export default function MessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState(mockConversations[0].id)

  const currentConversation = mockConversations.find((c) => c.id === selectedConversation)

  return (
    <main className="min-h-screen grid-bg">
      <Navbar />
      <div className="flex pt-20">
        <Sidebar />
        <div className="flex-1 flex gap-4 p-4">
          <ConversationList
            conversations={mockConversations}
            selectedConversationId={selectedConversation}
            onSelectConversation={setSelectedConversation}
          />

          {currentConversation && (
            <ChatInterface conversationId={selectedConversation} companyName={currentConversation.company} />
          )}
        </div>
      </div>
    </main>
  )
}

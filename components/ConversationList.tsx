"use client"

interface ConversationListProps {
  conversations: Array<{
    id: string
    company: string
    lastMessage: string
    timestamp: string
    unreadCount: number
  }>
  selectedConversationId: string | null
  onSelectConversation: (id: string) => void
}

export function ConversationList({
  conversations,
  selectedConversationId,
  onSelectConversation,
}: ConversationListProps) {
  return (
    <div className="glass h-screen overflow-y-auto w-80 flex flex-col">
      <div className="p-4 border-b border-white/10">
        <h2 className="text-xl font-bold text-glow">Messages</h2>
        <input
          type="text"
          placeholder="Search conversations..."
          className="w-full mt-3 glass px-3 py-2 text-foreground placeholder-muted-foreground text-sm"
        />
      </div>

      <div className="flex-1 overflow-y-auto">
        {conversations.map((conversation) => (
          <button
            key={conversation.id}
            onClick={() => onSelectConversation(conversation.id)}
            className={`w-full text-left p-4 border-b border-white/5 transition ${
              selectedConversationId === conversation.id
                ? "bg-gradient-to-r from-cyan-500/20 to-green-500/20 border-l-2 border-cyan-500"
                : "hover:bg-white/5"
            }`}
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <p className="font-medium text-foreground truncate">{conversation.company}</p>
                <p className="text-xs text-foreground/60 truncate">{conversation.lastMessage}</p>
              </div>
              {conversation.unreadCount > 0 && (
                <span className="flex-shrink-0 w-5 h-5 bg-gradient-to-r from-cyan-500 to-green-500 text-background rounded-full flex items-center justify-center text-xs font-bold">
                  {conversation.unreadCount}
                </span>
              )}
            </div>
            <p className="text-xs text-foreground/40 mt-2">{conversation.timestamp}</p>
          </button>
        ))}
      </div>

      <div className="p-4 border-t border-white/10 space-y-2">
        <button className="w-full glass-hover px-4 py-2 text-sm font-medium rounded-lg">New Message</button>
      </div>
    </div>
  )
}

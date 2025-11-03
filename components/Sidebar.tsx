"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"

export function Sidebar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(true)

  const menuItems = [
    { href: "/dashboard", label: "Dashboard", icon: "📊" },
    { href: "/listings", label: "My Listings", icon: "📦" },
    { href: "/matches", label: "Matches", icon: "🎯" },
    { href: "/messages", label: "Messages", icon: "💬" },
    { href: "/profile", label: "Profile", icon: "👤" },
    { href: "/analytics", label: "Analytics", icon: "📈" },
  ]

  return (
    <div
      className={`glass ${isOpen ? "w-64" : "w-20"} transition-all duration-300 min-h-screen flex flex-col p-4 space-y-4`}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 hover:bg-white/10 rounded-lg transition text-foreground/80"
      >
        {isOpen ? "←" : "→"}
      </button>

      <nav className="space-y-2 flex-1">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 px-4 py-2 rounded-lg transition ${
              pathname === item.href
                ? "bg-gradient-to-r from-cyan-500/20 to-green-500/20 border border-cyan-500/50"
                : "text-foreground/60 hover:text-foreground/80 hover:bg-white/5"
            }`}
          >
            <span>{item.icon}</span>
            {isOpen && <span>{item.label}</span>}
          </Link>
        ))}
      </nav>
    </div>
  )
}

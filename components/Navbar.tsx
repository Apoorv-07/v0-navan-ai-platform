"use client"

import Link from "next/link"
import { useAuthContext } from "@/contexts/AuthContext"
import { useRouter } from "next/navigation"

export function Navbar() {
  const { isAuthenticated } = useAuthContext()
  const router = useRouter()

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("accessToken")
      localStorage.removeItem("refreshToken")
      router.push("/")
      router.refresh()
    }
  }

  return (
    <nav className="fixed top-0 w-full z-50 glass">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-glow">
          Navan
        </Link>

        <div className="flex items-center gap-6">
          {isAuthenticated ? (
            <>
              <Link href="/dashboard" className="text-foreground/80 hover:text-foreground transition">
                Dashboard
              </Link>
              <Link href="/listings" className="text-foreground/80 hover:text-foreground transition">
                Listings
              </Link>
              <Link href="/matches" className="text-foreground/80 hover:text-foreground transition">
                Matches
              </Link>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="text-foreground/80 hover:text-foreground transition">
                Login
              </Link>
              <Link
                href="/register"
                className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-green-500 text-background rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 transition"
              >
                Get Started
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

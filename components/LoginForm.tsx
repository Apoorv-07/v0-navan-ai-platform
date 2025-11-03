"use client"

import type React from "react"

import { useState } from "react"
import { useAuth } from "@/hooks/useAuth"
import { useRouter } from "next/navigation"
import Link from "next/link"

export function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { loginUser, loading, error } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const result = await loginUser(email, password)
    if (result.success) {
      router.push("/dashboard")
    }
  }

  return (
    <div className="w-full max-w-md">
      <form onSubmit={handleSubmit} className="glass p-8 space-y-6">
        <h1 className="text-3xl font-bold text-glow text-center">Navan</h1>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-foreground/80">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full glass-hover px-4 py-2 text-foreground placeholder-muted-foreground"
            placeholder="your@email.com"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-foreground/80">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full glass-hover px-4 py-2 text-foreground placeholder-muted-foreground"
            placeholder="••••••••"
            required
          />
        </div>

        {error && <div className="text-red-400 text-sm text-center">{error}</div>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-cyan-500 to-green-500 text-background font-semibold py-2 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/50 disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-center text-foreground/60 text-sm">
          Don't have an account?{" "}
          <Link href="/register" className="text-primary hover:text-cyan-300 transition">
            Register here
          </Link>
        </p>
      </form>
    </div>
  )
}

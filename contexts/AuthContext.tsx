"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { getAccessToken } from "@/utils/auth"

interface AuthContextType {
  isAuthenticated: boolean
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  isLoading: true,
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const token = getAccessToken()
    setIsAuthenticated(!!token)
    setIsLoading(false)
  }, [])

  return <AuthContext.Provider value={{ isAuthenticated, isLoading }}>{children}</AuthContext.Provider>
}

export function useAuthContext() {
  return useContext(AuthContext)
}

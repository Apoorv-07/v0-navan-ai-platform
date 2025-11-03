"use client"

import { useState, useCallback, useEffect } from "react"
import { login, register, storeTokens, clearTokens, getAccessToken } from "@/utils/auth"

export function useAuth() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const token = getAccessToken()
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]))
        setUser({ userId: payload.userId })
      } catch (err) {
        console.error("Failed to decode token:", err)
      }
    }
  }, [])

  const loginUser = useCallback(async (email: string, password: string) => {
    setLoading(true)
    setError(null)
    try {
      const { accessToken, refreshToken, userId, companyId } = await login(email, password)
      storeTokens(accessToken, refreshToken)
      setUser({ userId, companyId })
      return { success: true }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed")
      return { success: false }
    } finally {
      setLoading(false)
    }
  }, [])

  const registerUser = useCallback(async (email: string, password: string) => {
    setLoading(true)
    setError(null)
    try {
      const { accessToken, refreshToken, userId, companyId } = await register(email, password)
      storeTokens(accessToken, refreshToken)
      setUser({ userId, companyId })
      return { success: true }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed")
      return { success: false }
    } finally {
      setLoading(false)
    }
  }, [])

  const logoutUser = useCallback(() => {
    clearTokens()
    setUser(null)
  }, [])

  const isAuthenticated = useCallback(() => {
    return !!getAccessToken()
  }, [])

  return {
    user,
    loading,
    error,
    loginUser,
    registerUser,
    logoutUser,
    isAuthenticated,
  }
}

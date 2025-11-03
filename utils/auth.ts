const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"

export async function login(email: string, password: string) {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  })

  if (!response.ok) throw new Error("Login failed")
  return response.json()
}

export async function register(email: string, password: string) {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  })

  if (!response.ok) throw new Error("Registration failed")
  return response.json()
}

export function storeTokens(accessToken: string, refreshToken: string) {
  if (typeof window !== "undefined") {
    localStorage.setItem("accessToken", accessToken)
    localStorage.setItem("refreshToken", refreshToken)
  }
}

export function getAccessToken() {
  if (typeof window !== "undefined") {
    return localStorage.getItem("accessToken")
  }
  return null
}

export function clearTokens() {
  if (typeof window !== "undefined") {
    localStorage.removeItem("accessToken")
    localStorage.removeItem("refreshToken")
  }
}

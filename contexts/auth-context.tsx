"use client"

import React, { createContext, useContext, useMemo, useState, type ReactNode } from "react"

interface AuthContextType {
  isLoggedIn: boolean
  login: () => void
  logout: () => void
  requireAuth: () => boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuth must be used within AuthProvider")
  return ctx
}

interface AuthProviderProps {
  children: ReactNode
  onShowAuthGate?: () => void
}

export function AuthProvider({ children, onShowAuthGate }: AuthProviderProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const login = () => setIsLoggedIn(true)
  const logout = () => setIsLoggedIn(false)

  // returns true if allowed, false if gated (and triggers dialog)
  const requireAuth = () => {
    if (isLoggedIn) return true
    onShowAuthGate?.()
    return false
  }

  const value = useMemo(
    () => ({ isLoggedIn, login, logout, requireAuth }),
    [isLoggedIn]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

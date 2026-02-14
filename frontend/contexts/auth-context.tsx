'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { apiClient } from '@/lib/api-client'

interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  role: 'ADMIN' | 'MANAGER' | 'USER'
}

interface AuthContextType {
  user: User | null
  token: string | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  isLoading: boolean
  isAuthenticated: boolean
  isAdmin: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for existing token on mount
    const savedToken = localStorage.getItem('auth_token')
    const savedUser = localStorage.getItem('auth_user')
    
    if (savedToken && savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser)
        setToken(savedToken)
        setUser(parsedUser)
        console.log('SUCCESS: Session restored')
      } catch (error) {
        console.error('ERROR: Failed to restore session')
        localStorage.removeItem('auth_token')
        localStorage.removeItem('auth_user')
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    try {
      const response: any = await apiClient.login(email, password)
      
      if (response.token && response.user) {
        setToken(response.token)
        setUser(response.user)
        
        // Save to localStorage
        localStorage.setItem('auth_token', response.token)
        localStorage.setItem('auth_user', JSON.stringify(response.user))
        
        console.log('SUCCESS: Login successful')
      } else {
        console.error('ERROR: Invalid server response')
        throw new Error('Réponse serveur invalide')
      }
    } catch (error) {
      console.error('ERROR: Login failed')
      // Nettoyer en cas d'erreur
      setToken(null)
      setUser(null)
      localStorage.removeItem('auth_token')
      localStorage.removeItem('auth_user')
      throw error
    }
  }

  const logout = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem('auth_token')
    localStorage.removeItem('auth_user')
    console.log('SUCCESS: Logged out')
  }

  const value: AuthContextType = {
    user,
    token,
    login,
    logout,
    isLoading,
    isAuthenticated: !!token && !!user,
    isAdmin: user?.role === 'ADMIN',
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

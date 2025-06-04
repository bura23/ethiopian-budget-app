import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

// In a real app, this would be in a secure environment variable
const JWT_SECRET = 'your-secret-key'

// Mock user database
export const MOCK_USERS = [
  {
    id: '1',
    email: 'admin@example.com',
    // This is the hashed version of 'admin123'
    password: '$2a$10$XQkr0Wnj0tYEPH6YZODTn.YJqXNYbO0.TAE7TzGvZQvYqP.OXdgSK',
    name: 'Admin User',
    role: 'admin'
  }
]

export interface UserProfile {
  id: string
  email: string
  name: string
  role: 'user' | 'admin'
}

// Hash password
export const hashPassword = async (password: string): Promise<string> => {
  return bcrypt.hash(password, 10)
}

// Compare password with hash
export const comparePasswords = async (password: string, hash: string): Promise<boolean> => {
  return bcrypt.compare(password, hash)
}

// Generate JWT token
export const generateToken = (user: UserProfile): string => {
  return jwt.sign(user, JWT_SECRET, { expiresIn: '24h' })
}

// Verify JWT token
export const verifyToken = (token: string): UserProfile => {
  try {
    return jwt.verify(token, JWT_SECRET) as UserProfile
  } catch (error) {
    throw new Error('Invalid token')
  }
}

// Store token in localStorage
export const setStoredToken = (token: string): void => {
  localStorage.setItem('auth_token', token)
}

// Get stored token from localStorage
export const getStoredToken = (): string | null => {
  return localStorage.getItem('auth_token')
}

// Remove token from localStorage
export const removeStoredToken = (): void => {
  localStorage.removeItem('auth_token')
}

// Check if user is authenticated
export const isAuthenticated = (): boolean => {
  const token = getStoredToken()
  if (!token) return false
  
  try {
    verifyToken(token)
    return true
  } catch {
    removeStoredToken()
    return false
  }
}

// Get current user profile
export const getCurrentUser = (): UserProfile | null => {
  const token = getStoredToken()
  if (!token) return null
  
  try {
    return verifyToken(token)
  } catch {
    removeStoredToken()
    return null
  }
} 
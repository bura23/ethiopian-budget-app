export const GOOGLE_CLIENT_ID = "126306324254-bquqrhdrfg2qtqmpfhvi1s0s878736vf.apps.googleusercontent.com"
export const AUTH_STORAGE_KEY = "auth_token"

export interface UserProfile {
  email: string
  name: string
  picture: string
  sub: string // Google's user ID
  exp?: number // Token expiration timestamp
}

export const getStoredAuth = (): string | null => {
  return localStorage.getItem(AUTH_STORAGE_KEY)
}

export const setStoredAuth = (token: string): void => {
  localStorage.setItem(AUTH_STORAGE_KEY, token)
}

export const removeStoredAuth = (): void => {
  localStorage.removeItem(AUTH_STORAGE_KEY)
} 
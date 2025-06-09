import React, { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import { auth } from "../services/api";

interface User {
  id: number;
  name: string;
  email: string;
  photo_url?: string;
}

interface AuthResponse {
  success: boolean;
  data?: User;
  user?: User;
  token?: string;
  message?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => void;
  refreshReports: () => void;
  reportsRefreshTrigger: number;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [reportsRefreshTrigger, setReportsRefreshTrigger] = useState(0);

  const refreshReports = () => {
    setReportsRefreshTrigger(prev => prev + 1);
  };

  // Check for existing token and fetch user profile on app start
  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await auth.getProfile() as AuthResponse;
          if (response.success) {
            setUser(response.data || response.user || null);
          } else {
            // Invalid token, remove it
            localStorage.removeItem('token');
          }
        } catch (error) {
          console.error('Failed to fetch user profile:', error);
          // Remove invalid token
          localStorage.removeItem('token');
        }
      }
      setIsLoading(false);
    };

    initializeAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const response = await auth.login({ email, password }) as AuthResponse;
      
      if (response.success && response.token) {
        // Store token in localStorage
        localStorage.setItem('token', response.token);
        
        // Set user data
        const userData = response.data || response.user;
        if (userData) {
          setUser(userData);
        }
      } else {
        throw new Error(response.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      setIsLoading(true);
      const response = await auth.register({ name, email, password }) as AuthResponse;
      
      if (response.success && response.token) {
        // Store token in localStorage
        localStorage.setItem('token', response.token);
        
        // Set user data
        const userData = response.data || response.user;
        if (userData) {
          setUser(userData);
        }
      } else {
        throw new Error(response.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  const updateProfile = (updates: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...updates });
    }
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    register,
    logout,
    updateProfile,
    refreshReports,
    reportsRefreshTrigger,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

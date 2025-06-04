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
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [reportsRefreshTrigger, setReportsRefreshTrigger] = useState(0);

  useEffect(() => {
    const checkAuthStatus = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = (await auth.getProfile()) as AuthResponse;
          if (response.success) {
            const userData = response.data || response.user;
            if (userData) {
              setUser(userData);
              setIsAuthenticated(true);
            }
          } else {
            localStorage.removeItem("token");
          }
        } catch (error) {
          console.error("Auth check failed:", error);
          localStorage.removeItem("token");
        }
      }
      setIsLoading(false);
    };

    checkAuthStatus();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = (await auth.login({ email, password })) as AuthResponse;
      if (response.success) {
        const userData = response.data || response.user;
        if (userData) {
          setUser(userData);
          setIsAuthenticated(true);
        }
      } else {
        throw new Error(response.message || "Login failed");
      }
    } catch (error) {
      throw error;
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      const response = (await auth.register({
        name,
        email,
        password,
      })) as AuthResponse;
      if (response.success) {
        const userData = response.data || response.user;
        if (userData) {
          setUser(userData);
          setIsAuthenticated(true);
        }
      } else {
        throw new Error(response.message || "Registration failed");
      }
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("token");
  };

  const updateProfile = (updates: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...updates });
    }
  };

  const refreshReports = () => {
    setReportsRefreshTrigger((prev) => prev + 1);
  };

  const value = {
    user,
    isAuthenticated,
    isLoading,
    login,
    register,
    logout,
    updateProfile,
    refreshReports,
    reportsRefreshTrigger,
  };

  return (
    <AuthContext.Provider value={value} data-oid="9e8-z_r">
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

import React, { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../services/api";

interface User {
  id: number;
  name: string;
  email: string;
  photo_url?: string;
}

interface AuthResponse {
  success: boolean;
  message?: string;
  token?: string;
  user?: User;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchUser();
    }
  }, []);

  const fetchUser = async () => {
    try {
      const response = (await auth.getProfile()) as AuthResponse;
      if (response.success && response.user) {
        setUser(response.user);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error("Error fetching user:", error);
      logout();
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const response = (await auth.login({ email, password })) as AuthResponse;
      if (response.success && response.token && response.user) {
        localStorage.setItem("token", response.token);
        setUser(response.user);
        setIsAuthenticated(true);
      } else {
        throw new Error(response.message || "Login failed");
      }
    } catch (error: any) {
      console.error("Login error:", error);
      throw new Error(error.response?.data?.message || "Failed to login");
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      const response = (await auth.register({
        name,
        email,
        password,
      })) as AuthResponse;
      if (response.success && response.token && response.user) {
        localStorage.setItem("token", response.token);
        setUser(response.user);
        setIsAuthenticated(true);
      } else {
        throw new Error(response.message || "Registration failed");
      }
    } catch (error: any) {
      console.error("Register error:", error);
      throw new Error(error.response?.data?.message || "Failed to register");
    }
  };

  const updateProfile = (updates: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...updates });
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, login, register, logout, updateProfile }}
      data-oid="essd40x"
    >
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

import { createContext, useContext, useState, useEffect } from "react";
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
  user: User;
  token?: string;
  message?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updateProfile: (data: { name: string; photo_url?: string }) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      auth
        .getProfile()
        .then((response) => {
          const authResponse = response as AuthResponse;
          if (authResponse.success) {
            setUser(authResponse.user);
          }
        })
        .catch(() => {
          localStorage.removeItem("token");
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setError(null);
      const response = (await auth.login({ email, password })) as AuthResponse;
      if (response.success && response.token) {
        localStorage.setItem("token", response.token);
        setUser(response.user);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Error logging in");
      throw err;
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      setError(null);
      const response = (await auth.register({
        name,
        email,
        password,
      })) as AuthResponse;
      if (response.success && response.token) {
        localStorage.setItem("token", response.token);
        setUser(response.user);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Error registering");
      throw err;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  const updateProfile = async (data: { name: string; photo_url?: string }) => {
    try {
      setError(null);
      const response = (await auth.updateProfile(data)) as AuthResponse;
      if (response.success) {
        setUser((prev) => (prev ? { ...prev, ...data } : null));
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Error updating profile");
      throw err;
    }
  };

  const value = {
    user,
    loading,
    error,
    login,
    register,
    logout,
    updateProfile,
  };

  return (
    <AuthContext.Provider value={value} data-oid="w2yr5dg">
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

import axios from 'axios';

// API URL configuration
const getApiUrl = () => {
  if (typeof window === 'undefined') {
    // Server-side
    return process.env.NEXT_PUBLIC_API_URL || '/api';
  }
  // Client-side
  return window.location.hostname === 'localhost' 
    ? 'http://localhost:3000/api'  // Development with PHP backend
    : '/api';                      // Production
};

// Create axios instance with default config
const api = axios.create({
  baseURL: getApiUrl(),
  headers: {
    'Content-Type': 'application/json',
  },
  // Add timeout and withCredentials for better error handling
  timeout: 10000,
  withCredentials: true
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// Add response interceptor for better error handling
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Clear invalid token
      localStorage.removeItem('token');
      // Only redirect if not on login/register pages
      if (!window.location.pathname.includes('/login') && !window.location.pathname.includes('/register')) {
        window.location.href = '/login';
      }
    }
    
    if (error.response) {
      // Server responded with error status
      return Promise.reject(error.response.data);
    } else if (error.request) {
      // Request was made but no response
      return Promise.reject({ message: 'No response from server. Please check if backend is running.' });
    } else {
      // Something else happened
      return Promise.reject({ message: error.message });
    }
  }
);

// Auth API
export const auth = {
  register: async (data: { name: string; email: string; password: string }) => {
    const response = await api.post('/auth/register', data);
    return response.data;
  },

  login: async (data: { email: string; password: string }) => {
    const response = await api.post('/auth/login', data);
    return response.data;
  },

  getProfile: async () => {
    const response = await api.get('/auth/profile');
    return response.data;
  },

  updateProfile: async (data: { name: string; photo_url?: string }) => {
    const response = await api.put('/auth/profile', data);
    return response.data;
  },

  forgotPassword: async (data: { email: string }) => {
    const response = await api.post('/auth/forgot-password', data);
    return response.data;
  },

  resetPassword: async (data: { token: string; password: string }) => {
    const response = await api.post('/auth/reset-password', data);
    return response.data;
  },
};

// Categories API
export const categories = {
  getAll: async () => {
    const response = await api.get('/categories');
    return response.data;
  },

  create: async (data: { name: string; type: 'expense' | 'income'; budget: number }) => {
    const response = await api.post('/categories', data);
    return response.data;
  },

  update: async (id: number, data: { name: string; type: 'expense' | 'income'; budget: number }) => {
    const response = await api.put(`/categories/${id}`, data);
    return response.data;
  },

  delete: async (id: number) => {
    const response = await api.delete(`/categories/${id}`);
    return response.data;
  },
};

// Transactions API
export const transactions = {
  getAll: async (params?: {
    startDate?: string;
    endDate?: string;
    type?: 'expense' | 'income';
    categoryId?: number;
  }) => {
    const response = await api.get('/transactions', { params });
    return response.data;
  },

  getStats: async (params?: { startDate?: string; endDate?: string }) => {
    const response = await api.get('/transactions/stats', { params });
    return response.data;
  },

  create: async (data: {
    categoryId: number;
    amount: number;
    description: string;
    date: string;
    type: 'expense' | 'income';
  }) => {
    const response = await api.post('/transactions', data);
    return response.data;
  },

  update: async (
    id: number,
    data: {
      categoryId: number;
      amount: number;
      description: string;
      date: string;
      type: 'expense' | 'income';
    }
  ) => {
    const response = await api.put(`/transactions/${id}`, data);
    return response.data;
  },

  delete: async (id: number) => {
    const response = await api.delete(`/transactions/${id}`);
    return response.data;
  },
};

// Profile API calls
export const updateUserProfile = async (data: { name: string; email: string }) => {
  const response = await api.put('/auth/profile', data);
  return response.data;
};

export const uploadProfilePhoto = async (file: File) => {
  const formData = new FormData();
  formData.append('photo', file);

  const response = await api.post('/auth/profile/photo', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

// Categories API calls
export const getCategories = async () => {
  const response = await api.get('/categories');
  return response.data;
};

export const createCategory = async (data: {
  name: string;
  type: 'income' | 'expense';
  budget?: number;
}) => {
  const response = await api.post('/categories', data);
  return response.data;
};

export const updateCategory = async (
  id: string,
  data: {
    name?: string;
    budget?: number;
  }
) => {
  const response = await api.put(`/categories/${id}`, data);
  return response.data;
};

export const deleteCategory = async (id: string) => {
  const response = await api.delete(`/categories/${id}`);
  return response.data;
};

// Reports API calls
export interface StatsData {
  totalIncome: number;
  totalExpenses: number;
  netSavings: number;
  incomeChange: number;
  expenseChange: number;
  savingsChange: number;
}

export const getFinancialStats = async (timeRange: string): Promise<{ success: boolean; data: StatsData; message?: string }> => {
  const response = await api.get('/reports/stats', {
    params: { timeRange }
  });
  return response.data as { success: boolean; data: StatsData; message?: string };
};

export const getCategoryBreakdown = async (timeRange: string) => {
  const response = await api.get('/reports/categories', {
    params: { timeRange }
  });
  return response.data;
};

export const getSavingsTrend = async (timeRange: string) => {
  const response = await api.get('/reports/savings', {
    params: { timeRange }
  });
  return response.data;
};

export default {
  auth,
  categories,
  transactions,
}; 
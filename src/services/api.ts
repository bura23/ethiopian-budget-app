import axios from 'axios';

const API_URL = 'http://localhost:5001/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  // Add timeout and withCredentials for better error handling
  timeout: 10000,
  withCredentials: true
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Add response interceptor for better error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Server responded with error status
      return Promise.reject(error.response.data);
    } else if (error.request) {
      // Request was made but no response
      return Promise.reject({ message: 'No response from server. Please try again.' });
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
export const getFinancialStats = async (timeRange: string) => {
  const response = await api.get('/reports/stats', {
    params: { timeRange }
  });
  return response.data;
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
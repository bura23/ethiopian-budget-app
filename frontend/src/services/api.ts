// API URL configuration
const API_URL = window.location.hostname === 'localhost' 
  ? 'http://localhost:3000/api'  // Development
  : '/api';                      // Production

// Auth API functions
export const register = async (userData: any) => {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });
  return response.json();
};

export const login = async (credentials: any) => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });
  return response.json();
};

export const getProfile = async () => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${API_URL}/auth/profile`, {
    headers: { 'Authorization': `Bearer ${token}` },
  });
  return response.json();
};

export const updateUserProfile = async (profileData: any) => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${API_URL}/auth/profile`, {
    method: 'PUT',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` 
    },
    body: JSON.stringify(profileData),
  });
  return response.json();
};

export const uploadProfilePhoto = async (file: File) => {
  const token = localStorage.getItem('token');
  const formData = new FormData();
  formData.append('photo', file);
  
  const response = await fetch(`${API_URL}/auth/profile/photo`, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${token}` },
    body: formData,
  });
  return response.json();
};

// Report API functions
export const getFinancialStats = async (timeRange: string) => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${API_URL}/reports/stats?timeRange=${timeRange}`, {
    headers: { 'Authorization': `Bearer ${token}` },
  });
  return response.json();
};

export const getCategoryBreakdown = async (timeRange: string) => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${API_URL}/reports/categories?timeRange=${timeRange}`, {
    headers: { 'Authorization': `Bearer ${token}` },
  });
  return response.json();
};

export const getSavingsTrend = async (timeRange: string) => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${API_URL}/reports/savings?timeRange=${timeRange}`, {
    headers: { 'Authorization': `Bearer ${token}` },
  });
  return response.json();
};

// Category API functions
export const getCategories = async () => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${API_URL}/categories`, {
    headers: { 'Authorization': `Bearer ${token}` },
  });
  return response.json();
};

export const createCategory = async (categoryData: any) => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${API_URL}/categories`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` 
    },
    body: JSON.stringify(categoryData),
  });
  return response.json();
};

// Transaction API functions
export const getTransactions = async () => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${API_URL}/transactions`, {
    headers: { 'Authorization': `Bearer ${token}` },
  });
  return response.json();
};

export const createTransaction = async (transactionData: any) => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${API_URL}/transactions`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` 
    },
    body: JSON.stringify(transactionData),
  });
  return response.json();
}; 
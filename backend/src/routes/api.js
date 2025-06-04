const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

// Import auth controller functions
const authController = require('../controllers/authController');
const { register, login, getProfile, updateProfile } = authController;

// Import profile controller functions  
const profileController = require('../controllers/profileController');
const { uploadPhoto, updatePreferences } = profileController;

// Import category controller functions
const categoryController = require('../controllers/categoryController');
const { getCategories, createCategory, updateCategory, deleteCategory } = categoryController;

// Import transaction controller functions
const transactionController = require('../controllers/transactionController');
const { getTransactions, createTransaction, updateTransaction, deleteTransaction, getTransactionStats } = transactionController;

// Import report controller functions
const reportController = require('../controllers/reportController');
const { getFinancialStats, getCategoryBreakdown, getSavingsTrend } = reportController;

// Auth routes
router.post('/auth/register', register);
router.post('/auth/login', login);
router.get('/auth/profile', auth, getProfile);
router.put('/auth/profile', auth, updateProfile);
router.post('/auth/profile/photo', auth, uploadPhoto);
router.put('/auth/preferences', auth, updatePreferences);

// Category routes
router.get('/categories', auth, getCategories);
router.post('/categories', auth, createCategory);
router.put('/categories/:id', auth, updateCategory);
router.delete('/categories/:id', auth, deleteCategory);

// Transaction routes
router.get('/transactions', auth, getTransactions);
router.post('/transactions', auth, createTransaction);
router.put('/transactions/:id', auth, updateTransaction);
router.delete('/transactions/:id', auth, deleteTransaction);
router.get('/transactions/stats', auth, getTransactionStats);

// Report routes
router.get('/reports/stats', auth, getFinancialStats);
router.get('/reports/categories', auth, getCategoryBreakdown);
router.get('/reports/savings', auth, getSavingsTrend);

module.exports = router; 
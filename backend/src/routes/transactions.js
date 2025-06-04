const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/auth');
const {
  getTransactions,
  createTransaction,
  updateTransaction,
  deleteTransaction,
  getTransactionStats
} = require('../controllers/transactions');

// Mock transactions data (replace with database in production)
const transactions = [];

router.use(authenticate); // Protect all transaction routes

// Get all transactions
router.get('/', async (req, res) => {
  try {
    res.json({
      success: true,
      transactions
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create transaction
router.post('/', async (req, res) => {
  try {
    const { amount, type, category_id, description, date } = req.body;

    const transaction = {
      id: transactions.length + 1,
      amount,
      type,
      category_id,
      description,
      date: date || new Date().toISOString(),
      created_at: new Date().toISOString()
    };

    transactions.push(transaction);

    res.status(201).json({
      success: true,
      transaction
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update transaction
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { amount, type, category_id, description, date } = req.body;

    const transaction = transactions.find(t => t.id === parseInt(id));
    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    transaction.amount = amount || transaction.amount;
    transaction.type = type || transaction.type;
    transaction.category_id = category_id || transaction.category_id;
    transaction.description = description || transaction.description;
    transaction.date = date || transaction.date;

    res.json({
      success: true,
      transaction
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete transaction
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const index = transactions.findIndex(t => t.id === parseInt(id));
    if (index === -1) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    transactions.splice(index, 1);

    res.json({
      success: true,
      message: 'Transaction deleted successfully'
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; 
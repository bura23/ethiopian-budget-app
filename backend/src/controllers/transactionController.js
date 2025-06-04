const pool = require('../config/database');

const getTransactions = async (req, res) => {
  try {
    const { startDate, endDate, type, categoryId } = req.query;
    const userId = req.user.id;

    let query = 'SELECT t.*, c.name as category_name FROM transactions t LEFT JOIN categories c ON t.category_id = c.id WHERE t.user_id = ?';
    const queryParams = [userId];

    if (startDate) {
      query += ' AND t.date >= ?';
      queryParams.push(startDate);
    }
    if (endDate) {
      query += ' AND t.date <= ?';
      queryParams.push(endDate);
    }
    if (type) {
      query += ' AND t.type = ?';
      queryParams.push(type);
    }
    if (categoryId) {
      query += ' AND t.category_id = ?';
      queryParams.push(categoryId);
    }

    query += ' ORDER BY t.date DESC';

    const [transactions] = await pool.query(query, queryParams);

    res.json({
      success: true,
      data: transactions
    });
  } catch (error) {
    console.error('Get transactions error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch transactions'
    });
  }
};

const getTransactionStats = async (req, res) => {
  try {
    const [monthlyStats] = await pool.query(
      `SELECT 
         DATE_FORMAT(date, '%Y-%m') as month,
         type,
         SUM(amount) as total
       FROM transactions
       WHERE user_id = ?
       GROUP BY DATE_FORMAT(date, '%Y-%m'), type
       ORDER BY month DESC, type`,
      [req.user.id]
    );

    const stats = monthlyStats.reduce((acc, stat) => {
      if (!acc[stat.month]) {
        acc[stat.month] = {
          month: stat.month,
          income: 0,
          expenses: 0
        };
      }
      if (stat.type === 'income') {
        acc[stat.month].income = stat.total;
      } else {
        acc[stat.month].expenses = stat.total;
      }
      return acc;
    }, {});

    res.json({
      success: true,
      stats: Object.values(stats)
    });
  } catch (error) {
    console.error('Get transaction stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching transaction stats'
    });
  }
};

const createTransaction = async (req, res) => {
  try {
    const { categoryId, amount, description, date, type } = req.body;
    const userId = req.user.id;

    // Validate required fields
    if (!categoryId || !amount || !date || !type || !['income', 'expense'].includes(type)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid transaction data. All fields are required.'
      });
    }

    // Verify category exists and belongs to user
    const [category] = await pool.query(
      'SELECT * FROM categories WHERE id = ? AND user_id = ? AND type = ?',
      [categoryId, userId, type]
    );

    if (category.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Invalid category'
      });
    }

    // Create transaction
    const [result] = await pool.query(
      'INSERT INTO transactions (user_id, category_id, amount, description, date, type) VALUES (?, ?, ?, ?, ?, ?)',
      [userId, categoryId, amount, description || '', date, type]
    );

    const [newTransaction] = await pool.query(
      'SELECT t.*, c.name as category_name FROM transactions t LEFT JOIN categories c ON t.category_id = c.id WHERE t.id = ?',
      [result.insertId]
    );

    res.status(201).json({
      success: true,
      data: newTransaction[0]
    });
  } catch (error) {
    console.error('Create transaction error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create transaction'
    });
  }
};

const updateTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const { categoryId, amount, description, date, type } = req.body;
    const userId = req.user.id;

    // Check if transaction exists and belongs to user
    const [existing] = await pool.query(
      'SELECT * FROM transactions WHERE id = ? AND user_id = ?',
      [id, userId]
    );

    if (existing.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Transaction not found'
      });
    }

    // If type is being changed, verify new category matches
    if (type && categoryId) {
      const [category] = await pool.query(
        'SELECT * FROM categories WHERE id = ? AND user_id = ? AND type = ?',
        [categoryId, userId, type]
      );

      if (category.length === 0) {
        return res.status(400).json({
          success: false,
          message: 'Invalid category for transaction type'
        });
      }
    }

    // Build update query
    const updates = [];
    const values = [];
    if (categoryId) {
      updates.push('category_id = ?');
      values.push(categoryId);
    }
    if (amount) {
      updates.push('amount = ?');
      values.push(amount);
    }
    if (description !== undefined) {
      updates.push('description = ?');
      values.push(description);
    }
    if (date) {
      updates.push('date = ?');
      values.push(date);
    }
    if (type) {
      updates.push('type = ?');
      values.push(type);
    }
    values.push(id, userId);

    await pool.query(
      `UPDATE transactions SET ${updates.join(', ')} WHERE id = ? AND user_id = ?`,
      values
    );

    const [updated] = await pool.query(
      'SELECT t.*, c.name as category_name FROM transactions t LEFT JOIN categories c ON t.category_id = c.id WHERE t.id = ?',
      [id]
    );

    res.json({
      success: true,
      data: updated[0]
    });
  } catch (error) {
    console.error('Update transaction error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update transaction'
    });
  }
};

const deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    // Check if transaction exists and belongs to user
    const [existing] = await pool.query(
      'SELECT * FROM transactions WHERE id = ? AND user_id = ?',
      [id, userId]
    );

    if (existing.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Transaction not found'
      });
    }

    await pool.query(
      'DELETE FROM transactions WHERE id = ? AND user_id = ?',
      [id, userId]
    );

    res.json({
      success: true,
      message: 'Transaction deleted successfully'
    });
  } catch (error) {
    console.error('Delete transaction error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete transaction'
    });
  }
};

module.exports = {
  getTransactions,
  getTransactionStats,
  createTransaction,
  updateTransaction,
  deleteTransaction
}; 
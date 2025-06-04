const pool = require('../config/database');

const getCategories = async (req, res) => {
  try {
    const [categories] = await pool.query(
      'SELECT * FROM categories WHERE user_id = ? ORDER BY name',
      [req.user.id]
    );
    
    res.json({
      success: true,
      data: categories
    });
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch categories'
    });
  }
};

const createCategory = async (req, res) => {
  try {
    const { name, type, budget } = req.body;
    
    // Validate required fields
    if (!name || !type || typeof name !== 'string' || !['income', 'expense'].includes(type)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid category data. Name and type are required.'
      });
    }

    // Check if category already exists for this user
    const [existing] = await pool.query(
      'SELECT id FROM categories WHERE user_id = ? AND name = ? AND type = ?',
      [req.user.id, name, type]
    );

    if (existing.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'A category with this name already exists'
      });
    }

    // Create new category
    const [result] = await pool.query(
      'INSERT INTO categories (name, type, budget, user_id) VALUES (?, ?, ?, ?)',
      [name, type, budget || 0, req.user.id]
    );

    const [newCategory] = await pool.query(
      'SELECT * FROM categories WHERE id = ?',
      [result.insertId]
    );

    res.status(201).json({
      success: true,
      data: newCategory[0]
    });
  } catch (error) {
    console.error('Create category error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create category'
    });
  }
};

const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, budget } = req.body;

    // Validate input
    if (!name && budget === undefined) {
      return res.status(400).json({
        success: false,
        message: 'No valid fields to update'
      });
    }

    // Check if category exists and belongs to user
    const [existing] = await pool.query(
      'SELECT * FROM categories WHERE id = ? AND user_id = ?',
      [id, req.user.id]
    );

    if (existing.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Category not found'
      });
    }

    // Build update query dynamically
    const updates = [];
    const values = [];
    if (name) {
      updates.push('name = ?');
      values.push(name);
    }
    if (budget !== undefined) {
      updates.push('budget = ?');
      values.push(budget);
    }
    values.push(id, req.user.id);

    await pool.query(
      `UPDATE categories SET ${updates.join(', ')} WHERE id = ? AND user_id = ?`,
      values
    );

    const [updated] = await pool.query(
      'SELECT * FROM categories WHERE id = ?',
      [id]
    );

    res.json({
      success: true,
      data: updated[0]
    });
  } catch (error) {
    console.error('Update category error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update category'
    });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if category exists and belongs to user
    const [existing] = await pool.query(
      'SELECT * FROM categories WHERE id = ? AND user_id = ?',
      [id, req.user.id]
    );

    if (existing.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Category not found'
      });
    }

    // Check if category has transactions
    const [transactions] = await pool.query(
      'SELECT COUNT(*) as count FROM transactions WHERE category_id = ?',
      [id]
    );

    if (transactions[0].count > 0) {
      return res.status(400).json({
        success: false,
        message: 'Cannot delete category with existing transactions'
      });
    }

    await pool.query(
      'DELETE FROM categories WHERE id = ? AND user_id = ?',
      [id, req.user.id]
    );

    res.json({
      success: true,
      message: 'Category deleted successfully'
    });
  } catch (error) {
    console.error('Delete category error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete category'
    });
  }
};

module.exports = {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory
}; 
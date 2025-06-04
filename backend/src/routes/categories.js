const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/auth');
const {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory
} = require('../controllers/categories');

router.use(authenticate); // Protect all category routes

// Mock categories data (replace with database in production)
const categories = [];

// Get all categories
router.get('/', async (req, res) => {
  try {
    res.json({
      success: true,
      categories
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create category
router.post('/', async (req, res) => {
  try {
    const { name, type } = req.body;

    const category = {
      id: categories.length + 1,
      name,
      type,
      created_at: new Date().toISOString()
    };

    categories.push(category);

    res.status(201).json({
      success: true,
      category
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update category
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, type } = req.body;

    const category = categories.find(c => c.id === parseInt(id));
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    category.name = name || category.name;
    category.type = type || category.type;

    res.json({
      success: true,
      category
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete category
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const index = categories.findIndex(c => c.id === parseInt(id));
    if (index === -1) {
      return res.status(404).json({ message: 'Category not found' });
    }

    categories.splice(index, 1);

    res.json({
      success: true,
      message: 'Category deleted successfully'
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; 
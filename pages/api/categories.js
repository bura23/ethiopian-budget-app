export default function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Mock categories data
  const mockCategories = [
    { id: 1, name: 'Food & Dining', type: 'expense', color: '#FF6B6B', icon: '🍽️' },
    { id: 2, name: 'Transportation', type: 'expense', color: '#4ECDC4', icon: '🚗' },
    { id: 3, name: 'Shopping', type: 'expense', color: '#45B7D1', icon: '🛍️' },
    { id: 4, name: 'Entertainment', type: 'expense', color: '#96CEB4', icon: '🎬' },
    { id: 5, name: 'Bills & Utilities', type: 'expense', color: '#FFEAA7', icon: '💡' },
    { id: 6, name: 'Healthcare', type: 'expense', color: '#DDA0DD', icon: '🏥' },
    { id: 7, name: 'Salary', type: 'income', color: '#98D8C8', icon: '💼' },
    { id: 8, name: 'Freelance', type: 'income', color: '#F7DC6F', icon: '💻' },
    { id: 9, name: 'Investment', type: 'income', color: '#BB8FCE', icon: '📈' }
  ];

  if (req.method === 'GET') {
    res.status(200).json({
      success: true,
      categories: mockCategories
    });
  } else if (req.method === 'POST') {
    const { name, type, color, icon } = req.body;
    
    if (!name || !type) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields'
      });
    }

    const newCategory = {
      id: mockCategories.length + 1,
      name,
      type,
      color: color || '#95A5A6',
      icon: icon || '📝'
    };

    res.status(201).json({
      success: true,
      message: 'Category created successfully',
      category: newCategory
    });
  } else {
    res.status(405).json({ success: false, message: 'Method not allowed' });
  }
} 
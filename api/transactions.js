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

  // Mock transactions data
  const mockTransactions = [
    {
      id: 1,
      amount: 5000,
      description: 'Monthly Salary',
      category_id: 7,
      category_name: 'Salary',
      type: 'income',
      date: '2025-06-01',
      created_at: '2025-06-01T08:00:00Z'
    },
    {
      id: 2,
      amount: 1200,
      description: 'Grocery Shopping',
      category_id: 1,
      category_name: 'Food & Dining',
      type: 'expense',
      date: '2025-06-05',
      created_at: '2025-06-05T14:30:00Z'
    },
    {
      id: 3,
      amount: 500,
      description: 'Bus Transport',
      category_id: 2,
      category_name: 'Transportation',
      type: 'expense',
      date: '2025-06-08',
      created_at: '2025-06-08T09:15:00Z'
    }
  ];

  if (req.method === 'GET') {
    res.status(200).json({
      success: true,
      transactions: mockTransactions
    });
  } else if (req.method === 'POST') {
    const { amount, description, category_id, type, date } = req.body;
    
    if (!amount || !description || !category_id || !type) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields'
      });
    }

    const newTransaction = {
      id: mockTransactions.length + 1,
      amount: parseFloat(amount),
      description,
      category_id: parseInt(category_id),
      category_name: 'Unknown Category',
      type,
      date: date || new Date().toISOString().split('T')[0],
      created_at: new Date().toISOString()
    };

    res.status(201).json({
      success: true,
      message: 'Transaction created successfully',
      transaction: newTransaction
    });
  } else {
    res.status(405).json({ success: false, message: 'Method not allowed' });
  }
} 
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

  if (req.method === 'GET') {
    // Mock financial statistics
    const stats = {
      total_income: 75000,
      total_expenses: 45500,
      net_income: 29500,
      categories: [
        { name: 'Food & Dining', amount: 15000, percentage: 33.0, type: 'expense' },
        { name: 'Transportation', amount: 8500, percentage: 18.7, type: 'expense' },
        { name: 'Bills & Utilities', amount: 12000, percentage: 26.4, type: 'expense' },
        { name: 'Entertainment', amount: 6000, percentage: 13.2, type: 'expense' },
        { name: 'Healthcare', amount: 4000, percentage: 8.8, type: 'expense' },
        { name: 'Salary', amount: 60000, percentage: 80.0, type: 'income' },
        { name: 'Freelance', amount: 15000, percentage: 20.0, type: 'income' }
      ],
      monthly_trends: [
        { month: 'Jan', income: 65000, expenses: 40000 },
        { month: 'Feb', income: 70000, expenses: 42000 },
        { month: 'Mar', income: 68000, expenses: 38000 },
        { month: 'Apr', income: 75000, expenses: 45000 },
        { month: 'May', income: 72000, expenses: 41000 },
        { month: 'Jun', income: 75000, expenses: 45500 }
      ],
      budget_utilization: {
        food: { budgeted: 18000, spent: 15000, percentage: 83.3 },
        transport: { budgeted: 10000, spent: 8500, percentage: 85.0 },
        utilities: { budgeted: 15000, spent: 12000, percentage: 80.0 },
        entertainment: { budgeted: 8000, spent: 6000, percentage: 75.0 }
      }
    };

    res.status(200).json({
      success: true,
      stats: stats
    });
  } else {
    res.status(405).json({ success: false, message: 'Method not allowed' });
  }
} 
const pool = require('../config/database');

const getFinancialStats = async (req, res) => {
  try {
    const { timeRange } = req.query;
    const userId = req.user.id;
    
    let intervalValue = 1;
    let intervalUnit = 'MONTH';
    
    switch (timeRange) {
      case 'week':
        intervalValue = 1;
        intervalUnit = 'WEEK';
        break;
      case 'month':
        intervalValue = 1;
        intervalUnit = 'MONTH';
        break;
      case 'year':
        intervalValue = 1;
        intervalUnit = 'YEAR';
        break;
      default:
        intervalValue = 1;
        intervalUnit = 'MONTH';
    }

    // Get current period stats - Fixed SQL syntax
    const [currentStats] = await pool.query(
      `SELECT 
        COALESCE(SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END), 0) as total_income,
        COALESCE(SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END), 0) as total_expenses
       FROM transactions 
       WHERE user_id = ? AND date >= DATE_SUB(CURDATE(), INTERVAL ${intervalValue} ${intervalUnit})`,
      [userId]
    );

    // Get previous period stats for comparison - Fixed SQL syntax
    const [previousStats] = await pool.query(
      `SELECT 
        COALESCE(SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END), 0) as prev_income,
        COALESCE(SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END), 0) as prev_expenses
       FROM transactions 
       WHERE user_id = ? 
       AND date >= DATE_SUB(CURDATE(), INTERVAL ${intervalValue * 2} ${intervalUnit}) 
       AND date < DATE_SUB(CURDATE(), INTERVAL ${intervalValue} ${intervalUnit})`,
      [userId]
    );

    // Calculate percentages
    const incomeChange = previousStats[0].prev_income === 0 ? 100 :
      ((currentStats[0].total_income - previousStats[0].prev_income) / previousStats[0].prev_income) * 100;
    
    const expenseChange = previousStats[0].prev_expenses === 0 ? 100 :
      ((currentStats[0].total_expenses - previousStats[0].prev_expenses) / previousStats[0].prev_expenses) * 100;
    
    const netSavings = currentStats[0].total_income - currentStats[0].total_expenses;
    const prevSavings = previousStats[0].prev_income - previousStats[0].prev_expenses;
    const savingsChange = prevSavings === 0 ? 100 :
      ((netSavings - prevSavings) / Math.abs(prevSavings)) * 100;

    // Get timeline data - Fixed SQL syntax
    const [timelineData] = await pool.query(
      `SELECT 
        DATE_FORMAT(date, '%Y-%m-%d') as date,
        SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END) as income,
        SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END) as expense
       FROM transactions 
       WHERE user_id = ? AND date >= DATE_SUB(CURDATE(), INTERVAL ${intervalValue} ${intervalUnit})
       GROUP BY DATE_FORMAT(date, '%Y-%m-%d') 
       ORDER BY date ASC`,
      [userId]
    );

    const timeline = timelineData.map(row => row.date);
    const incomeData = timelineData.map(row => Number(row.income));
    const expenseData = timelineData.map(row => Number(row.expense));

    res.json({
      success: true,
      data: {
        totalIncome: Number(currentStats[0].total_income),
        totalExpenses: Number(currentStats[0].total_expenses),
        netSavings: Number(netSavings),
        incomeChange: Number(incomeChange),
        expenseChange: Number(expenseChange),
        savingsChange: Number(savingsChange),
        timeline,
        incomeData,
        expenseData
      }
    });
  } catch (error) {
    console.error('Get financial stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get financial statistics'
    });
  }
};

const getCategoryBreakdown = async (req, res) => {
  try {
    const { timeRange } = req.query;
    const userId = req.user.id;
    
    let intervalValue = 1;
    let intervalUnit = 'MONTH';
    
    switch (timeRange) {
      case 'week':
        intervalValue = 1;
        intervalUnit = 'WEEK';
        break;
      case 'month':
        intervalValue = 1;
        intervalUnit = 'MONTH';
        break;
      case 'year':
        intervalValue = 1;
        intervalUnit = 'YEAR';
        break;
      default:
        intervalValue = 1;
        intervalUnit = 'MONTH';
    }

    // Get total expenses for the period - Fixed SQL syntax
    const [totalResult] = await pool.query(
      `SELECT COALESCE(SUM(amount), 0) as total_expenses
       FROM transactions 
       WHERE user_id = ? 
       AND type = 'expense' 
       AND date >= DATE_SUB(CURDATE(), INTERVAL ${intervalValue} ${intervalUnit})`,
      [userId]
    );

    const totalExpenses = totalResult[0].total_expenses;

    // Get breakdown by category - Fixed SQL syntax
    const [categories] = await pool.query(
      `SELECT c.name, 
        COALESCE(SUM(t.amount), 0) as total,
        (COALESCE(SUM(t.amount), 0) / ?) * 100 as percentage
       FROM categories c 
       LEFT JOIN transactions t ON c.id = t.category_id 
         AND t.user_id = ? 
         AND t.type = 'expense' 
         AND t.date >= DATE_SUB(CURDATE(), INTERVAL ${intervalValue} ${intervalUnit})
       WHERE c.user_id = ? AND c.type = 'expense' 
       GROUP BY c.id, c.name 
       HAVING total > 0 
       ORDER BY total DESC`,
      [totalExpenses || 1, userId, userId]
    );

    res.json({
      success: true,
      data: categories.map(cat => ({
        name: cat.name,
        percentage: parseFloat(cat.percentage.toFixed(2))
      }))
    });
  } catch (error) {
    console.error('Get category breakdown error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get category breakdown'
    });
  }
};

const getSavingsTrend = async (req, res) => {
  try {
    const { timeRange } = req.query;
    const userId = req.user.id;
    
    let dateFormat = '%Y-%m-%d';
    let intervalValue = 1;
    let intervalUnit = 'MONTH';
    
    switch (timeRange) {
      case 'week':
        dateFormat = '%Y-%m-%d';
        intervalValue = 1;
        intervalUnit = 'WEEK';
        break;
      case 'month':
        dateFormat = '%Y-%m-%d';
        intervalValue = 1;
        intervalUnit = 'MONTH';
        break;
      case 'year':
        dateFormat = '%Y-%m';
        intervalValue = 1;
        intervalUnit = 'YEAR';
        break;
      default:
        dateFormat = '%Y-%m-%d';
        intervalValue = 1;
        intervalUnit = 'MONTH';
    }

    // Fixed SQL syntax
    const [savingsData] = await pool.query(
      `SELECT 
        DATE_FORMAT(date, ?) as period,
        SUM(CASE WHEN type = 'income' THEN amount ELSE -amount END) as net_amount
       FROM transactions 
       WHERE user_id = ? AND date >= DATE_SUB(CURDATE(), INTERVAL ${intervalValue} ${intervalUnit})
       GROUP BY period 
       ORDER BY period ASC`,
      [dateFormat, userId]
    );

    let runningTotal = 0;
    const trend = savingsData.map(row => {
      runningTotal += Number(row.net_amount);
      return {
        date: row.period,
        amount: runningTotal
      };
    });

    res.json({
      success: true,
      data: {
        timeline: trend.map(t => t.date),
        data: trend.map(t => t.amount)
      }
    });
  } catch (error) {
    console.error('Get savings trend error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get savings trend'
    });
  }
};

module.exports = {
  getFinancialStats,
  getCategoryBreakdown,
  getSavingsTrend
};
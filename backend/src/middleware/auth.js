const jwt = require('jsonwebtoken');
const pool = require('../config/database');

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      throw new Error();
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    const [users] = await pool.query(
      'SELECT id, name, email FROM users WHERE id = ?',
      [decoded.id]
    );

    if (users.length === 0) {
      throw new Error();
    }

    req.token = token;
    req.user = users[0];
    next();
  } catch (error) {
    res.status(401).json({ error: 'Please authenticate' });
  }
};

module.exports = auth; 
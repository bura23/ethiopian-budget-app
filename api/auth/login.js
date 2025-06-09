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

  if (req.method === 'POST') {
    const { email, password } = req.body;
    
    // Basic validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Missing email or password'
      });
    }

    // Mock successful login (in production, you'd verify against database)
    res.status(200).json({
      success: true,
      message: 'Login successful',
      token: `vercel_jwt_token_${Date.now()}`,
      user: {
        id: 1,
        name: 'Demo User',
        email: email
      }
    });
  } else {
    res.status(405).json({ success: false, message: 'Method not allowed' });
  }
} 
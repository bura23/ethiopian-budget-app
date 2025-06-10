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
    const { name, email, password } = req.body;
    
    // Basic validation
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields'
      });
    }

    // Mock successful registration (in production, you'd save to database)
    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      token: `vercel_jwt_token_${Date.now()}`,
      user: {
        id: Math.floor(Math.random() * 1000),
        name: name,
        email: email
      }
    });
  } else {
    res.status(405).json({ success: false, message: 'Method not allowed' });
  }
} 
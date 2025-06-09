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
    res.status(200).json({
      status: 'OK',
      message: 'Ethiopian Budget App API is running on Vercel',
      version: '1.0.0',
      timestamp: new Date().toISOString(),
      platform: 'Vercel Serverless'
    });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
} 
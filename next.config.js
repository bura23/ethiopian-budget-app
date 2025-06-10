/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // CORS configuration for API routes
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET, POST, PUT, DELETE, OPTIONS' },
          { key: 'Access-Control-Allow-Headers', value: 'Content-Type, Authorization, X-Requested-With' },
        ],
      },
    ]
  },

  // Environment variables
  env: {
    NODE_ENV: process.env.NODE_ENV || 'development',
  },
}

module.exports = nextConfig 
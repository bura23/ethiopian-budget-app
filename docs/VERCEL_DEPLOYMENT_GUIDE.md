# Vercel Deployment Guide

Deploy your Ethiopian Budget App to Vercel with both frontend and backend in one platform.

## 🚀 Quick Deployment

### Option 1: Deploy via Vercel CLI (Recommended)

1. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy from your project directory**:
   ```bash
   vercel
   ```

4. **Follow the prompts**:
   - Set up and deploy? **Y**
   - Which scope? Choose your account
   - Link to existing project? **N** (for first deployment)
   - What's your project's name? `ethiopian-budget-app`
   - In which directory is your code located? `./`

### Option 2: Deploy via GitHub (Automatic)

1. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Deploy to Vercel"
   git push origin main
   ```

2. **Connect to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import from GitHub
   - Select your repository
   - Configure and deploy

## 📋 Pre-Deployment Checklist

- ✅ All API functions are in `/api/` directory
- ✅ `vercel.json` configuration exists
- ✅ `package.json` has `vercel-build` script
- ✅ Frontend builds successfully (`npm run build`)
- ✅ Environment variables configured (if needed)

## 🛠 Project Structure for Vercel

```
└── your-project/
    ├── api/                    # Serverless functions
    │   ├── health.js          # GET /api/health
    │   ├── categories.js      # GET/POST /api/categories
    │   ├── transactions.js    # GET/POST /api/transactions
    │   ├── auth/
    │   │   ├── login.js       # POST /api/auth/login
    │   │   └── register.js    # POST /api/auth/register
    │   └── reports/
    │       └── stats.js       # GET /api/reports/stats
    ├── src/                   # React source files
    ├── public/                # Static assets
    ├── vercel.json           # Vercel configuration
    ├── package.json          # Dependencies & scripts
    └── vite.config.ts        # Vite configuration
```

## 🔧 Environment Variables (Optional)

If you need environment variables:

1. **Via Vercel Dashboard**:
   - Go to your project → Settings → Environment Variables
   - Add variables like `DATABASE_URL`, `JWT_SECRET`, etc.

2. **Via CLI**:
   ```bash
   vercel env add JWT_SECRET
   vercel env add DATABASE_URL
   ```

## 🌐 API Endpoints

After deployment, your API will be available at:

```
https://your-app.vercel.app/api/health
https://your-app.vercel.app/api/auth/login
https://your-app.vercel.app/api/auth/register
https://your-app.vercel.app/api/categories
https://your-app.vercel.app/api/transactions
https://your-app.vercel.app/api/reports/stats
```

## 🔍 Testing Your Deployment

1. **Health Check**:
   ```bash
   curl https://your-app.vercel.app/api/health
   ```

2. **Frontend**:
   - Visit `https://your-app.vercel.app`
   - Test login/register functionality
   - Verify API connections

## 🐛 Troubleshooting

### Common Issues:

1. **Build Failures**:
   ```bash
   # Test locally first
   npm run build
   npm run preview
   ```

2. **API CORS Issues**:
   - Check `vercel.json` headers configuration
   - Verify API functions include CORS headers

3. **Function Timeouts**:
   - Serverless functions have a 10s timeout limit
   - Optimize database queries and API calls

4. **Environment Variables**:
   ```bash
   # Check if variables are set
   vercel env ls
   ```

### Debug Commands:

```bash
# View deployment logs
vercel logs your-deployment-url

# Local development with Vercel
vercel dev

# Check function output
vercel logs --follow
```

## 🚀 Production Tips

1. **Domain Setup**:
   - Add custom domain in Vercel dashboard
   - Configure DNS settings

2. **Performance**:
   - Enable analytics in Vercel dashboard
   - Monitor function execution times

3. **Security**:
   - Use environment variables for sensitive data
   - Implement proper authentication
   - Validate all inputs

## 📊 Monitoring

- **Vercel Analytics**: Built-in performance monitoring
- **Function Logs**: Real-time serverless function logs
- **Deployment History**: Track all deployments and rollbacks

## 🔄 Updates & Redeployment

### Automatic (GitHub):
- Push to main branch
- Vercel auto-deploys

### Manual (CLI):
```bash
vercel --prod
```

## 💡 Next Steps

1. **Database Integration**:
   - Connect to MongoDB Atlas, PlanetScale, or Supabase
   - Update API functions to use real database

2. **Authentication**:
   - Implement JWT token validation
   - Add user session management

3. **Advanced Features**:
   - File uploads for receipts
   - Email notifications
   - Export functionality

---

## 🎉 Success!

Your Ethiopian Budget App is now live on Vercel! 

- **Frontend**: `https://your-app.vercel.app`
- **API**: `https://your-app.vercel.app/api/*`

### Quick Links:
- [Vercel Dashboard](https://vercel.com/dashboard)
- [Vercel Documentation](https://vercel.com/docs)
- [Serverless Functions Guide](https://vercel.com/docs/functions)

---

*Deployed with ❤️ on Vercel* 
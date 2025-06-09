# Frontend Updates for PHP Backend

## ✅ **Changes Applied Automatically**

I've already updated these files for you:

1. **`src/services/api.ts`** - Updated API URL configuration
2. **`frontend/src/services/api.ts`** - Updated API URL configuration  
3. **`vite.config.ts`** - Updated proxy configuration for development

## 🔧 **What Changed**

### **API URL Configuration**
- **Development**: Uses `http://localhost:3000/api` (PHP backend)
- **Production**: Uses `/api` (relative path for your deployed site)

### **Removed Node.js Port Detection**
- Removed automatic port detection (5001, 5002, etc.)
- Simplified to work with PHP backend on standard web ports

## 🚀 **Additional Steps You Need to Do**

### 1. **Set Up PHP Development Server (for local testing)**

For local development, you'll need to run a PHP server. Choose one option:

**Option A: Using PHP Built-in Server**
```bash
cd backend-php
php -S localhost:3000 -t . api/index.php
```

**Option B: Using XAMPP/WAMP/MAMP**
- Install XAMPP/WAMP/MAMP
- Place `backend-php` folder in `htdocs/api/`
- Access at `http://localhost/api/`

**Option C: Local Apache Setup**
- Configure Apache virtual host
- Point to your `backend-php` directory

### 2. **Update Your Domain in PHP Backend**

Edit `backend-php/config/cors.php` and replace `yourdomain.com`:

```php
$allowedOrigins = [
    'http://localhost:3000',    // Development
    'http://localhost:3001',    // Development alternate
    'https://yourrealdomain.com',  // 🔄 REPLACE THIS
    'http://yourrealdomain.com',   // 🔄 REPLACE THIS
];
```

### 3. **Test Locally**

1. **Start PHP Backend:**
   ```bash
   cd backend-php
   php -S localhost:3000 -t . api/index.php
   ```

2. **Start Frontend:**
   ```bash
   npm run dev
   ```

3. **Test API Connection:**
   - Open browser to `http://localhost:3001` (or your Vite dev port)
   - Check browser console for any API errors
   - Try registering/logging in

### 4. **Build for Production**

```bash
npm run build
```

This creates the `dist/` folder with your built frontend.

## 📁 **Deployment Structure on cPanel**

Your final cPanel structure should look like:

```
public_html/
├── index.html              # Frontend (from dist/)
├── assets/                 # Frontend assets (from dist/assets/)
├── vite.svg               # Frontend assets
├── logo.svg               # Frontend assets
└── api/                   # PHP Backend
    ├── config/
    ├── middleware/
    ├── api/
    ├── vendor/            # PHP dependencies
    ├── composer.json
    ├── .htaccess
    └── uploads/
```

## 🔍 **Testing Your Setup**

### **1. Test API Health**
Visit: `https://yourdomain.com/api/health`

Expected response:
```json
{
  "status": "OK",
  "message": "Ethiopian Budget App PHP API is running",
  "version": "1.0.0"
}
```

### **2. Test Frontend API Connection**
1. Open your frontend: `https://yourdomain.com`
2. Open browser DevTools (F12)
3. Go to Network tab
4. Try to register or login
5. Check if API calls are successful (status 200)

### **3. Check CORS**
If you see CORS errors in browser console:
1. Update `backend-php/config/cors.php` with your actual domain
2. Clear browser cache
3. Test again

## 🛠️ **Troubleshooting**

### **Issue 1: API Calls Fail**
- **Check**: Is PHP backend running?
- **Check**: Is the URL correct? (`/api/health` should work)
- **Solution**: Verify backend deployment and .htaccess rules

### **Issue 2: CORS Errors**
- **Check**: Is your domain in `backend-php/config/cors.php`?
- **Solution**: Add your exact domain to allowed origins

### **Issue 3: 404 on API Routes**
- **Check**: Is `.htaccess` file uploaded and working?
- **Solution**: Verify URL rewriting is enabled in cPanel

### **Issue 4: Database Connection Errors**
- **Check**: Database credentials in `backend-php/config/database.php`
- **Solution**: Verify MySQL connection details from cPanel

## 📝 **Environment Variables (Optional)**

If you want to use environment variables, create these files:

**`.env.development`:**
```env
VITE_API_URL=http://localhost:3000/api
```

**`.env.production`:**
```env
VITE_API_URL=/api
```

Then update the API configuration to use these:
```typescript
const API_URL = import.meta.env.VITE_API_URL || '/api';
```

## ✅ **Verification Checklist**

- [ ] Updated API URLs in frontend code ✅ (Done)
- [ ] Updated Vite proxy configuration ✅ (Done)
- [ ] Set up PHP development server
- [ ] Updated domain in CORS configuration
- [ ] Tested local development setup
- [ ] Built frontend for production (`npm run build`)
- [ ] Uploaded both frontend (`dist/`) and backend (`backend-php/`) to cPanel
- [ ] Tested production API health endpoint
- [ ] Tested production frontend functionality
- [ ] Verified CORS is working
- [ ] Confirmed database operations work

## 🎯 **Summary**

Your frontend is now configured to work with the PHP backend! The main changes:

1. **API URL automatically detects** development vs production
2. **Simplified connection logic** - no more Node.js port detection
3. **Ready for cPanel deployment** with relative API paths

Just set up your PHP backend locally for development, and deploy both frontend and backend to cPanel for production! 🚀 
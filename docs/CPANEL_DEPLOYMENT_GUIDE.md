# cPanel Deployment Guide for Ethiopian Budget App

## 🚨 Issues Found & Solutions

### 1. **Environment Variables Setup**
Create a `.env` file in your backend directory with:

```env
# Database Configuration (Get these from cPanel MySQL section)
DB_HOST=localhost
DB_USER=your_cpanel_mysql_username
DB_PASSWORD=your_cpanel_mysql_password
DB_NAME=your_database_name

# Server Configuration
PORT=5001
NODE_ENV=production

# JWT Secret (generate a strong random string)
JWT_SECRET=your_super_secret_jwt_key_here_use_long_random_string

# API Keys (if using AI features)
VITE_GEMINI_API_KEY=your_gemini_api_key
VITE_HANKO_API_URL=your_hanko_api_url

# Frontend URL (your actual domain)
FRONTEND_URL=https://yourdomain.com
```

### 2. **CORS Configuration**
✅ **FIXED:** Updated server.js to accept your production domain
- Replace `yourdomain.com` with your actual domain in the CORS configuration

### 3. **Database Setup**
1. **Create MySQL Database in cPanel:**
   - Go to MySQL Databases in cPanel
   - Create a new database (name it `ethiopian_budget`)
   - Create a user and assign it to the database
   - Note down: hostname, username, password, database name

2. **Import Database Schema:**
   - Use the SQL file: `backend/src/config/init-db.sql`
   - Import this via phpMyAdmin or MySQL command line

### 4. **Backend Deployment Steps**

1. **Upload Backend Files:**
   ```
   /public_html/api/  (or create an api subdomain)
   ├── src/
   ├── package.json
   ├── .env
   └── uploads/
   ```

2. **Install Dependencies:**
   ```bash
   cd /path/to/backend
   npm install --production
   ```

3. **Start Backend:**
   - Option A: Use Node.js in cPanel (if available)
   - Option B: Use PM2 or forever for process management
   ```bash
   npm start
   ```

### 5. **Frontend Deployment Steps**

1. **Rebuild Frontend with Production Settings:**
   ```bash
   # In your local environment
   npm run build
   ```

2. **Upload Frontend Files:**
   - Upload contents of `dist/` folder to `/public_html/`
   - Or upload to a subdirectory like `/public_html/budget-app/`

### 6. **File Structure on cPanel**
```
public_html/
├── index.html          (from dist/)
├── assets/            (from dist/assets/)
├── vite.svg          
├── logo.svg          
└── api/              (backend files)
    ├── src/
    ├── package.json
    ├── .env
    └── node_modules/
```

### 7. **Common cPanel Issues & Solutions**

**Issue 1: Database Connection Failed**
- Verify database credentials in `.env`
- Check if MySQL service is running
- Ensure database user has proper privileges

**Issue 2: CORS Errors**
- Update the domain in `backend/src/server.js` CORS configuration
- Make sure frontend URL matches exactly

**Issue 3: Node.js Version**
- Check if your cPanel supports Node.js
- Some shared hosting doesn't support Node.js apps
- Consider VPS if Node.js is not available

**Issue 4: File Permissions**
- Set proper permissions for uploaded files
- `chmod 755` for directories
- `chmod 644` for files

### 8. **Testing Deployment**

1. **Test Backend:**
   - Visit: `https://yourdomain.com/api/health`
   - Should return: `{"status":"OK","message":"Server is running"}`

2. **Test Frontend:**
   - Visit: `https://yourdomain.com`
   - Check browser console for errors

3. **Test Database:**
   - Try to register/login
   - Check if data is being saved

### 9. **Environment-Specific Changes Needed**

**Replace these placeholders:**
- `yourdomain.com` → Your actual domain
- Database credentials in `.env`
- API keys if using external services

**Port Configuration:**
- Backend runs on port 5001 by default
- Make sure this port is available on your hosting

### 10. **Debugging Tips**

1. **Check Error Logs:**
   - cPanel Error Logs
   - Node.js application logs
   - Browser console

2. **Common Error Solutions:**
   - `Cannot GET /` → Frontend routing issue
   - `CORS error` → Domain not in allowed origins
   - `Database connection error` → Check .env credentials
   - `404 on API calls` → Backend not running or wrong URL

### 11. **Production Optimizations**

1. **Security:**
   - Change default JWT secret
   - Use strong database passwords
   - Enable HTTPS

2. **Performance:**
   - Enable gzip compression
   - Configure caching headers
   - Optimize image assets

---

## 🔄 Quick Deployment Checklist

- [ ] Create `.env` file with production values
- [ ] Update CORS configuration with your domain
- [ ] Create MySQL database in cPanel
- [ ] Import database schema
- [ ] Upload backend files to `/api/` directory
- [ ] Install Node.js dependencies
- [ ] Rebuild frontend with `npm run build`
- [ ] Upload `dist/` contents to `public_html/`
- [ ] Start backend server
- [ ] Test API endpoint `/api/health`
- [ ] Test frontend application
- [ ] Verify database functionality

---

**Need Help?** Check cPanel documentation for Node.js apps or contact your hosting provider about Node.js support. 
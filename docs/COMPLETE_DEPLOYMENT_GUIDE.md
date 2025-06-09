# 🚀 Complete Deployment Guide for Ethiopian Budget App

## 📋 **Your cPanel Credentials**
- **Username:** yenebind
- **Password:** 147891234$Bura
- **Domain:** (Update with your actual domain)

## 📦 **Deployment Files Ready**

### ✅ **Frontend (Already Created):**
- `frontend-production.zip` (280,275 bytes)

### ✅ **Backend (Need to Create):**
- `backend-php/` folder (complete PHP backend)

## 🔧 **Step-by-Step Deployment**

### **STEP 1: Access cPanel**
1. Go to your hosting provider's cPanel
2. Login with:
   - Username: `yenebind`
   - Password: `147891234$Bura`

### **STEP 2: Deploy Backend (PHP)**

**2.1 Create Backend Zip Manually:**
```bash
# Run this command in your terminal:
cd backend-php
zip -r backend-deployment.zip . -x "*.DS_Store" "test_backend.php"
```

**2.2 Upload Backend:**
1. In cPanel, go to **File Manager**
2. Navigate to `/public_html/`
3. Create folder: `api`
4. Enter `/public_html/api/`
5. Upload `backend-deployment.zip`
6. Extract the zip file
7. Delete the zip file after extraction

**2.3 Install PHP Dependencies:**
1. In cPanel, go to **Terminal** (if available) OR use SSH
2. Run:
   ```bash
   cd /public_html/api
   composer install
   ```
3. If composer not available, contact hosting support

**2.4 Update Backend Configuration:**
1. Edit `/public_html/api/config/cors.php`
2. Replace `yourdomain.com` with your actual domain
3. Update allowed origins:
   ```php
   $allowedOrigins = [
       'https://yourdomain.com',
       'http://yourdomain.com',
       'https://www.yourdomain.com',
       'http://www.yourdomain.com'
   ];
   ```

### **STEP 3: Deploy Frontend**

**3.1 Upload Frontend:**
1. In cPanel File Manager
2. Navigate to `/public_html/`
3. Upload `frontend-production.zip`
4. Extract the zip file in `/public_html/`
5. Delete the zip file after extraction

### **STEP 4: Database Setup**

**4.1 Create MySQL Database:**
1. In cPanel, go to **MySQL Databases**
2. Create database: `yenebind_ethiopian_budget` (if not exists)
3. Note: Username `yenebind_Yeneuser` and password `FwG+,rTHj(e&` are already configured

**4.2 Import Database Schema:**
1. Go to **phpMyAdmin** in cPanel
2. Select database: `yenebind_ethiopian_budget`
3. Go to **Import** tab
4. Copy and paste this SQL:

```sql
-- Ethiopian Budget App Database Schema
USE yenebind_ethiopian_budget;

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  photo_url TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Categories table
CREATE TABLE IF NOT EXISTS categories (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  name VARCHAR(255) NOT NULL,
  type ENUM('income', 'expense') NOT NULL,
  budget DECIMAL(10, 2) DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Transactions table
CREATE TABLE IF NOT EXISTS transactions (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  category_id INT NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  description TEXT,
  date DATE NOT NULL,
  type ENUM('income', 'expense') NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
);

-- Savings Goals table
CREATE TABLE IF NOT EXISTS savings_goals (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  name VARCHAR(255) NOT NULL,
  target_amount DECIMAL(10, 2) NOT NULL,
  current_amount DECIMAL(10, 2) DEFAULT 0,
  target_date DATE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Budget Settings table
CREATE TABLE IF NOT EXISTS budget_settings (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL UNIQUE,
  currency VARCHAR(3) DEFAULT 'ETB',
  monthly_income DECIMAL(10, 2) DEFAULT 0,
  savings_target_percentage INT DEFAULT 20,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

5. Click **Go** to execute

### **STEP 5: Test Deployment**

**5.1 Test Backend API:**
1. Visit: `https://yourdomain.com/api/health`
2. Should return:
   ```json
   {
     "status": "OK",
     "message": "Ethiopian Budget App PHP API is running",
     "version": "1.0.0"
   }
   ```

**5.2 Test Frontend:**
1. Visit: `https://yourdomain.com`
2. Should load your budget app
3. Try registering a new user
4. Test login functionality

### **STEP 6: Final Configuration**

**6.1 Set Strong JWT Secret:**
1. Edit `/public_html/api/middleware/auth.php`
2. Change line 10:
   ```php
   self::$jwtSecret = 'your_super_secure_jwt_secret_key_here_123456789';
   ```

**6.2 Enable HTTPS:**
1. In cPanel, go to **SSL/TLS**
2. Enable **Force HTTPS Redirect**

## 📁 **Final Directory Structure**

```
public_html/
├── index.html              # Frontend entry
├── assets/                 # Frontend JS/CSS
├── vite.svg               
├── logo.svg               
├── manifest.json          
└── api/                   # Backend API
    ├── config/
    ├── middleware/
    ├── api/
    ├── vendor/            # PHP dependencies
    ├── composer.json
    └── .htaccess
```

## ✅ **Verification Checklist**

- [ ] Backend uploaded to `/public_html/api/`
- [ ] Frontend uploaded to `/public_html/`
- [ ] Composer dependencies installed
- [ ] Database schema imported
- [ ] CORS configuration updated with domain
- [ ] JWT secret updated
- [ ] API health check working
- [ ] Frontend loads correctly
- [ ] User registration/login working
- [ ] HTTPS enabled

## 🛠️ **Troubleshooting**

### **Backend Issues:**
- Check PHP error logs in cPanel
- Verify file permissions (755 for directories, 644 for files)
- Ensure .htaccess is uploaded

### **Database Issues:**
- Verify database credentials in `config/database.php`
- Check if tables were created in phpMyAdmin
- Test database connection

### **Frontend Issues:**
- Check browser console for errors
- Verify API calls are going to correct URL
- Check CORS errors

## 📞 **Need Help?**

1. **Check cPanel error logs**
2. **Test API endpoints individually**
3. **Verify all files uploaded correctly**
4. **Contact hosting support for server-specific issues**

---

## 🎯 **Quick Commands Summary**

**Create Backend Zip:**
```bash
cd backend-php
zip -r backend-deployment.zip . -x "*.DS_Store"
```

**Test API (after deployment):**
```bash
curl https://yourdomain.com/api/health
```

**Your app will be live at:** `https://yourdomain.com` 🚀 
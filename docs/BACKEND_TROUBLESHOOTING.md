# PHP Backend Troubleshooting Guide

## 🔧 **I've Fixed Common Issues:**

### ✅ **PHP Compatibility Fixed:**
- Replaced `str_starts_with()` with `strpos()` (PHP 7.4+ compatibility)
- Replaced `str_contains()` with `strpos()` (PHP 7.4+ compatibility)
- Your backend should now work with PHP 7.4+

### ✅ **Composer Dependencies:**
- JWT library (`firebase/php-jwt`) installed successfully
- Autoloader is working

## 🧪 **Test Your Backend:**

### **Option 1: Run Test Script**
```bash
cd backend-php
php test_backend.php
```

### **Option 2: Start PHP Development Server**
```bash
cd backend-php
php -S localhost:3000 -t . api/index.php
```

Then test in another terminal:
```bash
curl http://localhost:3000/health
```

Expected response:
```json
{
  "status": "OK",
  "message": "Ethiopian Budget App PHP API is running",
  "version": "1.0.0",
  "timestamp": "2024-01-01 12:00:00"
}
```

## 🚨 **Common Issues & Solutions:**

### **Issue 1: Database Connection Failed**
**Symptoms:** "Database connection failed" error

**Solutions:**
1. **Check MySQL is running** (if testing locally with MySQL)
2. **Update database credentials** in `config/database.php`:
   ```php
   // For local testing, you might need:
   $host = 'localhost';
   $username = 'root';
   $password = '';  // or your local MySQL password
   $dbname = 'test_budget';  // create a test database
   ```

3. **Create test database** (for local development):
   ```sql
   CREATE DATABASE test_budget;
   USE test_budget;
   -- Import the SQL schema from backend/src/config/init-db.sql
   ```

### **Issue 2: CORS Errors**
**Symptoms:** Browser console shows CORS errors

**Solution:** Update `config/cors.php`:
```php
$allowedOrigins = [
    'http://localhost:3000',
    'http://localhost:3001',  // Add your frontend dev port
    'https://yourdomain.com', // Add your actual domain
];
```

### **Issue 3: JWT Token Errors**
**Symptoms:** "Invalid token" or authentication errors

**Solutions:**
1. **Check JWT secret** in auth middleware
2. **Test token generation:**
   ```php
   require_once 'middleware/auth.php';
   $token = AuthMiddleware::generateToken(1);
   echo "Test token: " . $token;
   ```

### **Issue 4: 404 Not Found**
**Symptoms:** All API calls return 404

**Solutions:**
1. **Check .htaccess** is working
2. **Test direct file access:** `http://localhost:3000/api/index.php`
3. **Verify URL rewriting:** Some servers need additional configuration

### **Issue 5: File Permissions**
**Symptoms:** 403 Forbidden or file access errors

**Solution:**
```bash
chmod 755 backend-php/
chmod 644 backend-php/.htaccess
chmod 755 backend-php/api/
chmod 777 backend-php/uploads/  # if using file uploads
```

## 📋 **Development Setup Options:**

### **Option A: PHP Built-in Server (Simplest)**
```bash
cd backend-php
php -S localhost:3000 -t . api/index.php
```

### **Option B: XAMPP/WAMP (Full Apache)**
1. Install XAMPP/WAMP
2. Copy `backend-php` to `htdocs/api/`
3. Access: `http://localhost/api/health`

### **Option C: Local MySQL Setup**
1. Install MySQL locally
2. Create database and import schema
3. Update `config/database.php` with local credentials

## 🔍 **Debugging Steps:**

### **1. Check PHP Version:**
```bash
php --version
```
Should be PHP 7.4+ (preferably 8.0+)

### **2. Check Syntax:**
```bash
cd backend-php
php -l api/index.php
php -l config/database.php
php -l middleware/auth.php
```

### **3. Check Dependencies:**
```bash
cd backend-php
composer install
ls vendor/firebase/  # Should show php-jwt directory
```

### **4. Test Each Component:**
```bash
cd backend-php
php test_backend.php
```

### **5. Check Error Logs:**
- **PHP errors:** Check PHP error log
- **Server errors:** Check Apache/Nginx error log
- **Browser console:** Check for JavaScript errors

## 🚀 **Production Deployment:**

### **For cPanel:**
1. **Upload files** to `/public_html/api/`
2. **Run composer install** in cPanel Terminal/SSH
3. **Update CORS** with your domain
4. **Import database schema**
5. **Test endpoints**

### **Test Production Deployment:**
```bash
# Health check
curl https://yourdomain.com/api/health

# Registration test
curl -X POST https://yourdomain.com/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","password":"test123"}'
```

## ⚡ **Quick Fixes Applied:**

1. ✅ **Fixed PHP 8.0 compatibility** 
2. ✅ **Added test script** (`test_backend.php`)
3. ✅ **Updated routing logic**
4. ✅ **Fixed authentication middleware**

## 📞 **Still Having Issues?**

1. **Run the test script:** `php test_backend.php`
2. **Check specific error messages**
3. **Verify database connection**
4. **Test with curl commands**
5. **Check browser console for frontend errors**

The backend should now work correctly! 🎉 
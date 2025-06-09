# PHP Backend Deployment Guide for cPanel

## 🎉 **Complete PHP Backend Created!**

I've successfully converted your Node.js backend to PHP for seamless cPanel deployment. Here's everything you need to know:

## 📁 **New PHP Backend Structure**

```
backend-php/
├── config/
│   ├── database.php      # Database connection with your cPanel credentials
│   └── cors.php         # CORS handling for your domain
├── middleware/
│   └── auth.php         # JWT authentication
├── api/
│   ├── index.php        # Main API router
│   ├── auth.php         # Login/Register/Profile endpoints
│   ├── categories.php   # Category management
│   ├── transactions.php # Transaction management
│   └── reports.php      # Financial reports & analytics
├── composer.json        # PHP dependencies
├── .htaccess           # URL rewriting for clean APIs
└── uploads/            # File uploads directory
```

## 🚀 **Deployment Steps**

### 1. **Upload Files to cPanel**

Upload the entire `backend-php/` folder contents to your cPanel:

```
/public_html/api/  (recommended structure)
├── config/
├── middleware/
├── api/
├── composer.json
├── .htaccess
└── uploads/
```

### 2. **Install PHP Dependencies**

In cPanel File Manager or SSH:

```bash
cd /public_html/api
composer install
```

If composer is not available, you can manually download the JWT library:
```bash
mkdir -p vendor/firebase/php-jwt
# Download firebase/php-jwt manually or contact hosting support
```

### 3. **Set Environment Variables**

Create a `.env` file in `/public_html/api/` or set them in PHP:

```php
// In config/database.php, your credentials are already set:
DB_HOST = localhost
DB_USER = yenebind_Yeneuser  
DB_PASSWORD = FwG+,rTHj(e&
DB_NAME = yenebind_ethiopian_budget
```

### 4. **Update Domain in CORS**

Edit `config/cors.php` and replace `yourdomain.com` with your actual domain:

```php
$allowedOrigins = [
    'https://yourrealdomain.com',
    'http://yourrealdomain.com',
    // ... rest of origins
];
```

### 5. **Database Schema**

Import the database schema using phpMyAdmin or MySQL command line:

```sql
-- Use the same SQL from backend/src/config/init-db.sql
CREATE DATABASE IF NOT EXISTS yenebind_ethiopian_budget;
USE yenebind_ethiopian_budget;

-- [Copy the full SQL schema from the previous guide]
```

## 🔗 **API Endpoints**

Your PHP backend provides these endpoints:

### **Authentication**
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login  
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update user profile

### **Categories**
- `GET /api/categories` - Get all categories
- `POST /api/categories` - Create new category
- `PUT /api/categories/{id}` - Update category
- `DELETE /api/categories/{id}` - Delete category

### **Transactions**
- `GET /api/transactions` - Get transactions (with pagination)
- `POST /api/transactions` - Create new transaction
- `PUT /api/transactions/{id}` - Update transaction  
- `DELETE /api/transactions/{id}` - Delete transaction
- `GET /api/transactions/stats` - Get transaction statistics

### **Reports**
- `GET /api/reports/stats` - Financial statistics
- `GET /api/reports/categories` - Category breakdown
- `GET /api/reports/savings` - Savings trend

### **Health Check**
- `GET /api/health` - Check if API is running

## 🔧 **Frontend Integration**

Update your frontend API base URL. In your React app, change the axios base URL:

```javascript
// Update your API configuration
const API_BASE_URL = 'https://yourdomain.com/api';

// Or if using environment variables
VITE_API_URL=https://yourdomain.com/api
```

## ✅ **Testing Your Deployment**

### 1. **Test API Health**
Visit: `https://yourdomain.com/api/health`

Expected response:
```json
{
  "status": "OK",
  "message": "Ethiopian Budget App PHP API is running",
  "version": "1.0.0",
  "timestamp": "2024-01-01 12:00:00"
}
```

### 2. **Test User Registration**
```bash
curl -X POST https://yourdomain.com/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com", 
    "password": "testpassword"
  }'
```

### 3. **Test CORS**
Open browser console on your frontend and check for CORS errors.

## 🛠️ **Troubleshooting**

### **Issue 1: 500 Internal Server Error**
- Check PHP error logs in cPanel
- Verify database credentials
- Ensure PHP 8.0+ is enabled

### **Issue 2: JWT Token Errors**
- Install firebase/php-jwt via composer
- Check if `getallheaders()` function is available
- Verify JWT secret is set

### **Issue 3: Database Connection Failed**
- Verify MySQL credentials in `config/database.php`
- Check if database exists
- Ensure user has proper privileges

### **Issue 4: CORS Errors**
- Update allowed origins in `config/cors.php`
- Check if `.htaccess` is working
- Verify headers are being sent

### **Issue 5: File Permissions**
```bash
chmod 755 api/
chmod 644 api/.htaccess
chmod 777 api/uploads/
```

## 📊 **Key Features Maintained**

✅ **User Authentication** - Register, login, JWT tokens  
✅ **Category Management** - Income/expense categories with budgets  
✅ **Transaction Tracking** - Full CRUD operations  
✅ **Financial Reports** - Stats, breakdowns, savings trends  
✅ **Security** - JWT auth, input validation, SQL injection protection  
✅ **CORS Support** - Cross-origin requests handled  
✅ **Error Handling** - Proper HTTP status codes and messages  

## 🔐 **Security Recommendations**

1. **Change JWT Secret**: Use a strong random string
2. **Enable HTTPS**: Force SSL in cPanel
3. **Regular Backups**: Set up automated database backups
4. **Update PHP**: Keep PHP version updated
5. **File Permissions**: Restrict sensitive file access

## 📞 **Support**

If you encounter issues:

1. **Check cPanel Error Logs**
2. **Test endpoints individually**  
3. **Verify database schema is imported**
4. **Confirm PHP version compatibility**

---

## 🎯 **Quick Deployment Checklist**

- [ ] Upload `backend-php/` files to `/public_html/api/`
- [ ] Run `composer install`
- [ ] Update domain in `config/cors.php`
- [ ] Import database schema
- [ ] Test `/api/health` endpoint
- [ ] Update frontend API URL
- [ ] Test user registration
- [ ] Verify CORS is working
- [ ] Check file permissions
- [ ] Set strong JWT secret

**Your PHP backend is now ready for production! 🚀** 
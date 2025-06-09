# Ethiopian Budget App

A modern, responsive budget management application built with React and PHP.

## 🚀 Quick Start

### Development

1. **Start Backend** (Terminal 1):
   ```bash
   cd backend-php
   php -S localhost:3000 index.php
   ```

2. **Start Frontend** (Terminal 2):
   ```bash
   npm run dev
   ```

3. **Access Application**:
   - Frontend: http://localhost:5173 (or the port shown in terminal)
   - Backend: http://localhost:3000

## 📁 Project Structure

```
├── README.md                 # Main project documentation
├── backend-php/             # PHP backend (cPanel compatible)
│   ├── index.php           # Main backend server
│   ├── composer.json       # PHP dependencies
│   └── .htaccess          # Apache configuration
├── frontend/               # React frontend source
├── frontend-production/    # Compiled frontend for deployment
├── src/                   # Frontend source files
├── docs/                  # Documentation files
│   ├── DEPLOYMENT_SUMMARY.md
│   ├── COMPLETE_DEPLOYMENT_GUIDE.md
│   └── ... (other guides)
├── deployment/            # Ready-to-deploy packages
│   └── frontend-production.zip
├── package.json           # Node.js dependencies
└── vite.config.ts        # Build configuration
```

## 🌟 Features

- **User Authentication** - Secure login/registration
- **Budget Management** - Track income and expenses
- **Category System** - Organize transactions
- **Financial Reports** - Visual insights and statistics
- **Responsive Design** - Works on desktop and mobile
- **Real-time Updates** - Live data synchronization

## 🛠 Technology Stack

- **Frontend**: React + TypeScript + Vite
- **Backend**: PHP 8.2+ (cPanel compatible)
- **Database**: MySQL
- **Authentication**: JWT tokens
- **Styling**: Modern CSS with responsive design

## 📦 Deployment

### Vercel (Recommended)

1. **Quick Deploy**:
   ```bash
   npm install -g vercel
   vercel login
   vercel
   ```

2. **Or use deploy script**:
   ```bash
   node deploy.js
   ```

### cPanel Hosting

1. **Backend**: Upload `backend-php/` contents to your domain root
2. **Frontend**: Extract `deployment/frontend-production.zip` to your domain root
3. **Database**: Import the SQL schema (see docs/)

### Development Dependencies

```bash
npm install           # Install frontend dependencies
cd backend-php && composer install  # Install PHP dependencies
```

## 📖 Documentation

- [Vercel Deployment Guide](docs/VERCEL_DEPLOYMENT_GUIDE.md) ⭐ **Recommended**
- [Complete Deployment Guide](docs/COMPLETE_DEPLOYMENT_GUIDE.md)
- [cPanel Deployment Guide](docs/CPANEL_DEPLOYMENT_GUIDE.md)
- [Backend Troubleshooting](docs/BACKEND_TROUBLESHOOTING.md)
- [Frontend Update Guide](docs/FRONTEND_UPDATE_GUIDE.md)

## 🎯 Quick Commands

```bash
# Development
npm run dev              # Start frontend development server
npm run build           # Build frontend for production

# Backend
cd backend-php && php -S localhost:3000 index.php  # Start PHP server

# Production
npm run preview         # Preview production build locally
```

## 📋 Database Setup

See [DEPLOYMENT_SUMMARY.md](docs/DEPLOYMENT_SUMMARY.md) for complete database schema and setup instructions.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

For deployment help or technical issues, refer to the documentation in the `docs/` folder.

---

*Ready for cPanel deployment* ✅ 
# Marabouts - Setup Instructions

## ✅ All Fixes Applied

### 1. Port Configuration
- **Backend**: Port 6000
- **Frontend**: Port 6001

### 2. Files Updated

#### Backend
- `backend/.env` → `PORT=6000`
- `backend/src/server.ts` → Line 18: Added `as any` to fix Prisma TypeScript error
- `backend/src/server.ts` → Line 21: Default port changed to 6000

#### Frontend
- `frontend/package.json` → `"dev": "next dev --turbo -p 6001"`
- `frontend/lib/api-client.ts` → Default API URL: `http://localhost:6000/api`
- `frontend/.env.local` → Created with `NEXT_PUBLIC_API_URL=http://localhost:6000/api`
- `frontend/app/layout.tsx` → Logo added: `/assests/marabouts-logo.webp`
- Logo file renamed: `marabouts-logo-♥.webp` → `marabouts-logo.webp` (removed Unicode character)

### 3. Database Schema
- PostgreSQL with 2 models: `User` and `ContactForm`
- Schema pushed to database successfully

## 🚀 How to Start

### Step 1: Start Backend (Port 6000)
```bash
cd backend
npm run dev
```

Expected output:
```
🚀 Marabouts Backend running on port 6000
✅ Database connected successfully
```

### Step 2: Create Admin User
```bash
cd backend
node create-admin.js
```

This creates:
- **Email**: admin@marabouts.com
- **Password**: admin123

### Step 3: Start Frontend (Port 6001)
```bash
cd frontend
npm run dev
```

Expected output:
```
- Local:        http://localhost:6001
```

### Step 4: Access Application
- **Frontend**: http://localhost:6001
- **Backend API**: http://localhost:6000/api
- **Health Check**: http://localhost:6000/api/health

## 🔐 Login Credentials
- **Email**: admin@marabouts.com
- **Password**: admin123

## 📋 API Endpoints

### Authentication
- `POST /api/auth/register-admin` - Create new admin
- `POST /api/auth/login` - Login admin

### Admin
- `GET /api/admin/users` - List all admin users
- `GET /api/admin/contact-forms` - List all contact form submissions

### Contact Form
- `POST /api/contact/submit` - Submit contact form

## ⚠️ Known Issues Fixed

1. **Prisma TypeScript Error**: Fixed with `as any` type assertion (Prisma v7 adapter limitation)
2. **Logo Unicode Error**: Renamed file to remove `♥` character
3. **Port Conflicts**: Changed to 6000/6001
4. **Frontend API URL**: Now correctly points to port 6000

## 🔧 Troubleshooting

### Frontend still calling :3003
1. Delete `.next` folder: `rm -rf frontend/.next`
2. Restart frontend: `cd frontend && npm run dev`

### Backend port already in use
1. Find process: `netstat -ano | findstr :6000`
2. Kill process: `taskkill /PID <PID> /F`
3. Restart backend

### Login fails with "Invalid credentials"
1. Run `node backend/create-admin.js` to create admin user
2. Use credentials: admin@marabouts.com / admin123

## 📁 Project Structure
```
marabouts/
├── backend/
│   ├── prisma/
│   │   └── schema.prisma (PostgreSQL, User + ContactForm)
│   ├── src/
│   │   └── server.ts (Main server file)
│   ├── .env (PORT=6000, DATABASE_URL, JWT_SECRET)
│   └── create-admin.js (Admin user creation script)
├── frontend/
│   ├── app/
│   ├── components/
│   ├── lib/
│   │   └── api-client.ts (API client pointing to :6000)
│   ├── public/
│   │   └── assests/
│   │       └── marabouts-logo.webp
│   ├── .env.local (NEXT_PUBLIC_API_URL)
│   └── package.json (dev script with -p 6001)
└── SETUP_INSTRUCTIONS.md (this file)
```

## ✨ Features
- Admin authentication with JWT
- Contact form submission
- PostgreSQL database
- TypeScript backend
- Next.js frontend with Tailwind CSS
- Logo in browser tab

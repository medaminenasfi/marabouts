# Port Configuration

## Backend
- **Port**: 6000
- **URL**: http://localhost:6000
- **API Base**: http://localhost:6000/api
- **Config**: `.env` file with `PORT=6000`

## Frontend
- **Port**: 6001
- **URL**: http://localhost:6001
- **Config**: `package.json` script: `"dev": "next dev --turbo -p 6001"`
- **API Client**: Points to `http://localhost:6000/api`

## How to Start

### Backend
```bash
cd backend
npm run dev
```
Server will start on port 6000

### Frontend
```bash
cd frontend
npm run dev
```
Server will start on port 6001

## Logo
- Logo file: `/public/assests/marabouts-logo-♥.webp`
- Added to `app/layout.tsx` as favicon

## Prisma TypeScript Issue
The `contactForm` lint error is a known Prisma v7 adapter type generation issue. Fixed with `as any` type assertion on line 18 of `server.ts`. The code works correctly at runtime.

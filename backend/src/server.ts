import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Load environment variables
dotenv.config();

// Setup PostgreSQL adapter for Prisma v7
const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter }) as any; // Type assertion to bypass Prisma v7 adapter type issue

const app = express();
const PORT = process.env.PORT || 8000;

console.log('🔧 Starting Marabouts Backend...');
console.log(`📍 PORT: ${PORT}`);

// Middleware
app.use(cors());
app.use(express.json());

// Request logging middleware
app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.log(`${req.method} ${req.path} - ${new Date().toISOString()}`);
  next();
});

// Health check
app.get('/api/health', (_req: express.Request, res: express.Response) => {
  console.log('✅ Health check accessed');
  res.json({
    status: 'OK',
    message: 'Marabouts Backend API is running',
    timestamp: new Date().toISOString(),
    port: PORT
  });
});

// Register Admin
app.post('/api/auth/register-admin', async (req: express.Request, res: express.Response) => {
  try {
    const { email, password, firstName, lastName } = req.body;

    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      res.status(400).json({ error: 'Admin already exists' });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        firstName,
        lastName,
        role: 'ADMIN'
      }
    });

    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET || 'fallback-secret',
      { expiresIn: '7d' }
    );

    const { password: _, ...userWithoutPassword } = user;

    console.log('✅ Admin registered:', email);
    res.status(201).json({
      message: 'Admin created successfully',
      user: userWithoutPassword,
      token
    });
  } catch (error: unknown) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Failed to create admin' });
  }
});

// Login Admin
app.post('/api/auth/login', async (req: express.Request, res: express.Response) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      res.status(401).json({ error: 'Invalid credentials' });
      return;
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      res.status(401).json({ error: 'Invalid credentials' });
      return;
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET || 'fallback-secret',
      { expiresIn: '7d' }
    );

    const { password: _, ...userWithoutPassword } = user;

    console.log('✅ Admin login successful for:', email);
    res.json({
      message: 'Login successful',
      user: userWithoutPassword,
      token
    });
  } catch (error: unknown) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Failed to login' });
  }
});

// Get Admin Users
app.get('/api/admin/users', async (_req: express.Request, res: express.Response) => {
  try {
    const users = await prisma.user.findMany({
      where: { role: 'ADMIN' },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        createdAt: true
      }
    });
    res.json(users);
  } catch (error: unknown) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// Get Contact Forms (for dashboard)
app.get('/api/admin/contact-forms', async (_req: express.Request, res: express.Response) => {
  try {
    const contactForms = await prisma.contactForm.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.json(contactForms);
  } catch (error: unknown) {
    console.error('Error fetching contact forms:', error);
    res.status(500).json({ error: 'Failed to fetch contact forms' });
  }
});

// Contact Form Submit
app.post('/api/contact/submit', async (req: express.Request, res: express.Response) => {
  try {
    const { building, request, identity } = req.body;

    const contactForm = await prisma.contactForm.create({
      data: {
        building,
        request,
        identity,
        status: 'NEW'
      }
    });

    console.log('✅ Contact form saved:', contactForm.id);
    res.status(201).json({
      message: 'Form submitted successfully',
      contactForm
    });
  } catch (error: unknown) {
    console.error('❌ Error processing form:', error);
    res.status(500).json({ error: 'Failed to process form' });
  }
});

// 404 handler
app.use((_req: express.Request, res: express.Response) => {
  res.status(404).json({ error: 'Route not found' });
});

// Start server
const server = app.listen(PORT, async () => {
  console.log('🎉 =================================');
  console.log(`🚀 Marabouts Backend running on port ${PORT}`);
  console.log(`📊 Health: http://localhost:${PORT}/api/health`);
  console.log(`👑 Register: POST /api/auth/register-admin`);
  console.log(`🔐 Login: POST /api/auth/login`);
  console.log(`📝 Contact: POST /api/contact/submit`);
  console.log(`👥 Users: GET /api/admin/users`);
  console.log(`📋 Forms: GET /api/admin/contact-forms`);
  console.log('🎉 =================================');

  try {
    await prisma.$connect();
    console.log('✅ Database connected successfully');
  } catch (error) {
    console.error('❌ Database connection failed:', error);
  }
});

server.on('error', (err: NodeJS.ErrnoException) => {
  if (err.code === 'EADDRINUSE') {
    console.log(`⚠️  Port ${PORT} is already in use.`);
  } else {
    console.error('❌ Server error:', err);
  }
});

process.on('SIGINT', async () => {
  console.log('🔄 Shutting down gracefully...');
  await prisma.$disconnect();
  await pool.end();
  process.exit(0);
});

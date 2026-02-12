import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Load environment variables
dotenv.config();

// Extend PrismaClient to include custom models
class ExtendedPrismaClient extends PrismaClient {
  constructor() {
    super();
  }
}

const app = express();
const PORT = process.env.PORT || 3003;
const prisma = new ExtendedPrismaClient();

console.log('🔧 Starting Marabouts Backend...');
console.log(`📍 PORT: ${PORT}`);

// Middleware
app.use(cors());
app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - ${new Date().toISOString()}`);
  next();
});

// Routes
app.get('/api/health', (req, res) => {
  console.log('✅ Health check accessed');
  res.json({ 
    status: 'OK', 
    message: 'Marabouts Backend API is running',
    timestamp: new Date().toISOString(),
    port: PORT
  });
});

// Register Admin
app.post('/api/auth/register-admin', async (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body;

    // Check if admin already exists
    const existingUser = await (prisma as any).user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return res.status(400).json({ error: 'Admin already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create admin user
    const user = await (prisma as any).user.create({
      data: {
        email,
        password: hashedPassword,
        firstName,
        lastName,
        role: 'ADMIN'
      }
    });

    // Generate JWT
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
  } catch (error: any) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Failed to create admin' });
  }
});

// Login Admin
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await (prisma as any).user.findUnique({
      where: { email }
    });

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Check password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate JWT
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
  } catch (error: any) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Failed to login' });
  }
});

// Get Admin Users
app.get('/api/admin/users', async (req, res) => {
  try {
    const users = await (prisma as any).user.findMany({
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
  } catch (error: any) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// Get Contact Forms (for dashboard)
app.get('/api/admin/contact-forms', async (req, res) => {
  try {
    const contactForms = await (prisma as any).contactForm.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.json(contactForms);
  } catch (error: any) {
    console.error('Error fetching contact forms:', error);
    res.status(500).json({ error: 'Failed to fetch contact forms' });
  }
});

// Contact Form Submit (main functionality)
app.post('/api/contact/submit', async (req, res) => {
  try {
    const { building, request, identity } = req.body;

    // Create contact form entry
    const contactForm = await (prisma as any).contactForm.create({
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
  } catch (error: any) {
    console.error('❌ Error processing form:', error);
    res.status(500).json({ error: 'Failed to process form' });
  }
});

// Error handling
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('❌ Error:', err.message);
  res.status(500).json({ 
    error: 'Something went wrong!',
    message: err.message
  });
});

// 404 handler
app.use((req, res) => {
  console.log('❌ Route not found:', req.method, req.path);
  res.status(404).json({ error: 'Route not found' });
});

// Start server
const server = app.listen(PORT, async () => {
  console.log('🎉 =================================');
  console.log(`🚀 Marabouts Backend running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
  console.log(`👑 Admin Register: POST http://localhost:${PORT}/api/auth/register-admin`);
  console.log(`🔐 Admin Login: POST http://localhost:${PORT}/api/auth/login`);
  console.log(`📝 Contact Form: POST http://localhost:${PORT}/api/contact/submit`);
  console.log(`👥 Admin Users: GET http://localhost:${PORT}/api/admin/users`);
  console.log(`📋 Contact Forms: GET http://localhost:${PORT}/api/admin/contact-forms`);
  console.log('🎉 =================================');
  console.log('✅ Backend ready for admin + contact form!');
  
  // Test database connection
  try {
    await prisma.$connect();
    console.log('✅ Database connected successfully');
  } catch (error) {
    console.error('❌ Database connection failed:', error);
  }
});

// Handle server errors
server.on('error', (err: any) => {
  console.error('❌ Server error:', err);
  if (err.code === 'EADDRINUSE') {
    console.log(`⚠️  Port ${PORT} is already in use.`);
  }
});

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('🔄 Shutting down gracefully...');
  await prisma.$disconnect();
  process.exit(0);
});

console.log('📝 Backend setup complete');

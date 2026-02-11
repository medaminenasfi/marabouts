const express = require('express');
const cors = require('cors');

// Import auth routes
const authRoutes = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 3003;

console.log('🔧 Starting Marabouts Backend...');
console.log(`📍 PORT: ${PORT}`);

// Middleware
app.use(cors());
app.use(express.json());

// Mock storage for contact forms
let contactForms = [];

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

// Use auth routes
app.use('/api/auth', authRoutes);

// Get Admin Users (for dashboard)
app.get('/api/admin/users', (req, res) => {
  console.log('👑 Getting admin users');
  // This will be handled by the auth routes
  res.json([]);
});

// Get Contact Forms (for dashboard)
app.get('/api/admin/contact-forms', (req, res) => {
  console.log('📝 Getting contact forms for admin dashboard');
  res.json(contactForms);
});

// Contact Form Submit (main functionality)
app.post('/api/contact/submit', (req, res) => {
  console.log('📝 Contact form submission received');
  const { building, request, identity } = req.body;
  
  try {
    // Create contact form entry
    const contactForm = {
      id: String(contactForms.length + 1),
      building: {
        name: building.name,
        address: building.address,
        city: building.city || 'Paris',
        postalCode: building.postalCode || '75000',
        units: parseInt(building.units) || 1,
        description: building.description || ''
      },
      request: {
        subject: request.subject || `Demande de ${identity.name}`,
        description: request.description || '',
        priority: request.priority || 'MEDIUM'
      },
      identity: {
        name: identity.name,
        email: identity.email,
        phone: identity.phone,
        role: identity.role
      },
      status: 'NEW',
      createdAt: new Date().toISOString()
    };
    
    contactForms.push(contactForm);
    console.log('✅ Contact form saved:', contactForm.building.name);
    
    res.status(201).json({
      message: 'Form submitted successfully',
      contactForm
    });
  } catch (error) {
    console.error('❌ Error processing form:', error);
    res.status(500).json({ error: 'Failed to process form' });
  }
});

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - ${new Date().toISOString()}`);
  next();
});

// Error handling
app.use((err, req, res, next) => {
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
const server = app.listen(PORT, () => {
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
});

// Handle server errors
server.on('error', (err) => {
  console.error('❌ Server error:', err);
  if (err.code === 'EADDRINUSE') {
    console.log(`⚠️  Port ${PORT} is already in use.`);
  }
});

console.log('📝 Backend setup complete');

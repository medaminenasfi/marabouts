const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');
const pg = require('pg');
const bcrypt = require('bcryptjs');
require('dotenv').config();

async function createQuickAdmin() {
  const pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL
  });
  const adapter = new PrismaPg(pool);
  const prisma = new PrismaClient({ adapter });

  try {
    // Delete any existing admin with this email
    await prisma.user.deleteMany({
      where: { email: 'admin@marabouts.com' }
    });

    const hashedPassword = await bcrypt.hash('admin123', 10);
    const user = await prisma.user.create({
      data: {
        email: 'admin@marabouts.com',
        password: hashedPassword,
        firstName: 'Admin',
        lastName: 'Marabouts',
        role: 'ADMIN'
      }
    });

    console.log('✅ Admin created successfully!');
    console.log('📧 Email: admin@marabouts.com');
    console.log('🔑 Password: admin123');
    console.log('👤 Name:', user.firstName, user.lastName);
  } catch (e) {
    console.error('❌ Error:', e.message);
  } finally {
    await prisma.$disconnect();
    await pool.end();
  }
}

createQuickAdmin();

const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');
const pg = require('pg');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL
});
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function createAdmin() {
  try {
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
    console.log('Email:', user.email);
    console.log('Password: admin123');
  } catch (e) {
    if (e.code === 'P2002') {
      console.log('⚠️  Admin already exists');
    } else {
      console.error('❌ Error:', e.message);
    }
  } finally {
    await prisma.$disconnect();
    await pool.end();
  }
}

createAdmin();

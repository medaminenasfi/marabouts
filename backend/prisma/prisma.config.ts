import { PrismaConfig } from '@prisma/config-generator';

const config: PrismaConfig = {
  schema: './prisma/schema.prisma',
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
};

export default config;

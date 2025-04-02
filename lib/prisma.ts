// lib/prisma.ts
import { PrismaClient } from '@prisma/client';
import { withAccelerate } from '@prisma/extension-accelerate';

export const prisma = new PrismaClient({
  omit: {
    post: {
      updatedAt: true,
    },
  },
}).$extends(withAccelerate());

// const globalForPrisma = global as unknown as { prisma: PrismaClient };

// export const prisma = globalForPrisma.prisma || new PrismaClient();

// if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

// //Using this approach ensures that only one instance of Prisma Client exists, even during hot-reloading in development.

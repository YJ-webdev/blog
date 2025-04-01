// lib/prisma.ts
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';

export const prisma = new PrismaClient({
  omit: {
    post: {
      updatedAt: true,
    },
  },
}).$extends(withAccelerate());

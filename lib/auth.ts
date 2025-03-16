import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';

export const currentUser = async () => {
  const session = await auth();

  if (!session?.user) return null;

  return await prisma.user.findUnique({
    where: { id: session.user.id },
  });
};

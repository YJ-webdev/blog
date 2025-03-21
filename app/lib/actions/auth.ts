'use server';

import { auth, signIn, signOut } from '@/auth';

export async function handleSignIn(provider: 'google' | 'github') {
  await signIn(provider);
}

export async function handleSignOut() {
  await signOut();
}

export const getCurrentUser = async () => {
  const session = await auth();
  if (!session) {
    return null;
  }
  return session?.user?.id;
};

'use server';

import { signIn } from '@/auth';

export async function handleSignIn(provider: 'google' | 'github') {
  await signIn(provider);
}

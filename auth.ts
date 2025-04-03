import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import Google from 'next-auth/providers/google';
import Github from 'next-auth/providers/github';
import { prisma } from './lib/prisma';

export const { handlers, signIn, signOut, auth } = NextAuth({
  debug: process.env.NODE_ENV !== 'production',
  adapter: PrismaAdapter(prisma),
  providers: [Google, Github],
  // callbacks: {
  //   async jwt({ token, user }) {
  //     if (user) {
  //       token.id = user.id;
  //       token.name = user.name;
  //       token.image = user.image;
  //     }
  //     return token;
  //   },
  //   async session({ session, token }) {
  //     session.user.id = token.id as string;
  //     session.user.name = token.name;
  //     session.user.image = token.image as string;
  //     return session;
  //   },
  // },
});

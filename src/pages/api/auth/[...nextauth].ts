import NextAuth from 'next-auth';
import type { NextAuthOptions } from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';
import { PrismaClient } from '@prisma/client';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import prisma from '@/lib/prisma';

const prismaClient = new PrismaClient();

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prismaClient),
  pages: {
    signIn: '/login'
  },
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET
    })
  ],
  callbacks: {
    async session({ session, user: userSession }) {
      const user = await prisma.user.findFirst({
        where: {
          email: userSession.email
        }
      });
      return {
        ...session,
        user: {
          ...session.user,
          bio: user?.bio ?? ''
        }
      };
    }
  }
};

export default NextAuth(authOptions);

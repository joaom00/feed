import NextAuth, { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      bio: string | null;
    } & DefaultSession['user'];
  }
}

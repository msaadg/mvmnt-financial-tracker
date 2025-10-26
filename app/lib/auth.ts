import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaClient } from '@/app/generated/prisma/edge'
import { withAccelerate } from '@prisma/extension-accelerate'

const prisma = new PrismaClient().$extends(withAccelerate());

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET) {
  throw new Error("Google Client ID and Secret must be set in environment variables");
}

export const NEXT_AUTH: NextAuthOptions = {
    session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/", // use our root login page
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (!profile?.email) {
        throw new Error("No profile");
      }

      await prisma.powerUsers.upsert({
        where: { email: profile.email },
        create: {
            email: profile.email,
            username: user.name || user.email?.split('@')[0] || 'user',
            role: "user",
        },
        update: {
          username: user.name || user.email?.split('@')[0] || 'user',
        }
      });

      return true;
    },
  }
}
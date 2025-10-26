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
        throw new Error("No profile email available");
      }

      const email = String(profile.email).toLowerCase();

      // Only allow sign-in if the email already exists in powerUsers
      const existing = await prisma.powerUsers.findUnique({
        where: { email },
      });

      if (!existing) {
        // reject sign-in (user must be invited/created first)
        return false;
      }

      // Update username if it changed
      const newUsername = user.name || user.email?.split("@")[0] || existing.username;
      if (newUsername !== existing.username) {
        try {
          await prisma.powerUsers.update({
            where: { email },
            data: { username: newUsername },
          });
        } catch (err) {
          // ignore update errors, still allow sign in
        }
      }

      return true;
    },


    // Add role into the JWT token from DB so clients can check it
    async jwt({ token, user, profile }) {
      try {
        const email = profile?.email || user?.email || token.email;
        if (email) {
          const dbUser = await prisma.powerUsers.findUnique({
            where: { email },
            select: { role: true },
          });
          if (dbUser) {
            (token as any).role = dbUser.role;
          }
        }
      } catch (err) {
        // ignore db errors here
      }
      return token;
    },

    // Expose role on the session.user object
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).role = (token as any).role;
      }
      return session;
    },
  }
}
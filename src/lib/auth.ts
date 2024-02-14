import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import prisma from "./prisma";

export const {
  handlers,
  auth,
  signIn,
  signOut,
  unstable_update: updateSession,
} = NextAuth({
  basePath: "/api/auth",
  providers: [
    Credentials({
      async authorize(credentials) {
        if (!credentials) return null;

        // Validated and sanitized credentials will be received from authenticate function
        const { id, email } = credentials;

        return {
          id,
          email,
        } as any;
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        // Get user from the database
        const existingUser = await prisma.user.findUnique({
          where: {
            email: user.email!,
          },
        });

        // Throw an error if user not found, since user should be created in authenticate function
        if (!existingUser) {
          throw new Error("User not found");
        }

        // Add id and isProfileComplete to the token
        token.id = existingUser.id;
        token.isProfileComplete = existingUser.isProfileComplete;
      }
      return token;
    },
    session: async ({ session, token }) => {
      // Add id and isProfileComplete to the session right after the user signs in
      if (token) {
        session.user.id = token.id as string;
        session.user.isProfileComplete = token.isProfileComplete as boolean;
      }
      return session;
    },
  },
});

import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
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
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
    Credentials({
      async authorize(credentials) {
        if (!credentials) return null;

        // Validated and sanitized credentials will be received from authenticate function
        const { id, name, image, email } = credentials;

        return {
          id,
          name,
          image,
          email,
        } as any;
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user, account }) => {
      if (user) {
        if (account?.provider === "credentials") {
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

          // Update token
          token.id = existingUser.id;
          token.name = existingUser.name;
          token.image = existingUser.image;
          token.avatarKey = existingUser.avatarKey;
          token.isProfileComplete = existingUser.isProfileComplete;
          token.username = existingUser.username;
        } else if (account?.provider === "github") {
          // Get user from the database
          const existingUser = await prisma.user.findUnique({
            where: {
              email: user.email!,
            },
          });

          // If user not found, create a local session for the user with isProfileComplete and isUserCreated set to false. User creation will be handled on /auth/set-password page
          if (!existingUser) {
            token.isProfileComplete = false;
            token.isUserCreated = false;
          } else {
            // Update token
            token.id = existingUser.id;
            token.name = existingUser.name;
            token.image = existingUser.image;
            token.avatarKey = existingUser.avatarKey;
            token.isProfileComplete = existingUser.isProfileComplete;
            token.username = existingUser.username;
          }
        }
      }

      return token;
    },
    session: async ({ session, token }) => {
      // Add id and isProfileComplete to the session right after the user signs in
      if (token) {
        session.user.id = token.id as string;
        session.user.name = token.name as string;
        session.user.image = token.image as string | undefined;
        session.user.avatarKey = token.avatarKey as string | undefined;
        session.user.isProfileComplete = token.isProfileComplete as boolean;
        session.user.isUserCreated = token.isUserCreated as boolean | undefined;
        session.user.username = token.username as string | undefined;
      }
      return session;
    },
  },
});

import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: String;
      username?: String;
      isProfileComplete: Boolean;
      isUserCreated?: Boolean;
      avatarKey?: String;
    } & DefaultSession["user"];
  }
}

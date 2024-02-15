import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: String;
      isProfileComplete: Boolean;
      isUserCreated?: Boolean;
    } & DefaultSession["user"];
  }
}

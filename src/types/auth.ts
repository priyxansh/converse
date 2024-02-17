import { Session } from "next-auth";
import { NextRequest } from "next/server";

export type Credentials = {
  name?: string | null;
  image?: string | null;
  email: string;
  password: string;
};

export type Provider = "credentials" | "github";

export type AuthenticateOptions = {
  provider: Provider;
  credentials?: Credentials;
  isSignUp?: boolean;
  isOAuthSignUp?: boolean;
};

export type NextAuthRequest = NextRequest & {
  auth: Session | null;
};

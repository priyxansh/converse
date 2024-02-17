import { Session } from "next-auth";
import { NextRequest } from "next/server";

export type Credentials = {
  email: string;
  password: string;
};

export type Provider = "credentials" | "github";

export type AuthenticateOptions = {
  provider: Provider;
  credentials?: Credentials;
  isSignUp?: boolean;
};

export type NextAuthRequest = NextRequest & {
  auth: Session | null;
};

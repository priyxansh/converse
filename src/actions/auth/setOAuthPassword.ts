"use server";

import { auth } from "@/lib/auth";
import { Session } from "next-auth";
import { authenticate } from "./authenticate";

/**
 * Set the initial password for the user authenticated with OAuth
 * @param password - The password to set
 * @returns Returns success and error if any
 */
export const setOAuthPassword = async (password: string) => {
  // Get the session. Since this function is only called from /auth/set-password which handles redirects, we can safely assume that the user is authenticated
  const session = (await auth()) as Session;

  const { email } = session.user;

  // Authenticate the user with the new password with credentials provider to create a new user in the database
  const authenticateResult = await authenticate({
    isSignUp: true,
    provider: "credentials",
    credentials: {
      email: email!,
      password,
    },
  });

  return authenticateResult;
};

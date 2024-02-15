"use server";

import { signOut as NextAuthSignOut } from "@/lib/auth";

/**
 * Server wrapper for NextAuth signOut
 * @returns Returns NextAuth signOut response
 */
export const signOut = async () => {
  return NextAuthSignOut();
};

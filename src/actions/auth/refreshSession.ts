"use server";

import { auth, signIn } from "@/lib/auth";

/**
 * Refreshes the user's session by signing in the user again.
 */
export const refreshSession = async () => {
  // Get the session
  const session = await auth();

  if (!session) {
    throw new Error("User is not authenticated");
  }

  try {
    // Sign in the user again to update the session
    await signIn("credentials", {
      id: session.user.id,
      email: session.user.email,
      redirect: false,
    });

    return {
      success: true,
    };
  } catch (error: any) {
    return {
      success: false,
      error: {
        name: error.name,
        message: error.message,
      },
    };
  }
};

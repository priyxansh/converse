"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { refreshSession } from "../auth/refreshSession";
/**
 * Removes the logged in user's avatar
 * @returns {Promise<boolean>} - A promise that resolves to true if the user's avatar was removed successfully, and false otherwise
 */
export const removeAvatar = async () => {
  const session = await auth();

  if (!session) {
    throw new Error("User is not authenticated");
  }

  try {
    // Remove the user's avatar in the database
    await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        image: null,
      },
    });

    // Update session
    const refreshSessionResult = await refreshSession();

    if (!refreshSessionResult.success) {
      throw new Error(
        `Failed to update the session: ${refreshSessionResult.error?.message}`
      );
    }

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

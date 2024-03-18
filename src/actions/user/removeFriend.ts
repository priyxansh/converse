"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

/**
 * Removes a friend from the current user's friend list.
 *
 * @param username - The username of the friend to be removed.
 * @returns A promise that resolves to an object with a `success` property indicating whether the friend was successfully removed, and an optional `error` property containing the error message if the removal failed.
 */
export const removeFriend = async (username: string) => {
  // Get the current user's session
  const session = await auth();

  if (!session) {
    return redirect("/auth/signin");
  }

  try {
    // Remove the friend from the current user's friends list
    const updateCurrentUserPromise = prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        friends: {
          disconnect: {
            username: username,
          },
        },
      },
    });

    // Remove the current user from the friend's friends list
    const updateTargetUserPromise = prisma.user.update({
      where: {
        username: username,
      },
      data: {
        friends: {
          disconnect: {
            id: session.user.id,
          },
        },
      },
    });

    // Wait for both promises to resolve
    await prisma.$transaction([
      updateCurrentUserPromise,
      updateTargetUserPromise,
    ]);

    revalidatePath(`/profile/${username}`);

    return {
      success: true,
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message,
    };
  }
};

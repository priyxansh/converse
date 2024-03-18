"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

/**
 * Sends a friend request to the specified username.
 *
 * @param username - The username of the user to send the friend request to.
 * @returns A promise that resolves to an object with the success status and an optional error message.
 */
export const sendFriendRequest = async (username: string) => {
  const session = await auth();

  if (!session) {
    return redirect("/auth/signin");
  }

  try {
    // Check if the target user has already sent a friend request to current user
    const existingFriendRequest = await prisma.friendRequest.findFirst({
      where: {
        sender: {
          username: username,
        },
        receiver: {
          id: session.user.id,
        },
      },
    });

    if (existingFriendRequest) {
      const error = new Error(
        "This user has already sent you a friend request."
      );
      error.name = "FriendRequestExists";
      throw error;
    }

    // Create new friend request
    await prisma.friendRequest.create({
      data: {
        sender: {
          connect: {
            id: session.user.id,
          },
        },
        receiver: {
          connect: {
            username: username,
          },
        },
      },
    });

    revalidatePath(`/profile/${username}`);

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

"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

/**
 * Cancels a friend request for a given username.
 *
 * @param username - The username of the receiver of the friend request.
 * @returns A promise that resolves to an object with the following properties:
 *   - success: A boolean indicating whether the friend request was successfully canceled.
 *   - error: If success is false, this property contains the error message.
 */
export const cancelFriendRequest = async (username: string) => {
  const session = await auth();

  if (!session) {
    return redirect("/auth/signin");
  }

  try {
    // Delete friend request. We are using deleteMany since prisma's delete method requires the primary key(id) of the record to be deleted.
    const { count } = await prisma.friendRequest.deleteMany({
      where: {
        sender: {
          id: session.user.id,
        },
        receiver: {
          username: username,
        },
      },
    });

    // If no friend request was found, throw an error
    if (count === 0) {
      const error = new Error("No friend request found");
      error.name = "FriendRequestNotFound";
      throw error;
    }

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

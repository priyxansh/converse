"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

/**
 * Deletes a friend request.
 * @param requestId - The ID of the friend request to be deleted.
 * @returns A promise that resolves to an object with the following properties:
 *   - success: A boolean indicating whether the friend request was successfully deleted.
 *   - error (optional): An object containing the name and message of the error if the deletion failed.
 */
export const deleteFriendRequest = async (requestId: string) => {
  const session = await auth();

  if (!session) {
    return redirect("/auth/signin");
  }

  try {
    // Delete friend request
    const deletedRequest = await prisma.friendRequest.delete({
      where: {
        id: requestId,
      },
    });

    // If no friend request was found, throw an error
    if (!deletedRequest) {
      const error = new Error("No friend request found");
      error.name = "FriendRequestNotFound";
      throw error;
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

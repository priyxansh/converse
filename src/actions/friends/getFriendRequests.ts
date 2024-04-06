"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

/**
 * Retrieves friend requests for the current user.
 * @returns {Promise<Array<{sender: {id: string, username: string, name: string, image: string, bio: string}}>>} The array of friend requests, each containing the sender's information.
 */
export const getFriendRequests = async () => {
  const session = await auth();

  if (!session) {
    return redirect("/auth/signin");
  }

  // Get friend requests. Errors will be handled by the parent component.
  const friendRequests = await prisma.friendRequest.findMany({
    where: {
      receiver: {
        id: session.user.id,
      },
    },
    select: {
      id: true,
      sender: {
        select: {
          id: true,
          username: true,
          name: true,
          image: true,
          bio: true,
        },
      },
      receiver: {
        select: {
          id: true,
          username: true,
          name: true,
        },
      },
    },
  });

  return friendRequests;
};

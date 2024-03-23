"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

/**
 * Retrieves the friends of the current user.
 *
 * @returns {Promise<Array<Friend>>} A promise that resolves to an array of friends.
 * @throws {Error} If the user is not found.
 */
export const getFriends = async () => {
  const session = await auth();

  if (!session) {
    return redirect("/auth/signin");
  }

  // Fetch the user's friends
  const user = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
    select: {
      friends: {
        select: {
          id: true,
          name: true,
          username: true,
          image: true,
          bio: true,
        },
      },
    },
  });

  // Error handling will be done by the parent component
  if (!user) {
    const error = new Error("User not found.");
    error.name = "UserNotFoundError";
    throw error;
  }

  return user.friends;
};

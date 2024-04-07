"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

/**
 * Accepts a friend request from a user.
 *
 * @param requestId - The ID of the friend request.
 * @param username - The username of the target user.
 * @returns An object indicating the success of the operation and an optional error object.
 */
export const acceptFriendRequest = async (
  requestId: string,
  username: string
) => {
  const session = await auth();

  if (!session) {
    return redirect("/auth/signin");
  }

  try {
    // Get the IDs of the current user and the target user
    const currentUser = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { id: true, friends: true },
    });
    const targetUser = await prisma.user.findUnique({
      where: { username },
      select: { id: true },
    });

    // Handle case where either the current user or the target user doesn't exist
    if (!currentUser || !targetUser) {
      const error = new Error("Invalid user or target user not found");
      error.name = "UserNotFoundError";
      throw error;
    }

    // Delete the friend request from the database
    const deleteRequestPromise = prisma.friendRequest.delete({
      where: {
        id: requestId,
      },
    });

    // Add the current user to the target user's friends list
    const connectCurrentUserPromise = prisma.user.update({
      where: { id: targetUser.id },
      data: {
        friends: { connect: { id: currentUser.id } },
      },
    });

    // Add the target user to the current user's friends list
    const connectTargetUserPromise = prisma.user.update({
      where: { id: currentUser.id },
      data: {
        friends: { connect: { id: targetUser.id } },
      },
    });

    // Check if the users already have a chat
    const existingChat = await prisma.chat.findFirst({
      where: {
        AND: [
          {
            isGroup: false,
          },
          { members: { some: { id: currentUser.id } } },
          { members: { some: { id: targetUser.id } } },
        ],
      },
    });

    // If a chat already exists, return early
    if (existingChat) {
      await prisma.$transaction([
        deleteRequestPromise,
        connectCurrentUserPromise,
        connectTargetUserPromise,
      ]);

      return { success: true };
    }

    // Create a new chat between the current user and the target user
    const createChatPromise = prisma.chat.create({
      data: {
        members: {
          connect: [{ id: currentUser.id }, { id: targetUser.id }],
        },
        messages: {
          create: {
            type: "ALERT",
            content: "You are now friends. Say hi!",
            sender: {
              connect: {
                id: currentUser.id,
              },
            },
            recipient: {
              connect: {
                id: targetUser.id,
              },
            },
          },
        },
      },
    });

    // Wait for all promises to resolve
    await prisma.$transaction([
      deleteRequestPromise,
      connectCurrentUserPromise,
      connectTargetUserPromise,
      createChatPromise,
    ]);

    return { success: true };
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

"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { formatChats } from "./formatChats";

/**
 * Retrieves all chats with their latest message for the current user.
 * @returns {Promise<{ success: boolean, data: Chat[] } | { success: boolean, error: string }>} The result of the operation.
 */
export const getUserChats = async () => {
  const session = await auth();

  if (!session) {
    return redirect("/auth/signin");
  }

  try {
    // Fetch all chats for the current user. TODO: Implement infinite scrolling.
    const chats = await prisma.chat.findMany({
      where: {
        members: {
          some: {
            id: session.user.id,
          },
        },
      },
      include: {
        messages: {
          orderBy: {
            createdAt: "desc",
          },
          select: {
            id: true,
            content: true,
            status: true,
            type: true,
            readBy: {
              select: {
                id: true,
                username: true,
              },
            },
            createdAt: true,
            sender: {
              select: {
                id: true,
                name: true,
                username: true,
              },
            },
          },
          take: 10,
        },
        members: {
          where: {
            id: {
              not: session.user.id,
            },
          },
          select: {
            id: true,
            name: true,
            username: true,
            image: true,
          },
        },
        group: {
          select: {
            avatar: true,
          },
        },
      },
    });

    // Format the chats
    const formattedChats = await formatChats(chats);

    return {
      success: true,
      data: formattedChats,
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message,
    };
  }
};

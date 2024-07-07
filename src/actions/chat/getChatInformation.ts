"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

/**
 * Retrieves the information of a chat.
 * @param id - The ID of the chat.
 * @returns An object containing the chat information or an error message.
 */
export const getChatInformation = async (id: string) => {
  const session = await auth();

  if (!session) {
    return redirect("/auth/signin");
  }

  // Fetch the chat's information
  try {
    const chat = await prisma.chat.findUnique({
      where: {
        id,
      },
      select: {
        name: true,
        isGroup: true,
        group: true,
        members: {
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

    return {
      success: true,
      data: {
        ...chat,
        userId: session.user.id,
      },
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message,
    };
  }
};

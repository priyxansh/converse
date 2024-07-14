"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { getChatInformation } from "./getChatInformation";
import { formatMessage } from "./formatMessage";

/**
 * Retrieves chat messages for a given chat ID.
 *
 * @param chatId - The ID of the chat.
 * @returns A promise that resolves to an object containing the success status and the retrieved chat messages.
 */
export const getChatMessages = async (chatId: string) => {
  const session = await auth();

  if (!session) {
    return redirect("/auth/signin");
  }

  try {
    // Fetch chat information
    const chatInformation = await getChatInformation(chatId);

    if (!chatInformation.success || !chatInformation.data) {
      throw new Error(chatInformation.error || "Chat not found.");
    }

    // Fetch the chat's messages
    const messages = await prisma.message.findMany({
      where: {
        chatId,
      },
      select: {
        id: true,
        content: true,
        createdAt: true,
        status: true,
        type: true,
        readBy: {
          select: {
            id: true,
            name: true,
            username: true,
            image: true,
          },
        },
        sender: {
          select: {
            id: true,
            name: true,
            username: true,
            image: true,
          },
        },
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    // Format messages to hide read receipts and status for messages sent by other users and append isSentByUser property
    const formattedMessages = messages.map((message) => {
      return formatMessage({ message, userId: session.user.id });
    });

    return {
      success: true,
      data: formattedMessages,
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message,
    };
  }
};

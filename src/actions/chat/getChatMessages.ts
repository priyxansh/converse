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

    const chat = chatInformation.data;

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

    // If it is a one-to-one chat, return the messages as they are
    if (!chat.isGroup) {
      return {
        success: true,
        data: messages,
      };
    }

    // If it is a group chat, format the messages to hide read receipts and status for messages sent by other users
    const formattedMessages = messages.map((message) =>
      formatMessage({ message, userId: session.user.id })
    );

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

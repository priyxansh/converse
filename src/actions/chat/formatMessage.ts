"use server";

import { FormattedMessage } from "@/types/chat";
import { Message } from "@/types/prisma";

type FormatMessagesOptions = {
  userId: string;
  message: Message<{
    select: {
      id: true;
      content: true;
      createdAt: true;
      status: true;
      readBy: {
        select: {
          id: true;
          name: true;
          username: true;
          image: true;
        };
      };
      sender: {
        select: {
          id: true;
          name: true;
          username: true;
          image: true;
        };
      };
    };
  }>;
};

/**
 * Formats a message to hide read receipts and status for messages sent by other users.
 *
 * @param userId - The ID of the current user.
 * @param message - The message to format.
 */
export const formatMessage = ({
  message,
  userId,
}: FormatMessagesOptions): FormattedMessage => {
  const isSentByUser = message.sender.id === userId;

  if (isSentByUser) {
    return message;
  }

  const { status, readBy, ...formattedMessage } = message;

  return formattedMessage;
};

"use server";

import { auth } from "@/lib/auth";
import { ClientChat, FormattedChat } from "@/types/chat";
import { redirect } from "next/navigation";

/**
 * Formats an array of client chats into a standardized format.
 *
 * @param chats - The array of client chats to be formatted.
 * @returns The formatted chats.
 */
export const formatChats = async (
  chats: ClientChat[]
): Promise<FormattedChat[]> => {
  const session = await auth();

  if (!session) {
    return redirect("/auth/signin");
  }

  const formattedChats = chats.map(
    ({ id, name, isGroup, messages, members, group }) => {
      // Get the last message and its status, and remove the readBy field
      const { readBy: _, status, ...lastMessage } = messages[0];

      // Check if the last message was sent by the current user
      const isLastMessageSentByUser =
        lastMessage.type === "ALERT"
          ? false
          : lastMessage.sender.id === session.user.id;

      const lastMessageStatus = isLastMessageSentByUser ? "SENT" : status;

      // Since groups must have a name, the conversation name is the group name if it exists, otherwise the other member's name since members array only contains the members except the current user, i.e. the other member. Also, it is asserted as a string since we can safely assume at this point that the other member's name is a string.
      const conversationName = name || (members[0].name as string);

      const conversationAvatar = isGroup ? group?.avatar : members[0].image;

      return {
        id: id,
        name: conversationName,
        avatar: conversationAvatar,
        isGroup: isGroup,
        lastMessage,
        lastMessageStatus,
        isLastMessageSentByUser,
        unreadCount: isLastMessageSentByUser
          ? -1 // If the last message was sent by the current user, the unread count is set to -1.
          : messages.filter((message) => {
              // Return messages that are not alerts, not sent by the current user, and not read by the current user.
              return (
                message.type !== "ALERT" &&
                message.sender.id !== session.user.id &&
                !message.readBy.some((user) => user.id === session.user.id)
              );
            }).length,
      };
    }
  );

  return formattedChats;
};

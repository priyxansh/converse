"use server";

import { ClientChat, FormattedChat } from "@/types/chat";
import { parseChatName } from "@/utils/parseChatName";

type FormatChatsOptions = {
  chats: ClientChat[];
  userId: string;
};

/**
 * Formats the chats data into a client safe and a more structured format.
 *
 * @param options - The options for formatting the chats.
 * @returns An array of formatted chat objects.
 */
export const formatChats = ({
  chats,
  userId,
}: FormatChatsOptions): FormattedChat[] => {
  const formattedChats = chats.map(
    ({ id, name, isGroup, messages, members, group }) => {
      // Get the last message and its status, and remove the readBy field
      const { readBy: _, status, ...lastMessage } = messages[0];

      // Check if the last message was sent by the current user
      const isLastMessageSentByUser =
        lastMessage.type === "ALERT" ? false : lastMessage.sender.id === userId;

      const lastMessageStatus = isLastMessageSentByUser ? "SENT" : status;

      // Get the conversation name
      const conversationName = parseChatName({
        name: name,
        isGroup: isGroup,
        members: members,
        userId: userId,
      });

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
                message.sender.id !== userId &&
                !message.readBy.some((user) => user.id === userId)
              );
            }).length,
      };
    }
  );

  return formattedChats;
};

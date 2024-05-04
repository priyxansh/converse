import { $Enums, PrismaClient } from "@prisma/client";
import { Chat, Message } from "./prisma";

export type ClientChat = Chat<{
  include: {
    messages: {
      select: {
        id: true;
        content: true;
        status: true;
        type: true;
        readBy: {
          select: {
            id: true;
            username: true;
          };
        };
        createdAt: true;
        sender: {
          select: {
            id: true;
            name: true;
            username: true;
          };
        };
      };
    };
    members: {
      select: {
        id: true;
        name: true;
        username: true;
      };
    };
  };
}>;

export type FormattedChat = {
  id: string;
  name: string;
  isGroup: boolean;
  lastMessage: Message<{
    select: {
      id: true;
      content: true;
      type: true;
      createdAt: true;
      sender: {
        select: {
          id: true;
          name: true;
          username: true;
        };
      };
    };
  }>;
  lastMessageStatus: $Enums.MessageStatus;
  unreadCount: number;
};

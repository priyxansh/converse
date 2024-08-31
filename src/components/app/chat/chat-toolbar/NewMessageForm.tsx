"use client";

import { Input } from "@/components/ui/input";
import SendButton from "./SendButton";
import { sendMessage } from "@/actions/chat/sendMessage";
import { useRef } from "react";
import { useSession } from "next-auth/react";
import { useSocket } from "@/providers/SocketProvider";
import { FormattedChat, FormattedMessage } from "@/types/chat";
import { useCurrentChat } from "@/stores/currentChatStore";
import { getChatInformation } from "@/actions/chat/getChatInformation";
import { useQuery, useQueryClient } from "@tanstack/react-query";

type NewMessageFormProps = {
  chatId: string;
};

const NewMessageForm = ({ chatId }: NewMessageFormProps) => {
  const formRef = useRef<HTMLFormElement>(null);

  const { data: session } = useSession();
  const { appendNewMessage, setMessageStatus } = useCurrentChat();
  const { socket } = useSocket();
  const queryClient = useQueryClient();

  // Get the current chat's information using react-query
  const { data: chat } = useQuery({
    queryKey: ["chat", chatId],
    queryFn: async () => {
      const chat = await getChatInformation(chatId);

      if (chat.success) {
        return chat.data;
      } else {
        throw new Error(chat.error);
      }
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const messageContent = formData.get("message") as string | undefined | null;

    const recipients =
      chat?.members
        ?.filter((member) => member.id !== session?.user.id)
        .map((member) => member.username) || [];

    if (!messageContent || !session) return;

    // Generate a random message ID
    const messageId = crypto.randomUUID();

    const message: Omit<FormattedMessage, "isSentByUser"> = {
      id: messageId,
      content: messageContent,
      type: "TEXT",
      sender: {
        id: session.user.id,
        username: session.user.username as string,
        name: session.user.name!,
        image: session.user.image!,
      },
      createdAt: new Date(),
      status: "PENDING",
    };

    // Add the message to the local new messages store
    appendNewMessage({ ...message, isSentByUser: true });

    // Send message to the server
    sendMessage({ chatId, message: messageContent, messageId }).then(
      (response) => {
        if (response.success) {
          setMessageStatus(messageId, "SENT");

          // Emit socket event to send message to other users in the chat room
          socket?.emit("message:send", {
            chatId,
            message,
            recipients,
          });

          // Update the last message in the chats list
          queryClient.setQueryData<FormattedChat[] | undefined>(
            ["chats"],
            (chats: FormattedChat[] | undefined) => {
              return chats?.map((chat) => {
                if (chat.id === chatId) {
                  return {
                    ...chat,
                    lastMessage: message,
                    unreadCount: 0,
                    isLastMessageSentByUser: true,
                  };
                }

                return chat;
              });
            }
          );
        }
      }
    );

    // Clear the form
    formRef.current?.reset();
  };

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="flex gap-1 sm:gap-2 w-full"
    >
      <Input placeholder="Type a message" className="bg-muted" name="message" />
      <SendButton />
    </form>
  );
};

export default NewMessageForm;

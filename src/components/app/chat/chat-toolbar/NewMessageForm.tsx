"use client";

import { Input } from "@/components/ui/input";
import SendButton from "./SendButton";
import { sendMessage } from "@/actions/chat/sendMessage";
import { useRef } from "react";
import { useNewMessages } from "@/stores/newMessagesStore";
import { useSession } from "next-auth/react";
import { useSocket } from "@/providers/SocketProvider";
import { FormattedMessage } from "@/types/chat";

type NewMessageFormProps = {
  chatId: string;
};

const NewMessageForm = ({ chatId }: NewMessageFormProps) => {
  const formRef = useRef<HTMLFormElement>(null);

  const { data: session } = useSession();
  const { appendNewMessage, setMessageStatus } = useNewMessages();
  const { socket } = useSocket();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const messageContent = formData.get("message") as string | undefined | null;

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
          });
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

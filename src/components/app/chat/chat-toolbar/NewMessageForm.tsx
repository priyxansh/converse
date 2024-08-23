"use client";

import { Input } from "@/components/ui/input";
import SendButton from "./SendButton";
import { sendMessage } from "@/actions/chat/sendMessage";
import { useRef } from "react";
import { useNewMessages } from "@/stores/newMessagesStore";
import { useSession } from "next-auth/react";

type NewMessageFormProps = {
  chatId: string;
};

const NewMessageForm = ({ chatId }: NewMessageFormProps) => {
  const formRef = useRef<HTMLFormElement>(null);

  const { data: session } = useSession();
  const { appendNewMessage, setMessageStatus } = useNewMessages();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const message = formData.get("message") as string | undefined | null;

    if (!message || !session) return;

    const messageId = crypto.randomUUID();

    appendNewMessage({
      id: messageId,
      content: message,
      type: "TEXT",
      sender: {
        id: session.user.id,
        username: session.user.username as string,
        name: session.user.name!,
        image: session.user.image!,
      },
      isSentByUser: true,
      createdAt: new Date(),
      status: "PENDING",
    });

    // Send message to the server
    sendMessage({ chatId, message, messageId }).then((response) => {
      if (response.success) {
        setMessageStatus(messageId, "SENT");

        // Todo: Add socket event to send message to other users
      }
    });

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

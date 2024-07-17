"use client";

import { Input } from "@/components/ui/input";
import SendButton from "./SendButton";
import { sendMessage } from "@/actions/chat/sendMessage";
import { useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";

type NewMessageFormProps = {
  chatId: string;
};

const NewMessageForm = ({ chatId }: NewMessageFormProps) => {
  const queryClient = useQueryClient();
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const message = formData.get("message") as string | undefined | null;

    if (!message) return;

    // Send message to the server
    const sendMessageResponse = await sendMessage({ chatId, message });

    // Clear the form
    formRef.current?.reset();

    // Refetch messages for now, later it'll be done via setQueryData
    await queryClient.invalidateQueries({
      queryKey: ["chatMessages", chatId],
      refetchType: "all",
    });

    console.log(sendMessageResponse);
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

"use client";

import { getChatMessages } from "@/actions/chat/getChatMessages";
import Spinner from "@/components/global/Spinner";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useQuery } from "@tanstack/react-query";
import MessageWrapper from "./MessageWrapper";
import { useNewMessages } from "@/stores/newMessagesStore";
import { useEffect, useRef } from "react";
import { getScrollPercentage } from "@/utils/getScrollPercentage";
import { useTheme } from "next-themes";
import Image from "next/image";

type ChatMessagesProps = {
  chatId: string;
};

const ChatMessages = ({ chatId }: ChatMessagesProps) => {
  const { newMessages } = useNewMessages();
  const scrollAreaRef = useRef<HTMLDivElement | null>(null);
  const { theme } = useTheme();

  const {
    data: messages,
    isLoading,
    isRefetching,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["chatMessages", chatId],
    queryFn: async () => {
      const messages = await getChatMessages(chatId);

      if (messages.success) {
        return messages.data;
      } else {
        throw new Error(messages.error);
      }
    },
    refetchOnMount: "always",
    refetchOnWindowFocus: false,
    refetchInterval: false,
  });

  // Scroll to the bottom of the chat messages when new messages are added
  useEffect(() => {
    if (
      scrollAreaRef.current &&
      getScrollPercentage(scrollAreaRef.current) > 90
    ) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [newMessages, messages]);

  // Show a loading spinner while fetching the chat messages initially, or while refetching in case of an error. If the chat messages are being refetched without an error, we'll show the previous messages while the new messages are being fetched.
  if (isLoading || (isRefetching && isError)) {
    return (
      <section className="w-full h-full flex items-center justify-center">
        <Spinner />
      </section>
    );
  }

  // Show an error message if there was an error fetching chat messages
  if (isError || !messages) {
    return (
      <section className="w-full h-full flex items-center justify-center">
        <div className="flex flex-col gap-2 items-center justify-center">
          <p className="text-center text-gray-600 dark:text-gray-400 text-sm sm:text-base">
            There was an error fetching Chat messages.
          </p>
          <Button
            onClick={() => {
              refetch();
            }}
            size={"sm"}
          >
            Try again
          </Button>
        </div>
      </section>
    );
  }

  // If there are no messages, show a message indicating that there are no messages
  if (messages.length === 0) {
    return (
      <section className="w-full h-full flex items-center justify-center">
        <p className="text-center text-gray-600 dark:text-gray-400 text-sm sm:text-base">
          No messages to show. Start the conversation!
        </p>
      </section>
    );
  }

  return (
    <ScrollArea className="h-full relative" viewportRef={scrollAreaRef}>
      {theme === "dark" ? (
        <Image
          className="absolute inset-0 object-cover"
          fill
          src={
            "https://utfs.io/f/90dd7d99-0899-4f75-a05f-635b511f603a-ef9ija.png"
          }
          alt="Chat background dark"
        />
      ) : (
        <Image
          className="absolute inset-0 object-cover"
          fill
          src={
            "https://utfs.io/f/c5c0a910-299b-49e9-851d-977669e05808-j8mxkm.png"
          }
          alt="Chat background light"
        />
      )}
      <section className="flex flex-col space-y-4 px-2 md:px-4">
        {messages.map((message) => {
          return (
            <MessageWrapper
              key={message.id}
              message={message}
              className="first:mt-4"
            />
          );
        })}
        {newMessages.map((message) => {
          return <MessageWrapper key={message.id} message={message} />;
        })}
      </section>
    </ScrollArea>
  );
};

export default ChatMessages;

"use client";

import { useQuery } from "@tanstack/react-query";
import ChatHeader from "./ChatHeader";
import { getChatInformation } from "@/actions/chat/getChatInformation";
import { parseChatName } from "@/utils/parseChatName";
import Spinner from "@/components/global/Spinner";
import { Button } from "@/components/ui/button";
import ChatMessages from "./messages/ChatMessages";
import ChatToolbar from "./chat-toolbar/ChatToolbar";

type ChatProps = {
  id: string;
};

const Chat = ({ id }: ChatProps) => {
  const {
    data: chat,
    isLoading,
    isRefetching,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["chat", id],
    queryFn: async () => {
      const chat = await getChatInformation(id);

      if (chat.success) {
        return chat.data;
      } else {
        throw new Error(chat.error);
      }
    },
  });

  // Show a loading spinner while fetching the chat initially, or while refetching in case of an error. If the chat is being refetched without an error, we'll show the previous chat while the new chat is being fetched.
  if (isLoading || (isRefetching && isError)) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  // Show an error message if there was an error fetching chat information
  if (isError || !chat) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="flex flex-col gap-2 items-center justify-center">
          <p className="text-center text-gray-600 dark:text-gray-400 text-sm sm:text-base">
            There was an error fetching Chat information.
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
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <ChatHeader
        conversationName={parseChatName({
          name: chat.name,
          isGroup: chat.isGroup,
          members: chat.members!,
          userId: chat.userId,
        })}
      />
      <ChatMessages chatId={id} />
      <ChatToolbar chatId={id} />
    </div>
  );
};

export default Chat;

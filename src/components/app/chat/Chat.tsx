"use client";

import { useQuery } from "@tanstack/react-query";
import ChatHeader from "./ChatHeader";
import { getChatInformation } from "@/actions/chat/getChatInformation";
import { parseChatName } from "@/utils/parseChatName";
import Spinner from "@/components/global/Spinner";
import { Button } from "@/components/ui/button";
import ChatMessages from "./messages/ChatMessages";
import ChatToolbar from "./chat-toolbar/ChatToolbar";
import { useEffect } from "react";
import { useSocket } from "@/providers/SocketProvider";
import { FormattedMessage } from "@/types/chat";
import ChatWallpaper from "./ChatWallpaper";
import { useCurrentChat } from "@/stores/currentChatStore";

type ChatProps = {
  id: string;
};

const Chat = ({ id }: ChatProps) => {
  const { socket } = useSocket();
  const { appendNewMessage, clearNewMessages, setChatId } = useCurrentChat();

  // Join the chat room when the chat component is mounted and leave when it's unmounted
  useEffect(() => {
    if (socket) {
      socket.emit("join", id);
    }

    return () => {
      if (socket) {
        socket.emit("leave", id);
      }
    };
  }, [socket, id]);

  // Listen for new messages and append them to the newMessages store
  const handleNewMessage = ({
    chatId,
    message,
  }: {
    chatId: string;
    message: Omit<FormattedMessage, "isSentByUser">;
  }) => {
    if (chatId === id) {
      appendNewMessage({ ...message, isSentByUser: false });
    }
  };

  // Join the chat room on connect to resume listening for new messages after a reconnection
  const handleConnect = () => {
    socket?.emit("join", id);
  };

  useEffect(() => {
    if (socket) {
      socket.on("message:receive", handleNewMessage);
      socket.on("connect", handleConnect);
    }

    return () => {
      if (socket) {
        socket.off("message:receive", handleNewMessage);
        socket.off("connect", handleConnect);
      }
    };
  }, [socket, appendNewMessage, handleConnect, handleNewMessage, id]);

  // Store chatId and clear new messages on mount and unmount
  useEffect(() => {
    setChatId(id);
    clearNewMessages();

    return () => {
      clearNewMessages();
      setChatId("");
    };
  }, [setChatId, clearNewMessages, id]);

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
    <div className="flex flex-col h-full relative">
      <ChatHeader
        conversationName={parseChatName({
          name: chat.name,
          isGroup: chat.isGroup,
          members: chat.members!,
          userId: chat.userId,
        })}
      />
      <ChatWallpaper />
      <ChatMessages chatId={id} />
      <ChatToolbar chatId={id} />
    </div>
  );
};

export default Chat;

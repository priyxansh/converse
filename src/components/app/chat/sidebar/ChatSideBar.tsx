"use client";

import Spinner from "@/components/global/Spinner";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ChatItem from "./ChatItem";
import { getUserChats } from "@/actions/chat/getUserChats";

type ChatSideBarProps = {};

const ChatSideBar = ({}: ChatSideBarProps) => {
  // Check if a particular chat is open, since the component is only mounted on /chat and /chat/:id routes. In short, this will be true if the pathname is /chat/:id
  const pathname = usePathname();
  const isChatOpen = !pathname.endsWith("/chat");

  // Fetch all chats using tanstack/react-query
  const {
    data: chats,
    isLoading,
    isRefetching,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["chat"],
    queryFn: async () => {
      const response = await getUserChats();

      if (!response.success) {
        throw new Error(response.error);
      }

      return response.data;
    },
  });

  // Show a loading spinner while fetching chats initially, or while refetching in case of an error. If the chats are being refetched without an error, we'll show the previous chats while the new chats are being fetched.
  if (isLoading || (isRefetching && isError)) {
    // Todo: Add skeleton list that fills the height of the sidebar
    return (
      <aside
        className={`px-4 h-full border-r md:max-w-[350px] flex-grow place-items-center ${
          isChatOpen ? "hidden md:grid" : ""
        }`}
      >
        <Spinner />
      </aside>
    );
  }

  // Show an error message if there was an error fetching chats
  if (isError) {
    return (
      <aside
        className={`px-4 h-full border-r md:max-w-[350px] flex-grow grid place-items-center ${
          isChatOpen ? "hidden md:block" : ""
        }`}
      >
        <div className="flex flex-col gap-2 items-center justify-center">
          <p className="text-center text-gray-600 dark:text-gray-400 text-sm">
            There was an error fetching your chats.
          </p>
          <Button
            onClick={() => {
              refetch();
            }}
            size={"sm"}
            className="text-sm"
          >
            Try again
          </Button>
        </div>
      </aside>
    );
  }

  // Show a message if no chats were found
  if (chats?.length === 0) {
    return (
      <aside
        className={`px-4 h-full border-r md:max-w-[350px] flex-grow grid place-items-center ${
          isChatOpen ? "hidden md:block" : ""
        }`}
      >
        <p className="text-gray-600 dark:text-gray-400 text-center text-sm flex flex-wrap gap-1 items-center justify-center">
          <span>No friends or groups to show.</span>
          <Link href="/search" className="font-semibold underline">
            Find some people to chat with.
          </Link>
        </p>
      </aside>
    );
  }

  return (
    <aside
      className={`h-full border-r md:max-w-[350px] flex-grow ${
        isChatOpen ? "hidden md:block" : ""
      }`}
    >
      {chats?.map((chat) => (
        <ChatItem key={chat.id} chat={chat} />
      ))}
    </aside>
  );
};

export default ChatSideBar;

"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FormattedChat } from "@/types/chat";
import { getSenderName } from "@/utils/getSenderName";
import { getFormattedDate } from "@/utils/getFormattedDate";
import { getReadReceiptIcon } from "@/utils/getReadReceiptIcon";
import { usePathname } from "next/navigation";
import Link from "next/link";

type ChatItemProps = {
  chat: FormattedChat;
};

const ChatItem = ({
  chat: {
    id,
    name,
    lastMessage,
    lastMessageStatus,
    isLastMessageSentByUser,
    unreadCount,
    avatar,
  },
}: ChatItemProps) => {
  const pathname = usePathname();
  const isActive = pathname.split("/")[2] === id;

  return (
    <Link
      href={`/chat/${id}`}
      className={`flex items-center px-2 py-4 gap-4 border-b hover:bg-accent ${
        isActive ? "bg-accent/80" : ""
      }`}
    >
      <Avatar className="w-11 h-11">
        <AvatarImage src={avatar || ""} alt={name} sizes="50px" />
        <AvatarFallback>{name.slice(0, 1).toUpperCase()}</AvatarFallback>
      </Avatar>
      <div className="flex flex-col flex-grow">
        <span className="text-base font-semibold">{name}</span>
        <p className="flex items-center gap-1">
          <span
            className={`text-sm line-clamp-1 w-full ${
              unreadCount > 0 ? "font-bold" : ""
            }`}
          >
            {lastMessage.content}
          </span>
          <span className="text-xs text-gray-500">
            {lastMessage.type !== "ALERT" ? (
              <span className="ml-auto w-max flex gap-2">
                <span>
                  {getSenderName(
                    isLastMessageSentByUser,
                    lastMessage.sender.name as string,
                  )}{" "}
                  · {getFormattedDate(lastMessage.createdAt)}
                </span>
                <span>
                  {getReadReceiptIcon(
                    isLastMessageSentByUser,
                    lastMessageStatus,
                  )}
                </span>
              </span>
            ) : (
              <span className="ml-auto block w-max">
                {getFormattedDate(lastMessage.createdAt)}
              </span>
            )}
          </span>
        </p>
      </div>
    </Link>
  );
};

export default ChatItem;

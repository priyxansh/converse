import { FormattedChat } from "@/types/chat";
import { formatDistanceToNow } from "date-fns";

type ChatItemProps = {
  chat: FormattedChat;
};

const ChatItem = ({
  chat: { name, lastMessage, lastMessageStatus, unreadCount },
}: ChatItemProps) => {
  return (
    <div className="border py-4 px-2 flex flex-col">
      <span className="text-base font-semibold">{name}</span>
      <p className="flex items-center gap-1">
        <span className="text-sm line-clamp-1 w-full font-medium">
          {lastMessage.content}
        </span>
        <span className="text-xs text-gray-500">
          <span className="ml-auto block w-max">
            {lastMessage.sender.name} ·{" "}
            {formatDistanceToNow(lastMessage.createdAt, {})}
          </span>
        </span>
      </p>
    </div>
  );
};

export default ChatItem;

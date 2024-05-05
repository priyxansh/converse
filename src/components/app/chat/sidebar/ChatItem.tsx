import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FormattedChat } from "@/types/chat";
import {
  formatDate,
  differenceInHours,
  formatDistanceToNowStrict,
} from "date-fns";

type ChatItemProps = {
  chat: FormattedChat;
};

const ChatItem = ({
  chat: { name, lastMessage, lastMessageStatus, unreadCount, avatar },
}: ChatItemProps) => {
  return (
    <div className="flex items-center px-2 py-4 gap-4 border-b">
      <Avatar className="w-11 h-11">
        <AvatarImage src={avatar || ""} alt={name} sizes="50px" />
        <AvatarFallback>{name.slice(0, 1).toUpperCase()}</AvatarFallback>
      </Avatar>
      <div className="flex flex-col flex-grow">
        <span className="text-base font-semibold">{name}</span>
        <p className="flex items-center gap-1">
          <span className="text-sm line-clamp-1 w-full font-medium">
            {lastMessage.content}
          </span>
          <span className="text-xs text-gray-500">
            <span className="ml-auto block w-max">
              {lastMessage.sender.name} ·{" "}
              {differenceInHours(new Date(), new Date(lastMessage.createdAt)) <
              24
                ? formatDistanceToNowStrict(new Date(lastMessage.createdAt), {
                    addSuffix: true,
                  })
                : formatDate(new Date(lastMessage.createdAt), "dd/MM/yyyy")}
            </span>
          </span>
        </p>
      </div>
    </div>
  );
};

export default ChatItem;

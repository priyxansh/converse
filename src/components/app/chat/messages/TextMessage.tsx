import { FormattedMessage } from "@/types/chat";
import MessageArrow from "./MessageArrow";
import TextMessageTimestamp from "./TextMessageTimestamp";
import { getReadReceiptIcon } from "@/utils/getReadReceiptIcon";

type TextMessageProps = {
  message: FormattedMessage;
  className?: string;
};

const TextMessage = ({ message, className }: TextMessageProps) => {
  const { isSentByUser } = message;

  return (
    <div
      data-messageId={message.id}
      className={`relative text-sm sm:text-sm px-3 py-1.5 rounded-lg max-w-10/12 sm:max-w-3/4 flex flex-col ${
        isSentByUser ? "self-end" : "self-start"
      } ${
        isSentByUser
          ? "bg-primary text-primary-foreground"
          : "bg-accent text-accent-foreground"
      } ${className}`}
    >
      <span>{message.content}</span>
      <div className="flex gap-2 items-center">
        <TextMessageTimestamp
          createdAt={message.createdAt}
          isSentByUser={isSentByUser}
        />
        {getReadReceiptIcon(isSentByUser, message.status!, 12)}
      </div>
      <MessageArrow isSentByUser={isSentByUser} />
    </div>
  );
};

export default TextMessage;

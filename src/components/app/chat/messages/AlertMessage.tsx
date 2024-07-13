import { FormattedMessage } from "@/types/chat";
import { getFormattedDate } from "@/utils/getFormattedDate";

type AlertMessageProps = {
  message: FormattedMessage;
  className?: string;
};

const AlertMessage = ({ message, className }: AlertMessageProps) => {
  return (
    <div className={`flex items-center justify-center relative ${className}`}>
      <p className="text-gray-600 dark:text-gray-400 text-sm">
        {message.content}
      </p>
      <span className="absolute right-0 top-1/2 -translate-y-1/2 text-[10px] text-muted-foreground">
        {getFormattedDate(message.createdAt, {
          type: "absolute",
        })}
      </span>
    </div>
  );
};

export default AlertMessage;

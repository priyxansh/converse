import { formatDate } from "date-fns";

type TextMessageTimestampProps = {
  createdAt: Date;
  isSentByUser: boolean;
};

const TextMessageTimestamp = ({
  createdAt,
  isSentByUser,
}: TextMessageTimestampProps) => {
  return (
    <div
      className={`ml-auto w-fit text-[10px] relative ${
        isSentByUser ? "text-muted/70" : "text-muted-foreground/70"
      }`}
    >
      {formatDate(createdAt, "h:mm a")}
    </div>
  );
};

export default TextMessageTimestamp;

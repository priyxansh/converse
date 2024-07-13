import { FormattedMessage } from "@/types/chat";

type TextMessageProps = {
  message: FormattedMessage;
  className?: string;
};

const TextMessage = ({ message, className }: TextMessageProps) => {
  return <div></div>;
};

export default TextMessage;

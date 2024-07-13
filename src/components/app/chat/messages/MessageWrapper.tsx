"use client";

import { FormattedMessage } from "@/types/chat";
import TextMessage from "./TextMessage";
import AlertMessage from "./AlertMessage";

type MessageWrapperProps = {
  message: FormattedMessage;
  className?: string;
};

const MessageWrapper = ({ message, className }: MessageWrapperProps) => {
  switch (message.type) {
    case "TEXT":
      return <TextMessage message={message} className={className} />;

    case "ALERT":
      return <AlertMessage message={message} className={className} />;

    default:
      return null;
  }
};

export default MessageWrapper;

import { MessageStatus } from "@/types/chat";
import { CheckCheckIcon, CheckIcon, ClockIcon } from "lucide-react";

/**
 * Returns the appropriate read receipt icon based on the message status.
 * @param isSentByUser - Indicates whether the message was sent by the user.
 * @param lastMessageStatus - The status of the last message.
 * @param size - The size of the icon (default: 16).
 * @returns The read receipt icon component.
 */
export const getReadReceiptIcon = (
  isSentByUser: boolean,
  lastMessageStatus: MessageStatus,
  size = 16
) => {
  if (!isSentByUser) {
    return null;
  }

  if (lastMessageStatus === "PENDING") {
    return <ClockIcon size={size} />;
  }

  if (lastMessageStatus === "SENT") {
    return <CheckIcon size={size} />;
  }

  if (lastMessageStatus === "READ") {
    return (
      <>
        <CheckCheckIcon size={size} />
      </>
    );
  }
};

import { $Enums } from "@prisma/client";
import { CheckCheckIcon, CheckIcon } from "lucide-react";

/**
 * Returns the appropriate read receipt icon based on the message status.
 * @param isSentByUser - Indicates whether the message was sent by the user.
 * @param lastMessageStatus - The status of the last message.
 * @param size - The size of the icon (default: 16).
 * @returns The read receipt icon component.
 */
export const getReadReceiptIcon = (
  isSentByUser: boolean,
  lastMessageStatus: $Enums.MessageStatus,
  size = 16
) => {
  if (!isSentByUser) {
    return null;
  }

  if (lastMessageStatus === "SENT") {
    return <CheckIcon size={size} />;
  }

  if (lastMessageStatus === "DELIVERED") {
    return (
      <>
        <CheckCheckIcon size={size} />
      </>
    );
  }

  if (lastMessageStatus === "READ") {
    return (
      <>
        <CheckCheckIcon size={size} className="text-primary" />
      </>
    );
  }
};

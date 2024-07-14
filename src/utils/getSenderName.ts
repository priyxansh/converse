/**
 * Returns the sender name based on whether the message is sent by the user or not.
 * If the message is sent by the user, it returns "You".
 * Otherwise, it returns the provided sender name.
 *
 * @param isSentByUser - A boolean indicating whether the message is sent by the user.
 * @param senderName - The name of the sender.
 * @returns The sender name.
 */
export const getSenderName = (isSentByUser: boolean, senderName: string) => {
  if (isSentByUser) {
    return "You";
  } else {
    return senderName;
  }
};

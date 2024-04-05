"use client";

import { sendFriendRequest } from "@/actions/user/sendFriendRequest";
import { Button } from "@/components/ui/button";
import { useSocket } from "@/providers/SocketProvider";
import { useState } from "react";
import { toast } from "sonner";

type AddFriendButtonProps = {
  senderUsername: string;
  senderName: string;
  receiverUsername: string;
  receiverName: string;
};

const AddFriendButton = ({
  senderUsername,
  senderName,
  receiverUsername,
  receiverName,
}: AddFriendButtonProps) => {
  const { socket } = useSocket();

  const [loading, setLoading] = useState(false);

  const sendRequestHandler = async () => {
    const sendFriendRequestResult = await sendFriendRequest(receiverUsername);

    // Show toast if the target user has already sent a friend request to the current user
    if (sendFriendRequestResult.error?.name === "FriendRequestExists") {
      toast.error(
        "This user has already sent you a friend request. Either accept the request or reject it."
      );
      return;
    }

    // Show toast for other errors
    if (!sendFriendRequestResult.success) {
      toast.error("Failed to send friend request. Please try again.");
      return;
    }

    // Emit a friend request event to the server
    socket.emit("friend_request", {
      senderUsername: senderUsername,
      senderName: senderName,
      receiverUsername: receiverUsername,
      receiverName: receiverName,
    });

    // Show toast message if the friend request was sent successfully
    toast.success("Friend request sent!");
  };

  const onClick = async () => {
    setLoading(true);
    await sendRequestHandler();
    setLoading(false);
  };

  return (
    <Button
      variant="default"
      size={"sm"}
      className="flex-grow"
      onClick={onClick}
      disabled={loading}
    >
      Add Friend
    </Button>
  );
};

export default AddFriendButton;

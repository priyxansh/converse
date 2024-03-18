"use client";

import { sendFriendRequest } from "@/actions/user/sendFriendRequest";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";

type AddFriendButtonProps = {
  username: string;
};

const AddFriendButton = ({ username }: AddFriendButtonProps) => {
  const [loading, setLoading] = useState(false);

  const sendRequestHandler = async () => {
    const sendFriendRequestResult = await sendFriendRequest(username);

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

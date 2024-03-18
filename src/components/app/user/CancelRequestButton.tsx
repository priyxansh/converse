"use client";

import { cancelFriendRequest } from "@/actions/user/cancelFriendRequest";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";

type CancelRequestButtonProps = {
  username: string;
};

const CancelRequestButton = ({ username }: CancelRequestButtonProps) => {
  const [loading, setLoading] = useState(false);

  const cancelRequestHandler = async () => {
    const cancelRequestResult = await cancelFriendRequest(username);

    // Show toast when no friend request was found
    if (cancelRequestResult.error?.name === "FriendRequestNotFound") {
      toast.error("No friend request was found.");
      return;
    }

    // Show toast on other errors
    if (!cancelRequestResult.success) {
      toast.error("Failed to cancel friend request. Please try again.");
      return;
    }

    // Show toast on success
    toast.success("Friend request cancelled.");
  };

  const onClick = async () => {
    setLoading(true);
    await cancelRequestHandler();
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
      Cancel Request
    </Button>
  );
};

export default CancelRequestButton;

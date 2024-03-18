"use client";

import { cancelFriendRequest } from "@/actions/user/cancelFriendRequest";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

type CancelRequestButtonProps = {
  username: string;
};

const CancelRequestButton = ({ username }: CancelRequestButtonProps) => {
  const onClick = async () => {
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

  return (
    <Button
      variant="default"
      size={"sm"}
      className="flex-grow"
      onClick={onClick}
    >
      Cancel Request
    </Button>
  );
};

export default CancelRequestButton;

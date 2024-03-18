"use client";

import { sendFriendRequest } from "@/actions/user/sendFriendRequest";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

type AddFriendButtonProps = {
  username: string;
};

const AddFriendButton = ({ username }: AddFriendButtonProps) => {
  const onClick = async () => {
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

  return (
    <Button
      variant="default"
      size={"sm"}
      className="flex-grow"
      onClick={onClick}
    >
      Add Friend
    </Button>
  );
};

export default AddFriendButton;

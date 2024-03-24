"use client";

import { deleteFriendRequest } from "@/actions/user/deleteFriendRequest";
import { Button } from "@/components/ui/button";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";

type RejectRequestButtonProps = {
  requestId: string;
};

const RejectRequestButton = ({ requestId }: RejectRequestButtonProps) => {
  const [loading, setLoading] = useState(false);

  const queryClient = useQueryClient();

  const rejectRequestHandler = async () => {
    // Delete friend request from the database
    const deleteRequestResult = await deleteFriendRequest(requestId);

    // Show toast if the friend request was not found
    if (deleteRequestResult.error?.name === "FriendRequestNotFound") {
      toast.error("This friend request does not exist.");
      return;
    }

    // Show toast for other errors
    if (!deleteRequestResult.success) {
      toast.error("Failed to reject friend request. Please try again.");
      return;
    }

    // Refetch query
    queryClient.refetchQueries({
      queryKey: ["friendRequests"],
    });

    // Show a success toast
    toast.success("Friend request rejected.");
  };

  const onClick = async () => {
    setLoading(true);
    await rejectRequestHandler();
    setLoading(false);
  };

  return (
    <Button
      size="sm"
      variant={"secondary"}
      disabled={loading}
      className="flex-grow"
      onClick={onClick}
    >
      Reject
    </Button>
  );
};

export default RejectRequestButton;

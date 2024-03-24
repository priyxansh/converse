"use client";

import { acceptFriendRequest } from "@/actions/user/acceptFriendRequest";
import { Button } from "@/components/ui/button";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

type AcceptRequestButtonProps = {
  requestId: string;
  username: string;
};

const AcceptRequestButton = ({
  requestId,
  username,
}: AcceptRequestButtonProps) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Get the query client for invalidating the query cache
  const queryClient = useQueryClient();

  const acceptRequestHandler = async () => {
    const acceptFriendRequestResult = await acceptFriendRequest(
      requestId,
      username
    );

    // Show toast on errors
    if (!acceptFriendRequestResult.success) {
      toast.error("Failed to accept friend request. Please try again.");
      return;
    }

    // Refetch the queries
    await queryClient.refetchQueries({
      queryKey: ["friendRequests"],
    });

    await queryClient.refetchQueries({
      queryKey: ["friends"],
    });

    // Refresh the page
    // router.refresh();

    // Show success toast
    toast.success("Friend request accepted!");
  };

  const onClick = async () => {
    setLoading(true);
    await acceptRequestHandler();
    setLoading(false);
  };

  return (
    <Button
      size="sm"
      variant={"default"}
      disabled={loading}
      className="flex-grow"
      onClick={onClick}
    >
      Accept
    </Button>
  );
};

export default AcceptRequestButton;

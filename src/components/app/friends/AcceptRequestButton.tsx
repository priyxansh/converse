"use client";

import { acceptFriendRequest } from "@/actions/user/acceptFriendRequest";
import { Button } from "@/components/ui/button";
import { useSocket } from "@/providers/SocketProvider";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";

type AcceptRequestButtonProps = {
  requestId: string;
  username: string;
  receiverUsername: string;
  receiverName: string;
};

const AcceptRequestButton = ({
  requestId,
  username,
  receiverUsername,
  receiverName,
}: AcceptRequestButtonProps) => {
  const { socket } = useSocket();

  const [loading, setLoading] = useState(false);

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

    // Emit a friend request accepted event to the server
    socket.emit("accept_friend_request", {
      senderUsername: username,
      receiverUsername: receiverUsername,
      receiverName: receiverName,
    });

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

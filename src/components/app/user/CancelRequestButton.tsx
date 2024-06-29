"use client";

import { deleteFriendRequest } from "@/actions/user/deleteFriendRequest";
import { Button } from "@/components/ui/button";
import { useSocket } from "@/providers/SocketProvider";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type CancelRequestButtonProps = {
  requestId: string;
};

const CancelRequestButton = ({ requestId }: CancelRequestButtonProps) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const { socket } = useSocket();

  const refreshPage = () => {
    router.refresh();
  };

  // Listen for relevant socket events
  const handleRejectFriendRequest = (data: { requestId: string }) => {
    if (data.requestId === requestId) {
      refreshPage();
    }
  };

  useEffect(() => {
    if (socket) {
      socket.on("accept_friend_request", refreshPage);
      socket.on("reject_friend_request", handleRejectFriendRequest);
    }

    return () => {
      if (socket) {
        socket.off("accept_friend_request", refreshPage);
        socket.off("reject_friend_request", handleRejectFriendRequest);
      }
    };
  }, [socket, refreshPage, handleRejectFriendRequest]);

  const cancelRequestHandler = async () => {
    const deleteRequestResult = await deleteFriendRequest(requestId);

    // Show toast when no friend request was found
    if (deleteRequestResult.error?.name === "FriendRequestNotFound") {
      toast.error("No friend request was found.");
      return;
    }

    // Show toast on other errors
    if (!deleteRequestResult.success) {
      toast.error("Failed to cancel friend request. Please try again.");
      return;
    }

    // Refresh the page
    refreshPage();

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

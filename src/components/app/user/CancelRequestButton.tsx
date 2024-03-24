"use client";

import { deleteFriendRequest } from "@/actions/user/deleteFriendRequest";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

type CancelRequestButtonProps = {
  requestId: string;
};

const CancelRequestButton = ({ requestId }: CancelRequestButtonProps) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

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
    router.refresh();

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

"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { removeFriend } from "@/actions/user/removeFriend";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useSocket } from "@/providers/SocketProvider";

type RemoveFriendDialogProps = {
  username: string;
};

const RemoveFriendDialog = ({ username }: RemoveFriendDialogProps) => {
  const { socket } = useSocket();

  const removeFriendHandler = async () => {
    const removeFriendResult = await removeFriend(username);

    // If an error occurs, show an error toast
    if (!removeFriendResult.success) {
      toast.error(
        "Something went wrong while removing friend. Please try again."
      );
      return;
    }

    // Emit a friend removed event to the server
    socket?.emit("remove_friend", {
      username: username,
    });

    // Show success toast
    toast.success("Friend removed.");
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="default" size={"sm"} className="flex-grow">
          Remove Friend
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This will remove <span className="font-bold">@{username}</span> from
            your friends list.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={removeFriendHandler}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default RemoveFriendDialog;

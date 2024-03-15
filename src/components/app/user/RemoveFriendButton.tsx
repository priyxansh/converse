"use client";

import { removeFriend } from "@/actions/user/removeFriend";
import { Button } from "@/components/ui/button";
import { Nunito_Sans } from "next/font/google";
import { toast } from "sonner";

const nunitoSans = Nunito_Sans({ subsets: ["latin"] });

type RemoveFriendButtonProps = {
  username: string;
};

const RemoveFriendButton = ({ username }: RemoveFriendButtonProps) => {
  const removeFriendHandler = async () => {
    // Show success toast
    const toastId = toast.success(
      <div
        className={`flex gap-3 items-center justify-between w-full ${nunitoSans.className}`}
      >
        <p className="text-sm font-semibold">Friend removed.</p>
        <Button
          size={"sm"}
          onClick={() => {
            toast.dismiss(toastId);
          }}
        >
          Undo
        </Button>
      </div>,
      {
        onAutoClose: async () => {
          const removeFriendResult = await removeFriend(username);

          // If an error occurs, dismiss this toast and show an error toast
          if (!removeFriendResult.success) {
            toast.dismiss(toastId);
            return toast.error(
              "Something went wrong while removing friend. Please try again."
            );
          }
        },
      }
    );
  };

  return (
    <Button
      variant="secondary"
      size={"sm"}
      className="flex-grow bg-secondary/50"
      onClick={removeFriendHandler}
    >
      Remove Friend
    </Button>
  );
};

export default RemoveFriendButton;

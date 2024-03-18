"use client";

import { removeFriend } from "@/actions/user/removeFriend";
import { Button } from "@/components/ui/button";
import { Nunito_Sans } from "next/font/google";
import { useState } from "react";
import { toast } from "sonner";

const nunitoSans = Nunito_Sans({ subsets: ["latin"] });

type RemoveFriendButtonProps = {
  username: string;
};

const RemoveFriendButton = ({ username }: RemoveFriendButtonProps) => {
  const [loading, setLoading] = useState(false);

  const removeFriendHandler = async () => {
    setLoading(true);

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
            setLoading(false);
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

            toast.error(
              "Something went wrong while removing friend. Please try again."
            );
          }

          setLoading(false);
        },
        onDismiss: () => {
          setLoading(false);
        },
      }
    );
  };

  return (
    <Button
      variant="default"
      size={"sm"}
      className="flex-grow"
      onClick={removeFriendHandler}
      disabled={loading}
    >
      Remove Friend
    </Button>
  );
};

export default RemoveFriendButton;

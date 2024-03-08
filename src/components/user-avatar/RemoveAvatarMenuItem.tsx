"use client";

import { removeAvatar } from "@/actions/user-avatar/removeAvatar";
import { DropdownMenuItem } from "../ui/dropdown-menu";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type RemoveAvatarMenuItemProps = {};

const RemoveAvatarMenuItem = ({}: RemoveAvatarMenuItemProps) => {
  const router = useRouter();
  const onClick = async () => {
    const removeResult = await removeAvatar();

    // Show a toast message if the avatar was not removed
    if (!removeResult.success) {
      toast.error("Failed to remove avatar");
      return;
    }

    // Show a toast message if the avatar was removed successfully
    toast.success("Avatar removed successfully");

    // Refresh the page
    router.refresh();
  };

  return <DropdownMenuItem onClick={onClick}>Remove Avatar</DropdownMenuItem>;
};

export default RemoveAvatarMenuItem;

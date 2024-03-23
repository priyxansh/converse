"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ViewAvatarDialog from "@/components/user-avatar/ViewAvatarDialog";
import { useState } from "react";

type UserProfileAvatarProps = {
  imageUrl?: string;
  fallbackName: string;
  className?: string;
};

const UserProfileAvatar = ({
  imageUrl,
  fallbackName,
  className,
}: UserProfileAvatarProps) => {
  // Control state for the dialog
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
      <Avatar
        className={`${className}`}
        onClick={() => setIsDialogOpen((prev) => !prev)}
      >
        <AvatarImage
          src={imageUrl}
          sizes={"(min-width: 768px) 144px, (min-width: 640px) 96px, 80px"}
        />
        <AvatarFallback className="text-2xl">
          {fallbackName?.split("")[0]}
        </AvatarFallback>
      </Avatar>
      <ViewAvatarDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
    </>
  );
};

export default UserProfileAvatar;

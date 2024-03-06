"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useState } from "react";
import ViewAvatarDialog from "./ViewAvatarDialog";
import EditAvatarDialog from "./EditAvatarDialog";
import { useSession } from "next-auth/react";
import RemoveAvatarMenuItem from "./RemoveAvatarMenuItem";

type UserAvatarEditableContextMenuProps = {
  className?: string;
  userAvatarComponent: JSX.Element | null;
};

const UserAvatarEditableContextMenu = ({
  className,
  userAvatarComponent,
}: UserAvatarEditableContextMenuProps) => {
  // Get the session
  const session = useSession();

  // Check if user has an avatar
  const hasAvatar = !!session.data?.user.image;

  // Control states for view avatar and edit avatar modals
  const [isViewAvatarModalOpen, setIsViewAvatarModalOpen] = useState(false);
  const [isEditAvatarModalOpen, setIsEditAvatarModalOpen] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className={`${className}`}>
          {userAvatarComponent}
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {hasAvatar ? (
            <>
              <DropdownMenuItem
                onClick={() => setIsViewAvatarModalOpen((prev) => !prev)}
              >
                View Avatar
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setIsEditAvatarModalOpen((prev) => !prev)}
              >
                Edit Avatar
              </DropdownMenuItem>
              <RemoveAvatarMenuItem />
            </>
          ) : (
            <DropdownMenuItem
              onClick={() => setIsEditAvatarModalOpen((prev) => !prev)}
            >
              Upload Avatar
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
      {hasAvatar ? (
        <ViewAvatarDialog
          open={isViewAvatarModalOpen}
          onOpenChange={setIsViewAvatarModalOpen}
        />
      ) : null}
      <EditAvatarDialog
        open={isEditAvatarModalOpen}
        onOpenChange={setIsEditAvatarModalOpen}
        title={hasAvatar ? "Edit Your Avatar" : "Upload Your Avatar"}
      />
    </>
  );
};

export default UserAvatarEditableContextMenu;

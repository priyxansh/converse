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

type UserAvatarEditableContextMenuProps = {
  className?: string;
  userAvatarComponent: JSX.Element | null;
};

const UserAvatarEditableContextMenu = ({
  className,
  userAvatarComponent,
}: UserAvatarEditableContextMenuProps) => {
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
          <DropdownMenuItem>Remove Avatar</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <ViewAvatarDialog
        open={isViewAvatarModalOpen}
        onOpenChange={setIsViewAvatarModalOpen}
      />
      <EditAvatarDialog
        open={isEditAvatarModalOpen}
        onOpenChange={setIsEditAvatarModalOpen}
      />
    </>
  );
};

export default UserAvatarEditableContextMenu;

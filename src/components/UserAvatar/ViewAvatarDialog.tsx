"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { Skeleton } from "../ui/skeleton";

type ViewAvatarDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const ViewAvatarDialog = ({ open, onOpenChange }: ViewAvatarDialogProps) => {
  const session = useSession();

  return (
    <Dialog open={open} onOpenChange={onOpenChange} modal>
      <DialogContent className="max-h-screen aspect-square border-none p-0 overflow-hidden">
        {session.data?.user.image ? (
          <Image
            src={session.data.user.image as string}
            fill
            sizes="100vw"
            alt="Your avatar"
          />
        ) : (
          <Skeleton className="h-full w-full dark:bg-gray-500/20 bg-gray-500/70" />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ViewAvatarDialog;

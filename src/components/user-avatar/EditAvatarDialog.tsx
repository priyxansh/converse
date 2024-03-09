"use client";

import { refreshSession } from "@/actions/auth/refreshSession";
import { signOut } from "@/actions/auth/signOut";
import { removeAvatar } from "@/actions/user-avatar/removeAvatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { UploadDropzone } from "@/utils/uploadthing";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type EditAvatarDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
};

const EditAvatarDialog = ({
  open,
  onOpenChange,
  title = "Edit Your Avatar",
}: EditAvatarDialogProps) => {
  const router = useRouter();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <UploadDropzone
          onBeforeUploadBegin={async (files) => {
            // Remove old avatar
            await removeAvatar();

            return files;
          }}
          endpoint="avatarUploader"
          onClientUploadComplete={async (_) => {
            // Refresh session
            const refreshSessionResult = await refreshSession();

            // If the session refresh fails, log the user out
            if (!refreshSessionResult.success) {
              toast.error("Failed to refresh the session. Logging out...");
              await signOut({ redirect: false });
              return;
            }

            // Show a success toast
            toast.success("Avatar updated successfully.");

            // Close the dialog
            onOpenChange(false);

            // Refresh the page
            router.refresh();
          }}
          onUploadError={(error: Error) => {
            toast.error(error.message);
          }}
          appearance={{
            container: {
              width: "100%",
              minWidth: "200px",
            },
            button: {
              backgroundColor: "hsla(var(--primary))",
              width: "100%",
            },
            label: {
              color: "hsla(var(--primary))",
            },
          }}
        />
      </DialogContent>
    </Dialog>
  );
};

export default EditAvatarDialog;

"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { UploadButton } from "@/utils/uploadthing";

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
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <UploadButton
          endpoint="imageUploader"
          onClientUploadComplete={(res) => {
            // Do something with the response
            console.log("Files: ", res);
          }}
          onUploadError={(error: Error) => {
            // Do something with the error.
            alert(`ERROR! ${error.message}`);
          }}
          appearance={{
            button: {
              backgroundColor: "hsla(var(--primary))",
              width: "100%",
            }
          }}
        />
      </DialogContent>
    </Dialog>
  );
};

export default EditAvatarDialog;

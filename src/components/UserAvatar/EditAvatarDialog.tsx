import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

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
      </DialogContent>
    </Dialog>
  );
};

export default EditAvatarDialog;

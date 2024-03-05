import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type EditAvatarDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const EditAvatarDialog = ({ open, onOpenChange }: EditAvatarDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Your Avatar</DialogTitle>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default EditAvatarDialog;

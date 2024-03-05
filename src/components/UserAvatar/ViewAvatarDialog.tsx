import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type ViewAvatarDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const ViewAvatarDialog = ({ open, onOpenChange }: ViewAvatarDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Your Avatar</DialogTitle>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default ViewAvatarDialog;

import { Button } from "@/components/ui/button";

type AddFriendButtonProps = {};

const AddFriendButton = ({}: AddFriendButtonProps) => {
  return (
    <Button variant="default" size={"sm"} className="flex-grow">
      Add Friend
    </Button>
  );
};

export default AddFriendButton;

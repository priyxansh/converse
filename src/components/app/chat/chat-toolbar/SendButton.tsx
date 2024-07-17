import { Button } from "@/components/ui/button";
import { SendHorizontalIcon } from "lucide-react";

type SendButtonProps = {};

const SendButton = ({}: SendButtonProps) => {
  return (
    <Button
      variant={"default"}
      size={"icon"}
      type="submit"
      className="rounded-full aspect-square flex items-center justify-center"
    >
      <SendHorizontalIcon size={18} />
    </Button>
  );
};

export default SendButton;

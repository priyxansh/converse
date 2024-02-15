import { Button } from "../ui/button";

type SubmitButtonProps = {
  text?: string;
  submittingText?: string;
  isSubmitting?: boolean;
  isDirty?: boolean;
};

const SubmitButton = ({
  text = "Submit",
  submittingText = "Submitting...",
  isSubmitting,
  isDirty,
}: SubmitButtonProps) => {
  return (
    <Button
      disabled={isSubmitting || !isDirty}
      type="submit"
      className="w-full mt-2"
    >
      {isSubmitting ? submittingText : text}
    </Button>
  );
};

export default SubmitButton;

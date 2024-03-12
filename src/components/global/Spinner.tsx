import { Loader2Icon } from "lucide-react";

type SpinnerProps = {
  className?: string;
  size?: number;
};

const Spinner = ({ className, size = 32 }: SpinnerProps) => {
  return (
    <Loader2Icon
      className={`animate-spin text-primary ${className}`}
      size={size}
    />
  );
};

export default Spinner;

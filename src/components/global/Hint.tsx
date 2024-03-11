import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type HintProps = {
  trigger: React.ReactNode;
  content: React.ReactNode;
  delayDuration?: number;
  side?: "top" | "bottom" | "left" | "right";
  align?: "start" | "center" | "end";
  asChild?: boolean;
};

const Hint = ({
  trigger,
  content,
  delayDuration,
  side,
  align,
  asChild = false,
}: HintProps) => {
  return (
    <TooltipProvider delayDuration={delayDuration}>
      <Tooltip>
        <TooltipTrigger asChild={asChild}>{trigger}</TooltipTrigger>
        <TooltipContent side={side} align={align}>
          {content}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default Hint;

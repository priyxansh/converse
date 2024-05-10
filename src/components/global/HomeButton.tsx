import { Button } from "@/components/ui/button";
import { ChevronLeftIcon } from "@radix-ui/react-icons";
import Link from "next/link";

type HomeButtonProps = {
    className?: string;
};

const HomeButton = ({
    className
}: HomeButtonProps) => {
  return (
    <Button asChild variant={"ghost"} className={className}>
      <Link href="/" className="flex items-center justify-center">
        <ChevronLeftIcon className="w-5 h-5" />
        <span>Home</span>
      </Link>
    </Button>
  );
};

export default HomeButton;

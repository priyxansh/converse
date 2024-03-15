"use client";

import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { ChevronLeft } from "lucide-react";

type BackButtonProps = {
  variant?: "default" | "secondary" | "ghost" | "outline";
  className?: string;
  size?: number;
  url?: string;
};

const BackButton = ({
  variant = "outline",
  size = 20,
  className,
  url,
}: BackButtonProps) => {
  const router = useRouter();

  return (
    <Button
      size={"icon"}
      variant={variant}
      className={`${className}`}
      onClick={() => {
        if (url) {
          router.push(url);
        } else {
          router.back();
        }
      }}
    >
      <ChevronLeft size={size} />
    </Button>
  );
};

export default BackButton;

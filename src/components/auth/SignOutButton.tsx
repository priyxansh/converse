"use client";

import { signOut } from "@/actions/auth/signOut";
import { Button } from "../ui/button";

type SignOutButtonProps = {
  variant?:
    | "default"
    | "secondary"
    | "destructive"
    | "link"
    | "ghost"
    | "outline";
  className?: string;
  text?: string;
};

const SignOutButton = ({
  className,
  variant = "link",
  text = "Sign out",
}: SignOutButtonProps) => {
  const onClick = async () => {
    await signOut({
      redirect: true,
      redirectTo: "/auth/signin",
    });
  };

  return (
    <Button
      variant={variant}
      className={`p-0 ${className}`}
      aria-label="Sign out"
      onClick={onClick}
    >
      {text}
    </Button>
  );
};

export default SignOutButton;

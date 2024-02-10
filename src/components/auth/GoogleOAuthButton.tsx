"use client";

import { Button } from "../ui/button";
import { FcGoogle } from "react-icons/fc";

type GoogleOAuthButtonProps = {};

const GoogleOAuthButton = ({}: GoogleOAuthButtonProps) => {
  return (
    <Button
      variant={"outline"}
      className="border-2 flex items-center justify-center gap-2 flex-grow"
    >
      <FcGoogle size={18} />
      <span>Continue with Google</span>
    </Button>
  );
};

export default GoogleOAuthButton;

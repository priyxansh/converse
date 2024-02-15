"use client";

import { authenticate } from "@/actions/auth/authenticate";
import { Button } from "../ui/button";
import { FaGithub } from "react-icons/fa";
import { toast } from "sonner";

type GitHubOAuthButtonProps = {};

const GitHubOAuthButton = ({}: GitHubOAuthButtonProps) => {
  const onClick = async () => {
    // Authenticate the user
    const authenticateResult = await authenticate({
      provider: "github",
    });

    // Show toast if there is an error
    if (authenticateResult?.error) {
      toast.error("Failed to authenticate with GitHub. Please try again.");
      return;
    }
  };

  return (
    <Button
      variant={"outline"}
      className="border-2 flex items-center justify-center gap-2 flex-grow"
      onClick={onClick}
    >
      <FaGithub size={18} />
      <span>Continue with GitHub</span>
    </Button>
  );
};

export default GitHubOAuthButton;

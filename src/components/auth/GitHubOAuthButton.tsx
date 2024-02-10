"use client";

import { Button } from "../ui/button";
import { FaGithub } from "react-icons/fa";

type GitHubOAuthButtonProps = {};

const GitHubOAuthButton = ({}: GitHubOAuthButtonProps) => {
  return (
    <Button
      variant={"outline"}
      className="border-2 flex items-center justify-center gap-2 flex-grow"
    >
      <FaGithub size={18} />
      <span>Continue with GitHub</span>
    </Button>
  );
};

export default GitHubOAuthButton;

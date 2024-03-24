"use client";

import { Button } from "@/components/ui/button";

type RejectRequestButtonProps = {
  id: string;
};

const RejectRequestButton = ({}: RejectRequestButtonProps) => {
  return (
    <Button size="sm" variant={"secondary"} className="flex-grow">
      Reject
    </Button>
  );
};

export default RejectRequestButton;

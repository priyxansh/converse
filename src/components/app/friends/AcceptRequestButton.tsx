"use client";

import { Button } from "@/components/ui/button";

type AcceptRequestButtonProps = {
    id: string;
};

const AcceptRequestButton = ({}: AcceptRequestButtonProps) => {
  return (
    <Button size="sm" variant={"default"} className="flex-grow">
      Accept
    </Button>
  );
};

export default AcceptRequestButton;

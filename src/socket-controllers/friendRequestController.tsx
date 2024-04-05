"use client";

import { toast } from "sonner";

export const friendRequestController = (data: {
  senderUsername: string;
  senderName: string;
}) => {
  toast.info(
    <span>
      <span className="font-bold">{data.senderName}</span>{" "}
      <span className="font-semibold">
        (@
        {data.senderUsername})
      </span>{" "}
      has sent you a friend request.
    </span>
  );
};

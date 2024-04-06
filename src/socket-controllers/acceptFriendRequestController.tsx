"use client";

import { toast } from "sonner";

export const acceptFriendRequestController = (data: {
  receiverUsername: string;
  receiverName: string;
}) => {
  toast.info(
    <span>
      You are now friends with{" "}
      <span className="font-bold">{data.receiverName}</span>{" "}
      <span className="font-semibold">
        (@
        {data.receiverUsername})
      </span>
    </span>
  );
};

import { Skeleton } from "@/components/ui/skeleton";
import UserAvatar from "@/components/user-avatar/UserAvatar";
import { auth } from "@/lib/auth";
import { Suspense } from "react";

type BottomBarUserProfileProps = {};

const BottomBarUserProfile = async ({}: BottomBarUserProfileProps) => {
  const session = await auth();

  if (!session) return null;

  return (
    <div className="flex items-center justify-between gap-2 flex-wrap">
      <Suspense fallback={<Skeleton className="h-8 w-8 rounded-full" />}>
        <UserAvatar className="h-8 w-8" />
      </Suspense>
      <div className="flex flex-col">
        <span className="font-medium">{session.user.name}</span>
        <span className="text-gray-500 text-sm break-all">
          {session.user.email}
        </span>
      </div>
    </div>
  );
};

export default BottomBarUserProfile;

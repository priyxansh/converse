import UserAvatar from "./UserAvatar";
import { auth } from "@/lib/auth";
import SignOutButton from "../auth/SignOutButton";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type UserAvatarMenuProps = {
  className?: string;
};

const UserAvatarMenu = async ({ className }: UserAvatarMenuProps) => {
  const session = await auth();

  if (!session) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UserAvatar className={className} />
      </DropdownMenuTrigger>
      <DropdownMenuContent side={"bottom"} align={"end"}>
        <DropdownMenuLabel className="flex flex-col">
          <span className="font-bold">{session.user.name}</span>
          <span className="text-gray-500 text-sm">{session.user.email}</span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <SignOutButton
            variant="ghost"
            className="w-full cursor-pointer sm:justify-start justify-center"
          />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserAvatarMenu;

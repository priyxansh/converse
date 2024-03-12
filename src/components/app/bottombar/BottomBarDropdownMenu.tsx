import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Skeleton } from "@/components/ui/skeleton";
import SignOutButton from "@/components/auth/SignOutButton";
import DropdownThemeTogglerItem from "@/components/global/DropdownThemeTogglerItem";
import { auth } from "@/lib/auth";
import { MoreHorizontalIcon } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import BottomBarUserProfile from "./BottomBarUserProfile";

type BottomBarDropdownMenuProps = {};

const BottomBarDropdownMenu = async ({}: BottomBarDropdownMenuProps) => {
  const session = await auth();

  if (!session) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={`rounded-md hover:bg-accent hover:text-accent-foreground flex flex-col items-center justify-center p-2 gap-0`}
      >
        <span>
          <MoreHorizontalIcon size={20} />
        </span>
        <span className="text-xs">More</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel className="flex flex-col">
          <Suspense fallback={<Skeleton className="w-56 h-10" />}>
            <BottomBarUserProfile />
          </Suspense>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownThemeTogglerItem />
        <DropdownMenuItem asChild>
          <Link href="/profile">Profile</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/settings">Settings</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <SignOutButton
            variant="ghost"
            className="w-full cursor-pointer justify-start"
          />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default BottomBarDropdownMenu;

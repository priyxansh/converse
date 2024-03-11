import { Suspense } from "react";
import UserAvatarMenu from "../../user-avatar/UserAvatarMenu";
import { Skeleton } from "../../ui/skeleton";
import SideBarList from "./SideBarList";
import ThemeToggler from "../../global/ThemeToggler";

type SideBarProps = {};

const SideBar = ({}: SideBarProps) => {
  return (
    <div className="border-r px-3 py-4 flex flex-col gap-2">
      <Suspense fallback={<Skeleton className="h-10 w-10 rounded-sm" />}>
        <UserAvatarMenu
          className="h-10 w-10 rounded-sm"
          side="right"
          align="start"
        />
      </Suspense>
      <SideBarList />
      <ThemeToggler hintSide="right" hintAlign="center" />
    </div>
  );
};

export default SideBar;

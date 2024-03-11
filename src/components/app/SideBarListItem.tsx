"use client";

import Link from "next/link";
import Hint from "../global/Hint";
import { Button } from "../ui/button";
import { usePathname } from "next/navigation";

type SideBarListItemProps = {
  item: {
    id: number;
    label: string;
    icon: JSX.Element;
    path: string;
  };
};

const SideBarListItem = ({ item }: SideBarListItemProps) => {
  // Check if the current path is the same as the item path
  const pathname = usePathname();
  const isActive = pathname === item.path;

  return (
    <Hint
      delayDuration={100}
      side="right"
      align="center"
      trigger={
        <Button
          key={item.id}
          size={"icon"}
          variant={"ghost"}
          asChild
          className={`${isActive ? "bg-primary/20 hover:bg-primary/30" : ""}`}
        >
          <Link href={item.path}>{item.icon}</Link>
        </Button>
      }
      content={item.label}
    />
  );
};

export default SideBarListItem;

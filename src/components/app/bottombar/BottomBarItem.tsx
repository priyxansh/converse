"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

type BottomBarItemProps = {
  item: {
    id: number;
    label: string;
    icon: JSX.Element;
    path: string;
  };
};

const BottomBarItem = ({ item }: BottomBarItemProps) => {
  // Check if the current path is the same as the item path
  const pathname = usePathname();
  const isActive = pathname === item.path;
  return (
    <Link
      href={item.path}
      className={`rounded-md hover:bg-accent hover:text-accent-foreground flex flex-col items-center justify-center p-2 ${
        isActive ? "text-primary hover:text-primary" : ""
      }`}
    >
      <span>{item.icon}</span>
      <span className="text-xs">{item.label}</span>
    </Link>
  );
};

export default BottomBarItem;

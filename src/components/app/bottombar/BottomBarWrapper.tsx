"use client";

import { usePathname } from "next/navigation";

type BottomBarWrapperProps = {
  bottomBar: React.ReactNode;
};

const BottomBarWrapper = ({ bottomBar }: BottomBarWrapperProps) => {
  const pathname = usePathname();
  const isChatOpen = pathname.match(/\/chat\/\w+/g);

  if (isChatOpen) {
    return null;
  }

  return bottomBar;
};

export default BottomBarWrapper;

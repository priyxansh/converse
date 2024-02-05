"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";

type NavLinkProps = {
  label: string;
  path: string;
  className?: string;
  closeSheet?: () => void;
};

const NavLink = ({ label, path, className, closeSheet }: NavLinkProps) => {
  // Check if the current path matches the path of the link
  const pathname = usePathname();
  const isActive = pathname === path;

  return (
    <li className={className}>
      <Button asChild variant={"link"} onClick={closeSheet}>
        <Link href={path} className={`${isActive ? "underline" : ""}`}>
          {label}
        </Link>
      </Button>
    </li>
  );
};

export default NavLink;

"use client";

import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { MenuIcon } from "lucide-react";
import { NAV_ROUTES } from "@/constants/nav-routes";
import NavLink from "./NavLink";
import { useState } from "react";

type NavSheetProps = {};

const NavSheet = ({}: NavSheetProps) => {
  // Control the open state of the sheet in child components
  const [open, setOpen] = useState(false);

  const closeSheet = () => {
    setOpen(false);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger className="flex items-center justify-center">
        <MenuIcon size={18} />
      </SheetTrigger>
      <SheetContent side={"left"} className="flex flex-col justify-center">
        <nav>
          <ul className="flex flex-col gap-2">
            {NAV_ROUTES.map((route) => {
              return (
                <NavLink
                  key={route.id}
                  label={route.label}
                  path={route.path}
                  className="flex justify-center"
                  closeSheet={closeSheet}
                />
              );
            })}
          </ul>
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default NavSheet;

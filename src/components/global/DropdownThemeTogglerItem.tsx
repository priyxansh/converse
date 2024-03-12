"use client";

import { useTheme } from "next-themes";
import { useState } from "react";
import { DropdownMenuItem } from "../ui/dropdown-menu";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";

type DropdownThemeTogglerItemProps = {};

const DropdownThemeTogglerItem = ({}: DropdownThemeTogglerItemProps) => {
  const { theme, setTheme } = useTheme();

  const [checked, setChecked] = useState(theme === "dark");

  return (
    <DropdownMenuItem asChild onSelect={(e) => e.preventDefault()}>
      <Label
        htmlFor="dark-mode-switch"
        className="font-normal flex justify-between items-center cursor-pointer"
      >
        <span>Dark Mode</span>
        <Switch
          id="dark-mode-switch"
          checked={checked}
          onCheckedChange={(e) => {
            setChecked(e);
            setTheme(e ? "dark" : "light");
          }}
        />
      </Label>
    </DropdownMenuItem>
  );
};

export default DropdownThemeTogglerItem;

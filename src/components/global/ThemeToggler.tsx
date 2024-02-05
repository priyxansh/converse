"use client";

import { useTheme } from "next-themes";
import { Button } from "../ui/button";
import { MoonIcon, SunIcon } from "lucide-react";

type ThemeTogglerProps = {
  className?: string;
};

const ThemeToggler = ({ className }: ThemeTogglerProps) => {
  // Access the theme and setTheme function from the useTheme hook
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <Button
      onClick={toggleTheme}
      variant={"ghost"}
      size={"icon"}
      className={className}
      aria-label={
        theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
      }
    >
      {theme === "dark" ? <SunIcon size={18} /> : <MoonIcon size={18} />}
    </Button>
  );
};

export default ThemeToggler;

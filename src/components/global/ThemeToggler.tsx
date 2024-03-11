"use client";

import { useTheme } from "next-themes";
import { Button } from "../ui/button";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import Hint from "./Hint";

type ThemeTogglerProps = {
  className?: string;
  hintSide?: "top" | "bottom" | "left" | "right";
  hintAlign?: "start" | "center" | "end";
};

const ThemeToggler = ({
  className,
  hintSide = "bottom",
  hintAlign = "center",
}: ThemeTogglerProps) => {
  // Access the theme and setTheme function from the useTheme hook
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <Hint
      delayDuration={100}
      asChild
      side={hintSide}
      align={hintAlign}
      trigger={
        <Button
          onClick={toggleTheme}
          variant={"ghost"}
          size={"icon"}
          className={className}
          aria-label={
            theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
          }
        >
          {theme === "dark" ? (
            <MoonIcon className="w-4 h-4" />
          ) : (
            <SunIcon className="w-4 h-4" />
          )}
        </Button>
      }
      content={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    />
  );
};

export default ThemeToggler;

"use client";

import { useTheme } from "next-themes";
import Image from "next/image";

type ChatWallpaperProps = {};

const ChatWallpaper = ({}: ChatWallpaperProps) => {
  const { theme } = useTheme();

  return (
    <>
      {theme === "dark" ? (
        <Image
          className="absolute inset-0 object-cover -z-10"
          fill
          src={
            "https://utfs.io/f/90dd7d99-0899-4f75-a05f-635b511f603a-ef9ija.png"
          }
          alt="Chat background dark"
        />
      ) : (
        <Image
          className="absolute inset-0 object-cover -z-10"
          fill
          src={
            "https://utfs.io/f/c5c0a910-299b-49e9-851d-977669e05808-j8mxkm.png"
          }
          alt="Chat background light"
        />
      )}
    </>
  );
};

export default ChatWallpaper;

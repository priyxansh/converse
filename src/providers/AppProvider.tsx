"use client";

import QueryProvider from "./QueryProvider";
import SocketProvider from "./SocketProvider";

type AppProviderProps = {
  children: React.ReactNode;
};

const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <SocketProvider>
      <QueryProvider>{children}</QueryProvider>
    </SocketProvider>
  );
};

export default AppProvider;

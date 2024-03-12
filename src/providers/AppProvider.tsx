"use client";

import QueryProvider from "./QueryProvider";

type AppProviderProps = {
  children: React.ReactNode;
};

const AppProvider = ({ children }: AppProviderProps) => {
  return <QueryProvider>{children}</QueryProvider>;
};

export default AppProvider;

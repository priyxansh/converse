"use client";

import { createContext, useEffect } from "react";
import { io, Socket } from "socket.io-client";

// Create a context for the socket
const SocketContext = createContext<{
  socket: Socket;
  isConnected: boolean;
} | null>(null);

type SocketProviderProps = {
  children: React.ReactNode;
};

const SocketProvider = ({ children }: SocketProviderProps) => {
  // Get the socket URL from the environment variables
  const socketUrl = process.env.NEXT_PUBLIC_SOCKET_URL;

  // If the socket URL is not found, show an error message
  if (!socketUrl) {
    return (
      <div className="flex-grow flex flex-col items-center justify-center p-4 text-center gap-2">
        <h1 className="font-semibold sm:text-lg">Socket URL not found :(</h1>
        <p className="text-sm sm:text-base">
          Please add the socket URL to the environment variables in the .env
          file.
        </p>
      </div>
    );
  }

  // Create a socket connection
  const socket = io(socketUrl);

  // Disconnect the socket when the component unmounts
  useEffect(() => {
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider
      value={{
        socket,
        isConnected: socket.connected,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;

"use client";

import { sendFriendRequestController } from "@/socket-controllers/sendFriendRequestController";
import { useSession } from "next-auth/react";
import { createContext, useContext, useEffect } from "react";
import { io, Socket } from "socket.io-client";

// Create a context for the socket
const SocketContext = createContext<{
  socket: Socket;
} | null>(null);

type SocketProviderProps = {
  children: React.ReactNode;
};

const SocketProvider = ({ children }: SocketProviderProps) => {
  // Get user session for joining the socket room with the user's username
  const { data: session } = useSession();

  // Get the socket URL from the environment variables
  const socketUrl = process.env.NEXT_PUBLIC_SOCKET_URL as string;

  // Create a socket connection
  const socket = io(socketUrl);

  // Join the socket room with the user's username
  useEffect(() => {
    if (socket && session?.user) {
      socket.emit("join", session.user.username);
    }
  }, [socket, session]);

  // Listen for socket events
  socket.on("receive_friend_request", sendFriendRequestController);

  // Disconnect the socket when the component unmounts
  useEffect(() => {
    return () => {
      socket.disconnect();
    };
  }, [socket]);

  return (
    <SocketContext.Provider
      value={{
        socket,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  const context = useContext(SocketContext);

  if (!context) {
    throw new Error("useSocket must be used within a SocketProvider");
  }

  return context;
};

export default SocketProvider;

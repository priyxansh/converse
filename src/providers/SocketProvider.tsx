"use client";

import { acceptFriendRequestController } from "@/socket-controllers/acceptFriendRequestController";
import { sendFriendRequestController } from "@/socket-controllers/sendFriendRequestController";
import { useSession } from "next-auth/react";
import { createContext, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

// Create a context for the socket
const SocketContext = createContext<{
  socket: Socket | null;
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
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const socket = io(socketUrl);
    setSocket(socket);
  }, []);

  // Join the socket room with the user's username
  useEffect(() => {
    if (socket && session?.user) {
      socket.emit("join", session.user.username);
    }
  }, [socket, session]);

  // Listen for socket events
  useEffect(() => {
    if (socket) {
      socket.on("receive_friend_request", sendFriendRequestController);
      socket.on("accept_friend_request", acceptFriendRequestController);
    }

    return () => {
      if (socket) {
        socket.off("receive_friend_request", sendFriendRequestController);
        socket.off("accept_friend_request", acceptFriendRequestController);
      }
    };
  }, [socket]);

  // Disconnect the socket when the component unmounts
  useEffect(() => {
    return () => {
      if (socket) {
        socket.disconnect();
      }
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

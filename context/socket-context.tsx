"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { Socket } from "socket.io-client";
import { socketManager } from "@/lib/socket";
import { useAuthToken } from "@/hooks/use-auth-token";

interface SocketContextType {
  socket: Socket | null;
  isConnected: boolean;
  connect: () => void;
  disconnect: () => void;
}

const SocketContext = createContext<SocketContextType | undefined>(undefined);

export function SocketProvider({
  children,
  autoConnect = true,
}: {
  children: ReactNode;
  autoConnect?: boolean;
}) {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const { token, isHydrated } = useAuthToken();

  // Auto-set token in socketManager
  useEffect(() => {
    socketManager.setAuthToken(token);
  }, [token]);

  // Connect on mount if token is ready and valid
  useEffect(() => {
    if (!isHydrated) return;
    if (autoConnect && token) {
      const s = socketManager.connect();
      setSocket(s);
    } else {
      socketManager.disconnect();
      setSocket(null);
    }

    return () => socketManager.disconnect();
  }, [token, isHydrated, autoConnect]);

  // Listen to connect / disconnect
  useEffect(() => {
    if (!socket) return;

    const handleConnect = () => setIsConnected(true);
    const handleDisconnect = () => setIsConnected(false);

    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);

    setIsConnected(socket.connected);

    return () => {
      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);
    };
  }, [socket]);

  return (
    <SocketContext.Provider
      value={{
        socket,
        isConnected,
        connect: () => setSocket(socketManager.connect()),
        disconnect: () => {
          socketManager.disconnect();
          setSocket(null);
          setIsConnected(false);
        },
      }}
    >
      {children}
    </SocketContext.Provider>
  );
}

export function useSocket() {
  const context = useContext(SocketContext);
  if (context === undefined) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return context;
}

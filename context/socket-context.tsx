"use client";

import { useAuthToken } from "@/hooks/use-auth-token";
import { socketManager } from "@/lib/socket";
import { message } from "antd";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { Socket } from "socket.io-client";

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
  const { token, isHydrated } = useAuthToken();
  const [messageApi, contextHolder] = message.useMessage();

  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  const logError = useCallback(() => {
    messageApi.open({
      type: "error",
      content: "Xảy ra lỗi kết nối với máy chủ. Đang cố gắng kết nối lại.",
    });
  }, [messageApi]);

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
    socket.on("disconnect", () => {
      logError();
      handleDisconnect();
    });
    socket.on("connect_error", (error) => {
      console.error("Socket connection error:", error);
      logError();
    });

    setIsConnected(socket.connected);

    return () => {
      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);
      socket.off("connect_error");
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
      {contextHolder}
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

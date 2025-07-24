"use client";

import { useSocket } from "@/context/socket-context";
import { useCallback } from "react";

export function useSocketEmit() {
  const { socket, isConnected } = useSocket();

  const emit = useCallback(
    (event: string, data?: any) => {
      if (socket && isConnected) {
        socket.emit(event, data);
        return true;
      }
      console.warn("Socket not connected, cannot emit event:", event);
      return false;
    },
    [socket, isConnected]
  );

  const emitWithAck = useCallback(
    (event: string, data?: any): Promise<any> => {
      return new Promise((resolve, reject) => {
        if (socket && isConnected) {
          socket.emit(event, data, (response: any) => {
            resolve(response);
          });
        } else {
          reject(new Error("Socket not connected"));
        }
      });
    },
    [socket, isConnected]
  );

  return { emit, emitWithAck, isConnected };
}

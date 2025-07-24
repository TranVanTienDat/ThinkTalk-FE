"use client";

import { useSocket } from "@/context/socket-context";
import { useEffect, useRef } from "react";

export function useSocketEvent<T = any>(
  event: string,
  handler: (data: T) => void,
  deps: any[] = []
) {
  const { socket } = useSocket();
  const handlerRef = useRef(handler);

  // Update handler ref when handler changes
  useEffect(() => {
    handlerRef.current = handler;
  }, [handler]);

  useEffect(() => {
    if (!socket) return;

    const eventHandler = (data: T) => {
      handlerRef.current(data);
    };

    socket.on(event, eventHandler);

    return () => {
      socket.off(event, eventHandler);
    };
  }, [socket, event, ...deps]);
}

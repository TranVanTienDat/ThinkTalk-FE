import { useCallback, useEffect, useRef } from "react";

type ScrollConfig = {
  isNextPage: boolean;
  fetchStatus?: "fetching" | "paused" | "idle";
  offset?: number | "bottom";
  otherDeps?: any[]; // Các dependencies khác
};

export const useScroll = ({
  isNextPage,
  fetchStatus,
  offset = 0,
  otherDeps = [],
}: ScrollConfig) => {
  const ref = useRef<HTMLDivElement | null>(null);

  const scrollToPosition = useCallback(
    (offset?: number | "bottom") => {
      if (!ref.current) return;
      if (typeof offset === "number") {
        ref.current.scrollTop = offset;
        return;
      }

      ref.current.scrollTop = ref.current.scrollHeight;
    },
    [isNextPage, offset]
  );

  useEffect(() => {
    if (!isNextPage && fetchStatus === "idle") {
      scrollToPosition(offset);
    }
  }, [isNextPage, fetchStatus, offset]);

  useEffect(() => {
    scrollToPosition("bottom");
  }, [...otherDeps]);

  return { ref, scrollToBottom: () => scrollToPosition("bottom") };
};

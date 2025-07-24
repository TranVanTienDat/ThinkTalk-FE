import { useCallback, useEffect, useRef } from "react";

type ScrollConfig = {
  isNextPage: boolean;
  offset?: number | "bottom";
  otherDeps?: any[]; // Các dependencies khác
};

export const useScroll = ({
  isNextPage,
  offset = 0,
  otherDeps = [],
}: ScrollConfig) => {
  const ref = useRef<HTMLDivElement | null>(null);

  const scrollToPosition = useCallback(
    (offset: number | "bottom") => {
      if (!ref.current) return;

      if (offset === "bottom") {
        ref.current.scrollTop = ref.current.scrollHeight;
        return;
      }

      if (typeof offset === "number") {
        ref.current.scrollTop = offset;
      }
    },
    [isNextPage, offset]
  );

  useEffect(() => {
    if (isNextPage) {
      scrollToPosition(offset);
    }
  }, [isNextPage, offset]);

  useEffect(() => {
    scrollToPosition("bottom");
  }, [...otherDeps]);

  return { ref };
};

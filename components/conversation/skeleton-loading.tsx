import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { BoxStyled } from ".";
import { useMemo } from "react";

export const ConversationLoading = ({
  ref,
}: {
  ref?: (node?: Element | null) => void;
}) => {
  const arr = useMemo(() => new Array(5).fill(0), []);
  return (
    <>
      {arr.map((_, index) => (
        <BoxStyled
          ref={ref}
          key={index}
          sx={{
            "&:hover": {
              backgroundColor: "transparent",
              cursor: "default",
            },
          }}
        >
          <Skeleton count={1} height={40} width={40} circle={true} />
          <div className="w-full">
            <Skeleton count={2} height={12} className="w-full" />
          </div>
        </BoxStyled>
      ))}
    </>
  );
};

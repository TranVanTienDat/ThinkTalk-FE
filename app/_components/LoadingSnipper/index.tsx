import clsx from "clsx";
import { LoaderCircleIcon } from "lucide-react";
import React from "react";

export const LoadingSnipper = ({
  className,
  iconClass,
}: {
  className?: string;
  iconClass?: string;
}) => {
  return (
    <div className={clsx("flex items-center justify-center p-4", className)}>
      <LoaderCircleIcon className={clsx("animate-spin", iconClass)} />
    </div>
  );
};

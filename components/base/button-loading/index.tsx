import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

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

type Props = {
  title: string;
  isLoading: boolean;
  className?: string;
  classNameLoading?: string;
  type: "button" | "submit" | "reset";
  action?: () => void;
};
export const ButtonLoading = ({
  title,
  isLoading,
  className,
  classNameLoading,
  type = "button",
  action,
}: Props) => {
  return (
    <Button
      disabled={isLoading}
      type={type}
      className={cn("bg-primary w-32 rounded px-3", className)}
      onClick={action}
    >
      {isLoading ? <LoadingSnipper className={classNameLoading} /> : title}
    </Button>
  );
};

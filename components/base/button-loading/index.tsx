import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { IconButton, IconButtonProps } from "@mui/joy";

import clsx from "clsx";
import { LoaderCircleIcon, LucideProps } from "lucide-react";
import React, { ForwardRefExoticComponent, RefAttributes } from "react";

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

type ButtonIconCustomizeProps = {
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  sizeIcon?: number;
  colorIcon?: string;
  handleOnClick?: () => void;
} & IconButtonProps;
export const IconButtonCustomize = ({
  icon,
  sizeIcon,
  colorIcon,
  handleOnClick,
  ...restProps
}: ButtonIconCustomizeProps) => {
  return (
    <IconButton {...restProps} onClick={handleOnClick}>
      {React.createElement(icon, {
        color: colorIcon,
        size: sizeIcon,
      })}
    </IconButton>
  );
};

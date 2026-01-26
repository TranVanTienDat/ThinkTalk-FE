import { cn } from "@/lib/utils";
import {
  IconButton,
  IconButtonProps,
  Button,
  CircularProgress,
} from "@mui/joy";

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
    <div className={cn("flex items-center justify-center p-4", className)}>
      <LoaderCircleIcon className={cn("animate-spin", iconClass)} />
    </div>
  );
};

type Props = {
  title: string;
  isLoading: boolean;
  className?: string;
  type?: "button" | "submit" | "reset";
  action?: () => void;
  size?: "sm" | "md" | "lg";
  variant?: "solid" | "outlined" | "plain" | "soft";
  color?: "primary" | "neutral" | "danger" | "success" | "warning";
};

export const ButtonLoading = ({
  title,
  isLoading,
  className,
  type = "button",
  action,
  size = "md",
  variant = "solid",
  color = "primary",
}: Props) => {
  return (
    <Button
      loading={isLoading}
      type={type}
      className={className}
      onClick={action}
      size={size}
      variant={variant}
      color={color}
      sx={{ borderRadius: "12px" }}
      loadingIndicator={
        <CircularProgress
          variant="solid"
          thickness={2}
          sx={{ "--CircularProgress-size": "20px" }}
        />
      }
    >
      {title}
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
  sizeIcon = 20,
  colorIcon,
  handleOnClick,
  ...restProps
}: ButtonIconCustomizeProps) => {
  return (
    <IconButton
      {...restProps}
      onClick={handleOnClick}
      sx={{
        borderRadius: "50%",
        ...restProps.sx,
      }}
    >
      {React.createElement(icon, {
        color: colorIcon,
        size: sizeIcon,
      })}
    </IconButton>
  );
};

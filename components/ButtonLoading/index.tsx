import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { LoadingSnipper } from "@/app/_components/LoadingSnipper";
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

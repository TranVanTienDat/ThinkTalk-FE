import { TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

export const TabTrigger = ({
  label,
  value,
  className,
}: {
  label: string;
  value: string;
  className?: string;
}) => {
  return (
    <TabsTrigger
      value={value}
      className={cn(
        "data-[state=active]:bg-transparent data-[state=active]:text-[#0F1834] data-[state=active]:shadow-none data-[state=active]:border-b data-[state=active]:border-primary rounded-none px-0 data-[state=active]:font-bold",
        className
      )}
    >
      {label}
    </TabsTrigger>
  );
};

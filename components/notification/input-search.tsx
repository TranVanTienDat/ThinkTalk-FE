import { Input } from "@mui/joy";
import { Search } from "lucide-react";

export default function InputNotificationSearch() {
  return (
    <Input
      placeholder="Tìm kiếm thông báo"
      sx={{
        backgroundColor: "white",
        "--Input-focusedThickness": "0",
        "&::before": {
          transition: "box-shadow .15s ease-in-out",
        },
      }}
      startDecorator={<Search size={16} />}
    />
  );
}

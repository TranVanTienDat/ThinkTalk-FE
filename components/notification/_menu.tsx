import { Notification } from "@/types";
import { Dropdown, IconButton, Menu, MenuButton, MenuItem } from "@mui/joy";
import { EllipsisVertical } from "lucide-react";

type PropsType = Notification & {
  open: boolean;
  onOpenChange: (event: React.SyntheticEvent | null, isOpen: boolean) => void;
};

export default function NotificationMenu({ props }: { props: PropsType }) {
  const { open, onOpenChange } = props;

  return (
    <Dropdown open={open} onOpenChange={onOpenChange}>
      <MenuButton
        slots={{ root: IconButton }}
        slotProps={{ root: { variant: "outlined", color: "neutral" } }}
        sx={{
          borderRadius: "50%",
          position: "absolute",
          right: "10px",
          top: "50%",
          transform: "translateY(-50%)",
          backgroundColor: "white",
          "&:hover": {
            backgroundColor: "white",
            color: "primary.700",
          },
        }}
      >
        <EllipsisVertical size={16} />
      </MenuButton>
      <Menu
        placement="right-start"
        sx={{ minWidth: 200, "--ListItemDecorator-size": "24px" }}
      >
        <MenuItem>Profile</MenuItem>
        <MenuItem>My account</MenuItem>
        <MenuItem>Logout</MenuItem>
      </Menu>
    </Dropdown>
  );
}

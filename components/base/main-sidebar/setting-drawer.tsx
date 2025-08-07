"use client";

import { DarkMode } from "@/types/device-system";
import {
  Box,
  DialogContent,
  DialogTitle,
  Divider,
  Drawer,
  FormControl,
  FormLabel,
  IconButton,
  ModalClose,
  Radio,
  RadioGroup,
  Stack,
  Typography,
  useColorScheme,
} from "@mui/joy";
import { Moon, Settings } from "lucide-react";
import { useCallback, useState } from "react";

export default function SettingDrawer() {
  const [open, setOpen] = useState(false);

  const toggleDrawer = useCallback(
    (inOpen: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setOpen(inOpen);
    },
    []
  );

  return (
    <>
      <IconButton variant="outlined" onClick={toggleDrawer(true)}>
        <Settings size={20} />
      </IconButton>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        <DialogTitle>Cài đặt</DialogTitle>
        <ModalClose />

        <Box
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
          sx={{
            p: "16px",
          }}
        >
          <DialogContent sx={{ gap: 2, overflow: "visible" }}>
            <DarkModeDevice />
          </DialogContent>
        </Box>
      </Drawer>
    </>
  );
}

const DarkModeDevice = () => {
  return (
    <Stack>
      <Stack direction="row" justifyContent="space-between">
        <Moon />
        <Typography level="body-md" fontWeight={700}>
          Chế độ giao diện
        </Typography>
      </Stack>
      <FormControlDarkModeCustomize />
    </Stack>
  );
};

const darkModes = [
  {
    value: "light",
    label: "Sáng",
  },
  {
    value: "dark",
    label: "Tối",
  },
  {
    value: "system",
    label: "Tự động",
  },
];

const FormControlDarkModeCustomize = () => {
  const { mode, setMode } = useColorScheme();
  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      console.log("event.target.value", event.target.value);
      setMode(event.target.value as DarkMode);
    },
    [setMode]
  );

  return (
    <FormControl sx={{ mt: "12px" }}>
      <RadioGroup
        defaultValue={mode}
        name="controlled-radio-buttons-group"
        value={mode}
        onChange={handleChange}
      >
        {darkModes.map((item) => (
          <Stack
            key={item.value}
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Radio key={item.value} value={item.value} />
            <FormLabel
              sx={{
                fontWeight: "500",
              }}
            >
              {item.label}
            </FormLabel>
          </Stack>
        ))}
      </RadioGroup>
      <Divider />
    </FormControl>
  );
};

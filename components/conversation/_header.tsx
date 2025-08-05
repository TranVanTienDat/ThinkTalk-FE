import { Box, Typography } from "@mui/joy";
import { PencilLine } from "lucide-react";
import Link from "next/link";
import { IconButtonCustomize } from "../base/button-loading";

export default function Header() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Typography level="h3">Đoạn chat</Typography>
      <Link href="/workspace/t/new">
        <IconButtonCustomize
          icon={PencilLine}
          sizeIcon={20}
          variant="soft"
          sx={{
            borderRadius: "50%",
            width: "40px",
            height: "40px",
          }}
        />
      </Link>
    </Box>
  );
}

import { Box, IconButton, Typography } from "@mui/joy";
import { PencilLine } from "lucide-react";
import Link from "next/link";

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
      <Link href="/chat" passHref>
        <IconButton
          variant="soft"
          sx={{
            borderRadius: "50%",
            width: "40px",
            height: "40px",
          }}
        >
          <PencilLine size={20} />
        </IconButton>
      </Link>
    </Box>
  );
}

"use client";
import { Button, Sheet, Typography } from "@mui/joy";
import Image from "next/image";

export default function WelcomePage() {
  return (
    <Sheet
      variant="soft"
      color="warning"
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        borderRadius: "8px",
      }}
    >
      <Typography level="h1" sx={{ mb: 2, fontWeight: 700, display: "flex" }}>
        Chào mừng đến với Cam App
        <Image
          alt=""
          src="/images/logo.svg"
          width={40}
          height={40}
          className="ml-2.5"
        />
      </Typography>
      <Typography level="body-lg" sx={{ mb: 4, maxWidth: 600 }}>
        Nơi bạn có thể kết nối, trò chuyện và chia sẻ khoảnh khắc cùng bạn bè
        một cách dễ dàng và thú vị. Hãy cùng bắt đầu hành trình giao tiếp ngay
        hôm nay!
      </Typography>
      <Button variant="solid" color="primary" size="lg">
        Bắt đầu ngay
      </Button>
    </Sheet>
  );
}

import {
  Avatar,
  Button,
  Card,
  CardContent,
  Chip,
  Stack,
  Typography,
} from "@mui/joy";
import { Users } from "lucide-react";
import Wrapper from "./_components/wrapper";

export default function Page() {
  return (
    <Wrapper>
      <Card sx={{ width: "100%", maxWidth: 400 }}>
        <CardContent>
          <Stack spacing={3} alignItems="center">
            {/* Avatar */}
            <Avatar
              src={""}
              alt={""}
              sx={{ width: 80, height: 80, fontSize: "2rem" }}
            >
              {"Nhóm EA".charAt(0).toUpperCase()}
            </Avatar>

            {/* Header */}
            <Stack spacing={1} alignItems="center">
              <Typography level="h3" fontWeight="bold">
                Tham gia nhóm chat
              </Typography>
              <Typography level="body-md">
                Bạn được mời tham gia nhóm chat
              </Typography>
            </Stack>

            {/* Chat Info */}
            <Stack spacing={2} alignItems="center" sx={{ width: "100%" }}>
              <Typography level="h4" fontWeight="semibold">
                {"EA"}
              </Typography>

              {
                <Chip
                  variant="soft"
                  color="primary"
                  startDecorator={<Users size={18} />}
                >
                  {24} thành viên
                </Chip>
              }
            </Stack>

            <Stack spacing={2} sx={{ width: "100%" }}>
              <Button loadingPosition="start" sx={{ width: "100%" }}>
                {false ? "Đang tham gia..." : "Tham gia nhóm chat"}
              </Button>

              <Button variant="outlined" color="neutral" sx={{ width: "100%" }}>
                Quay lại
              </Button>
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    </Wrapper>
  );
}

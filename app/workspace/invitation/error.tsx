"use client";

import { Card, CardContent, Stack, Typography } from "@mui/joy";
import Wrapper from "./_components/wrapper";

export default function Error() {
  return (
    <Wrapper>
      <Card sx={{ width: "100%", maxWidth: 500 }}>
        <CardContent>
          <Stack spacing={4}>
            <Stack spacing={2} alignItems="center">
              <Stack spacing={1} alignItems="center">
                <Typography level="h3" fontWeight="bold" color="danger">
                  Liên kết đã hết hạn
                </Typography>
                <Typography level="body-md" textAlign="center">
                  Liên kết tham gia nhóm chat này đã hết thời hạn sử dụng.
                </Typography>
              </Stack>
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    </Wrapper>
  );
}

"use client";

import FormDialog from "@/components/common/form-dialog";
import { Camera, Shield, UserPen } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import UpdatePasswordDialog from "./update-password-dialog";
import {
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Typography,
  Box,
  Stack,
} from "@mui/joy";

interface ProfileDialogProps {
  open: boolean;
  onClose: () => void;
}

export default function ProfileDialog({ open, onClose }: ProfileDialogProps) {
  // Local state for form fields to make them interactive
  const [displayName, setDisplayName] = useState("Alex Mercer");
  const [phoneNumber, setPhoneNumber] = useState("+1 (555) 012-3456");
  const [bio, setBio] = useState(
    "Product Designer @ ThinkTalk. Coffee enthusiast. Always looking for the next big design trend."
  );
  const [is2FAEnabled, setIs2FAEnabled] = useState(true);
  const [openUpdatePassword, setOpenUpdatePassword] = useState(false);

  const handleSave = () => {
    // Implement save logic here
    onClose();
  };

  return (
    <>
      <UpdatePasswordDialog
        open={openUpdatePassword}
        onClose={() => setOpenUpdatePassword(false)}
      />
      <FormDialog
        open={open}
        onOpenChange={(isOpen) => !isOpen && onClose()}
        title={
          <Stack direction="row" alignItems="center" spacing={1.5}>
            <UserPen className="text-[var(--joy-palette-primary-500)]" />
            <Typography level="h4" sx={{ fontWeight: 700 }}>
              Chỉnh sửa thông tin
            </Typography>
          </Stack>
        }
        primaryActionLabel="Lưu thay đổi"
        cancelActionLabel="Hủy"
        onPrimaryAction={handleSave}
        onCancel={onClose}
        contentClassName="!w-[800px]"
      >
        <Stack spacing={4}>
          {/* Avatar Section */}
          <Box sx={{ textAlign: "center" }}>
            <Box sx={{ position: "relative", display: "inline-block" }}>
              <Box
                sx={{
                  width: 120,
                  height: 120,
                  borderRadius: "50%",
                  overflow: "hidden",
                  border: "4px solid",
                  borderColor: "background.level1",
                  boxShadow: "md",
                  position: "relative",
                  "&:hover .avatar-overlay": { opacity: 1 },
                }}
              >
                <Image
                  alt="Profile picture"
                  src="/images/logo-bg.jpg"
                  fill
                  className="object-cover"
                />
                <Box
                  className="avatar-overlay"
                  sx={{
                    position: "absolute",
                    inset: 0,
                    bgcolor: "rgba(0,0,0,0.5)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    opacity: 0,
                    transition: "opacity 0.2s",
                    cursor: "pointer",
                  }}
                >
                  <Camera className="text-white" size={24} />
                </Box>
              </Box>
            </Box>
            <Box sx={{ mt: 2 }}>
              <Typography level="h3" sx={{ fontWeight: 800 }}>
                Alex Mercer
              </Typography>
              <Typography level="body-sm" sx={{ color: "text.tertiary" }}>
                Product Designer @ ThinkTalk
              </Typography>
            </Box>
          </Box>

          {/* Form Fields Grid */}
          <Box className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormControl>
              <FormLabel>Tên hiển thị</FormLabel>
              <Input
                placeholder="Nhập tên của bạn"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                sx={{ borderRadius: "12px" }}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Số điện thoại</FormLabel>
              <Input
                placeholder="Nhập số điện thoại"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                sx={{ borderRadius: "12px" }}
              />
            </FormControl>

            <FormControl className="md:col-span-2">
              <FormLabel>Giới thiệu bản thân</FormLabel>
              <Textarea
                placeholder="Kể một chút về bạn..."
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                minRows={3}
                maxRows={5}
                sx={{ borderRadius: "12px" }}
              />
              <Typography
                level="body-xs"
                sx={{ textAlign: "right", mt: 1, color: "text.tertiary" }}
              >
                Còn lại {240 - bio.length} ký tự
              </Typography>
            </FormControl>
          </Box>

          {/* Security Section */}
          <Box sx={{ borderTop: "1px solid", borderColor: "divider", pt: 3 }}>
            <Stack
              direction="row"
              alignItems="center"
              spacing={1}
              sx={{ mb: 2 }}
            >
              <Shield
                className="text-[var(--joy-palette-primary-500)]"
                size={20}
              />
              <Typography level="title-md" sx={{ fontWeight: 700 }}>
                Bảo mật & Quyền riêng tư
              </Typography>
            </Stack>

            <Stack spacing={2}>
              {/* 2FA Toggle */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  p: 2,
                  borderRadius: "16px",
                  bgcolor: "background.level1",
                  border: "1px solid",
                  borderColor: "divider",
                }}
              >
                <Box>
                  <Typography level="title-sm" sx={{ fontWeight: 600 }}>
                    Xác thực 2 yếu tố
                  </Typography>
                  <Typography level="body-xs" sx={{ color: "text.tertiary" }}>
                    Thêm một lớp bảo mật cho tài khoản của bạn.
                  </Typography>
                </Box>
                <Checkbox
                  checked={is2FAEnabled}
                  onChange={(e) => setIs2FAEnabled(e.target.checked)}
                  variant="solid"
                  color="primary"
                  sx={{ "--Checkbox-size": "20px" }}
                />
              </Box>

              {/* Change Password */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  p: 2,
                  borderRadius: "16px",
                  bgcolor: "background.level1",
                  border: "1px solid",
                  borderColor: "divider",
                }}
              >
                <Box>
                  <Typography level="title-sm" sx={{ fontWeight: 600 }}>
                    Mật khẩu
                  </Typography>
                  <Typography level="body-xs" sx={{ color: "text.tertiary" }}>
                    Thay đổi mật khẩu định kỳ để an toàn hơn.
                  </Typography>
                </Box>
                <Button
                  onClick={() => setOpenUpdatePassword(true)}
                  variant="outlined"
                  color="neutral"
                  size="sm"
                  sx={{ borderRadius: "10px", fontWeight: 600 }}
                >
                  Cập nhật
                </Button>
              </Box>
            </Stack>
          </Box>
        </Stack>
      </FormDialog>
    </>
  );
}

"use client";

import FormDialog from "@/components/common/form-dialog";
import { FormControl, FormLabel, Input, Stack, Typography } from "@mui/joy";
import { KeyRound, Lock } from "lucide-react";
import { useState } from "react";

interface UpdatePasswordDialogProps {
  open: boolean;
  onClose: () => void;
}

export default function UpdatePasswordDialog({
  open,
  onClose,
}: UpdatePasswordDialogProps) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = () => {
    // Add logic to update password here
    console.log("Password update requested");
    onClose();
  };

  return (
    <FormDialog
      open={open}
      onOpenChange={(isOpen) => !isOpen && onClose()}
      title={
        <Stack direction="row" alignItems="center" spacing={1.5}>
          <KeyRound
            className="text-[var(--joy-palette-primary-500)]"
            size={24}
          />
          <Typography level="h4" sx={{ fontWeight: 700 }}>
            Đổi mật khẩu
          </Typography>
        </Stack>
      }
      primaryActionLabel="Cập nhật mật khẩu"
      cancelActionLabel="Hủy"
      onPrimaryAction={handleSubmit}
      onCancel={onClose}
      contentClassName="max-w-[450px] w-full"
    >
      <Stack spacing={3} sx={{ mt: 1 }}>
        <Typography level="body-sm" sx={{ color: "text.secondary" }}>
          Đảm bảo mật khẩu mới của bạn có ít nhất 8 ký tự, bao gồm chữ cái và
          số.
        </Typography>

        {/* Current Password */}
        <FormControl>
          <FormLabel>Mật khẩu hiện tại</FormLabel>
          <Input
            startDecorator={
              <Lock
                className="text-[var(--joy-palette-text-tertiary)]"
                size={18}
              />
            }
            type="password"
            placeholder="••••••••"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
            sx={{ borderRadius: "12px" }}
          />
        </FormControl>

        {/* New Password */}
        <FormControl>
          <FormLabel>Mật khẩu mới</FormLabel>
          <Input
            startDecorator={
              <Lock
                className="text-[var(--joy-palette-text-tertiary)]"
                size={18}
              />
            }
            type="password"
            placeholder="••••••••"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            sx={{ borderRadius: "12px" }}
          />
        </FormControl>

        {/* Confirm New Password */}
        <FormControl>
          <FormLabel>Xác nhận mật khẩu mới</FormLabel>
          <Input
            startDecorator={
              <Lock
                className="text-[var(--joy-palette-text-tertiary)]"
                size={18}
              />
            }
            type="password"
            placeholder="••••••••"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            sx={{ borderRadius: "12px" }}
          />
        </FormControl>
      </Stack>
    </FormDialog>
  );
}

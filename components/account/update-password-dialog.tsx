"use client";

import FormDialog from "@/components/common/form-dialog";
import { FormControl, FormLabel, Input } from "@mui/joy";
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
        <div className="flex items-center gap-3">
          <KeyRound className="text-primary w-6 h-6" />
          <span className="text-xl font-bold font-sans tracking-tight text-foreground">
            Change Password
          </span>
        </div>
      }
      primaryActionLabel="Update Password"
      cancelActionLabel="Cancel"
      onPrimaryAction={handleSubmit}
      onCancel={onClose}
      contentClassName="max-w-[500px] w-full"
    >
      <div className="flex flex-col gap-6">
        {/* Current Password */}
        <FormControl>
          <FormLabel>Current Password</FormLabel>
          <Input
            startDecorator={<Lock className="text-muted-foreground w-5 h-5" />}
            type="password"
            placeholder="Enter current password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
          />
        </FormControl>

        {/* New Password */}
        <FormControl>
          <FormLabel>New Password</FormLabel>
          <Input
            startDecorator={<Lock className="text-muted-foreground w-5 h-5" />}
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </FormControl>

        {/* Confirm New Password */}
        <FormControl>
          <FormLabel>Confirm New Password</FormLabel>
          <Input
            startDecorator={<Lock className="text-muted-foreground w-5 h-5" />}
            type="password"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </FormControl>
      </div>
    </FormDialog>
  );
}

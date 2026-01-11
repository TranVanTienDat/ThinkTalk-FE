"use client";

import FormDialog from "@/components/common/form-dialog";
import {
  Camera,
  Edit,
  IdCard,
  Mail,
  Phone,
  Shield,
  UserPen,
} from "lucide-react";
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
          <div className="flex items-center gap-3">
            <UserPen className="text-primary w-6 h-6" />
            <span className="text-xl font-bold font-sans tracking-tight text-foreground">
              Edit Profile
            </span>
          </div>
        }
        primaryActionLabel="Save Changes"
        cancelActionLabel="Cancel"
        onPrimaryAction={handleSave}
        onCancel={onClose}
        contentClassName="!w-[800px] bg-card text-card-foreground"
      >
        <div className="flex flex-col gap-8">
          {/* Avatar Section */}
          <div className="flex flex-col items-center">
            <div className="relative group cursor-pointer">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-muted shadow-lg relative">
                <Image
                  alt="Profile picture"
                  src="/images/logo-bg.jpg"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-black/60 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <Camera className="text-white w-8 h-8" />
              </div>
            </div>
            <div className="mt-4 text-center">
              <h3 className="text-2xl font-bold font-sans text-foreground">
                Alex Mercer
              </h3>
              <p className="text-muted-foreground text-sm">
                Product Designer @ ThinkTalk
              </p>
            </div>
          </div>

          {/* Form Fields Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Display Name */}
            {/* Display Name */}
            <FormControl>
              <FormLabel>Display Name</FormLabel>
              <Input
                placeholder="Enter your name"
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
              />
            </FormControl>

            {/* Email */}
            {/* Email */}
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input
                placeholder="Email"
                type="email"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </FormControl>

            {/* Bio (Full Width) */}
            {/* Bio (Full Width) */}
            <FormControl className="md:col-span-2">
              <FormLabel>Bio</FormLabel>
              <Textarea
                placeholder="Write a short bio about yourself..."
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                minRows={3}
                maxRows={5}
              />
              <p className="text-xs text-right text-muted-foreground mt-2">
                {240 - bio.length} characters left
              </p>
            </FormControl>
          </div>

          {/* Security Section */}
          <div className="border-t border-border pt-6">
            <h4 className="text-lg font-bold mb-4 flex items-center gap-2 text-foreground">
              <Shield className="text-primary w-6 h-6" />
              Security & Privacy
            </h4>
            <div className="grid gap-4">
              {/* 2FA Toggle */}
              <div className="flex items-center justify-between p-4 rounded-lg bg-muted border border-border">
                <div className="flex flex-col">
                  <span className="font-medium text-foreground">
                    2-Step Verification
                  </span>
                  <span className="text-sm text-muted-foreground">
                    Add an extra layer of security to your account.
                  </span>
                </div>
                <Checkbox
                  checked={is2FAEnabled}
                  onChange={(e) => setIs2FAEnabled(e.target.checked)}
                  variant="solid"
                  color="primary"
                />
              </div>
              {/* Change Password */}
              <div className="flex items-center justify-between p-4 rounded-lg bg-muted border border-border">
                <div className="flex flex-col">
                  <span className="font-medium text-foreground">Password</span>
                  <span className="text-sm text-muted-foreground">
                    Last changed 3 months ago
                  </span>
                </div>
                <Button
                  onClick={() => setOpenUpdatePassword(true)}
                  variant="outlined"
                  color="neutral"
                  size="sm"
                >
                  Update
                </Button>
              </div>
            </div>
          </div>
        </div>
      </FormDialog>
    </>
  );
}

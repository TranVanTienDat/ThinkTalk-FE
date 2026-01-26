"use client";
import useDocumentTitle from "@/hooks/use-document-title";
import { useNotification } from "@/hooks/use-notification";
import { DeviceType } from "@/types";
import { getDevice } from "@/utils/getDevice";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  Divider,
  Link as JoyLink,
  Stack,
  Typography,
  useTheme,
} from "@mui/joy";
import Cookies from "js-cookie";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { AuthWrap } from "../_components/auth-wrap";
import { GoogleIcon } from "../_components/google-icon";
import { InputWithLabel } from "../_components/input-with-label";

const formSchema = z.object({
  email: z.string().email({ message: "Email không hợp lệ" }),
  password: z.string().min(5, {
    message: "Mật khẩu phải có ít nhất 5 ký tự",
  }),
});

type FormValues = z.infer<typeof formSchema>;

export default function LoginPage() {
  useDocumentTitle("Đăng nhập | ThinkTalk");
  const theme = useTheme();
  const router = useRouter();
  const { contextHolder, openNotification } = useNotification();

  const [device, setDevice] = useState<DeviceType | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      import("device-uuid").then(({ DeviceUUID }) => {
        const du = new DeviceUUID().parse();
        setDevice({
          type: du.browser,
          device_token: getDevice(du),
          info: {
            browser: du.browser,
            version: du.version,
            os: du.os,
            platform: du.platform,
            source: du.source,
          },
        });
      });
    }
  }, []);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: FormValues) {
    if (!device?.type || !device?.device_token) return;
    try {
      const { email, password } = values;
      setLoading(true);
      const result = await signIn("credentials", {
        email,
        password,
        type: device.type,
        device_token: device.device_token,
        info: JSON.stringify(device.info),
        typeAuth: "login",
        redirect: false,
      });

      if (result?.error) {
        openNotification({
          title: "Đăng nhập thất bại",
          description: result.error,
          type: "error",
        });
      } else {
        router.push("/workspace");
      }
    } catch (error: any) {
      openNotification({
        title: "Đăng nhập thất bại",
        description:
          error?.data?.message || error?.message || "Đã có lỗi xảy ra",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  }

  const handleGoogleSign = async () => {
    if (!device?.type || !device?.device_token) return;
    Cookies.set("device", JSON.stringify(device), { expires: 1 });
    await signIn("google", {
      callbackUrl: "/workspace",
    });
  };

  return (
    <AuthWrap>
      {contextHolder}
      <Box sx={{ mb: 4 }}>
        <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 1 }}>
          <Typography level="h2" sx={{ fontWeight: 800, fontSize: "1.875rem" }}>
            Welcome back
          </Typography>
          <Image src="/images/icon.png" alt="Logo" width={32} height={32} />
        </Stack>
        <Typography
          level="body-md"
          sx={{ color: "text.secondary", fontWeight: 500 }}
        >
          ThinkTalk - Kết nối và chia sẻ không giới hạn 👋
        </Typography>
      </Box>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Stack spacing={2.5}>
          <InputWithLabel
            placeholder="name@company.com"
            fieldTitle="Email"
            nameInSchema="email"
          />
          <Box>
            <InputWithLabel
              placeholder="••••••••"
              fieldTitle="Mật khẩu"
              nameInSchema="password"
              type="password"
            />
            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: -1 }}>
              <JoyLink
                component={Link}
                href="/forgot-password"
                level="body-xs"
                sx={{ fontWeight: 600 }}
              >
                Quên mật khẩu?
              </JoyLink>
            </Box>
          </Box>

          <Button
            type="submit"
            loading={loading}
            size="lg"
            sx={{
              borderRadius: "12px",
              py: 1.5,
              fontWeight: 700,
              fontSize: "1rem",
              boxShadow: theme.vars.shadow.md,
              "&:hover": {
                transform: "translateY(-2px)",
                boxShadow: theme.vars.shadow.lg,
              },
            }}
          >
            Đăng nhập
          </Button>
        </Stack>
      </form>

      <Box sx={{ my: 4, position: "relative" }}>
        <Divider sx={{ zIndex: 0 }}>
          <Typography
            level="body-xs"
            sx={{
              px: 2,
              bgcolor: "background.surface",
              fontWeight: 600,
              color: "text.tertiary",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}
          >
            Hoặc tiếp tục với
          </Typography>
        </Divider>
      </Box>

      <Button
        variant="outlined"
        color="neutral"
        fullWidth
        size="lg"
        type="button"
        startDecorator={<GoogleIcon />}
        sx={{
          borderRadius: "12px",
          fontWeight: 600,
          border: "1px solid",
          borderColor: "neutral.outlinedBorder",
          "&:hover": {
            bgcolor: "neutral.softBg",
            borderColor: "neutral.outlinedHoverBorder",
          },
        }}
        onClick={handleGoogleSign}
      >
        Đăng nhập bằng Google
      </Button>

      <Typography
        level="body-sm"
        sx={{ textAlign: "center", mt: 4, fontWeight: 500 }}
      >
        Chưa có tài khoản?{" "}
        <JoyLink component={Link} href="/register" sx={{ fontWeight: 700 }}>
          Đăng ký ngay
        </JoyLink>
      </Typography>
    </AuthWrap>
  );
}

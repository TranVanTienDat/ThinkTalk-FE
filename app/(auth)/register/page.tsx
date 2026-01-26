"use client";
import useDocumentTitle from "@/hooks/use-document-title";
import { useNotification } from "@/hooks/use-notification";
import { DeviceType } from "@/types";
import { getDevice } from "@/utils/getDevice";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Typography,
  Link as JoyLink,
  Stack,
  Box,
  useTheme,
  Divider,
} from "@mui/joy";
import { signIn } from "next-auth/react";
import Cookies from "js-cookie";
import { GoogleIcon } from "../_components/google-icon";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { AuthWrap } from "../_components/auth-wrap";
import { InputWithLabel } from "../_components/input-with-label";

const formSchema = z.object({
  fullName: z.string().min(2, {
    message: "Có vẻ như tên của bạn quá ngắn",
  }),
  email: z.string().email({ message: "Email không hợp lệ" }),
  password: z.string().min(5, {
    message: "Mật khẩu phải có ít nhất 5 ký tự",
  }),
});

type FormValues = z.infer<typeof formSchema>;

export default function RegisterPage() {
  useDocumentTitle("Đăng ký | ThinkTalk");
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
      fullName: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: FormValues) {
    if (!device?.type || !device?.device_token) return;

    setLoading(true);
    try {
      const { email, password, fullName } = values;

      const result = await signIn("credentials", {
        email,
        password,
        fullName,
        type: device.type,
        device_token: device.device_token,
        info: JSON.stringify(device.info),
        typeAuth: "register",
        redirect: false,
      });

      if (result?.error) {
        openNotification({
          title: "Đăng ký thất bại",
          description: result.error,
          type: "error",
        });
      } else {
        router.push("/workspace");
      }
    } catch (error: any) {
      openNotification({
        title: "Đăng ký thất bại",
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
      <Box
        sx={{
          mb: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Image
          src="/images/logo-max-size.png"
          alt="Logo"
          width={180}
          height={84}
          style={{ marginBottom: "16px" }}
        />
        <Typography level="h3" sx={{ fontWeight: 800, mb: 0.5 }}>
          Tham gia ThinkTalk
        </Typography>
        <Typography
          level="body-sm"
          sx={{ color: "text.secondary", fontWeight: 500 }}
        >
          Bắt đầu hành trình kết nối của bạn ngay hôm nay
        </Typography>
      </Box>

      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Stack spacing={2.5}>
            <InputWithLabel
              placeholder="Họ và tên của bạn"
              fieldTitle="Họ và tên"
              nameInSchema="fullName"
            />

            <InputWithLabel
              placeholder="name@company.com"
              fieldTitle="Email"
              nameInSchema="email"
            />

            <InputWithLabel
              placeholder="••••••••"
              fieldTitle="Mật khẩu"
              nameInSchema="password"
              type="password"
            />

            <Button
              type="submit"
              loading={loading}
              size="lg"
              sx={{
                borderRadius: "12px",
                py: 1.5,
                mt: 1,
                fontWeight: 700,
                fontSize: "1rem",
                boxShadow: theme.vars.shadow.md,
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow: theme.vars.shadow.lg,
                },
              }}
            >
              Tạo tài khoản
            </Button>
          </Stack>
        </form>
      </FormProvider>

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
        Đăng ký bằng Google
      </Button>

      <Typography
        level="body-sm"
        sx={{ textAlign: "center", mt: 4, fontWeight: 500 }}
      >
        Đã có tài khoản?{" "}
        <JoyLink component={Link} href="/login" sx={{ fontWeight: 700 }}>
          Đăng nhập ngay
        </JoyLink>
      </Typography>
    </AuthWrap>
  );
}

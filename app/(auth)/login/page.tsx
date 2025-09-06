"use client";
import { Form } from "@/components/ui/form";
import useDocumentTitle from "@/hooks/use-document-title";
import { useNotification } from "@/hooks/use-notification";
import { DeviceType } from "@/types";
import { getDevice } from "@/utils/getDevice";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@mui/joy";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { AuthWrap } from "../_components/auth-wrap";
import ButtonSign from "../_components/button-sign";
import { InputWithLabel } from "../_components/input-with-label";
const formSchema = z.object({
  // fullname: z.string().min(2, {
  //   message: "Có vẻ như tên của bạn quá ngắn",
  // }),
  email: z.string().email({ message: "Email không hợp lệ" }),
  password: z.string().min(5, {
    message: "Mật khẩu phải có ít nhất 5 ký tự",
  }),
});

export default function Page() {
  useDocumentTitle("Đăng nhập");
  const { contextHolder, openNotification } = useNotification();
  const [device, setDevice] = useState<DeviceType | null>(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    // Chỉ chạy trên client-side
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

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!device?.type || !device?.device_token) return;
    try {
      const { email, password } = values;
      setLoading(true);
      await signIn("credentials", {
        email,
        password,
        type: device.type,
        device_token: device.device_token,
        info: JSON.stringify(device.info),
        redirectTo: "/workspace",
        redirect: true,
      });
    } catch (error: any) {
      openNotification({
        title: "Đăng nhập thất bại",
        description: error?.data?.message || error?.message,
      });
    } finally {
      setLoading(false);
    }
  }
  return (
    <AuthWrap>
      {contextHolder}
      <div className="pt-4 pb-10">
        <h1 className="pb-3 font-bold text-3xl flex gap-3"
        >
          Welcome back{" "}
          <Image src="/images/icon.png" alt="Logo" width={38} height={38} />{" "}
        </h1>
        <p className="text-base">We are happy to have you back 👋</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <InputWithLabel
            placeholder="Nhập email của bạn"
            fieldTitle="Email"
            nameInSchema="email"
          />
          <InputWithLabel
            placeholder="Nhập password của bạn"
            fieldTitle="Password"
            nameInSchema="password"
          />

          <div className="text-right">
            <Button variant="solid" loading={loading} type="submit">
              Đăng nhập
            </Button>
          </div>
        </form>
      </Form>
      <div className="text-right mt-3 text-sm ">
        Chưa có tài khoản?
        <Link className="text-[#615EF0] text-sm ml-2" href={"/register"}>
          đăng kí ngay
        </Link>
      </div>
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">
            Hoặc tiếp tục với
          </span>
        </div>
      </div>

   <ButtonSign />
    </AuthWrap>
  );
}
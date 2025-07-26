"use client";
import auth from "@/apiRequest/auth";
import { Form } from "@/components/ui/form";
import useDocumentTitle from "@/hooks/use-document-title";
import { useToast } from "@/hooks/use-toast";
import useUserDetailStore, { UserType } from "@/stores/user-store";
import { DeviceType } from "@/types";
import { getDevice } from "@/utils/getDevice";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@mui/joy";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { AuthWrap } from "../_components/auth-wrap";
import { InputWithLabel } from "../_components/input-with-label";
import Link from "next/link";
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
  const saveUser = useUserDetailStore((state) => state.saveUser);
  const [device, setDevice] = useState<DeviceType | null>(null);

  useEffect(() => {
    // Chỉ chạy trên client-side
    if (typeof window !== "undefined") {
      import("device-uuid").then(({ DeviceUUID }) => {
        const du = new DeviceUUID().parse();
        setDevice({
          type: du.browser,
          device_token: getDevice(du),
        });
      });
    }
  }, []);

  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!device?.type || !device?.device_token) return;

    const { email, password } = values;
    const response = await auth.login({
      email,
      password,
      type: device.type,
      device_token: device.device_token,
    });

    if (response) {
      saveUser(response as UserType);
      router.push("/workspace");
    } else {
      toast({
        variant: "destructive",
        title: "Đăng nhập thất bại",
        description: "Email hoặc mật khẩu không chính xác",
      });
    }
  }
  return (
    <AuthWrap>
      <div className="pt-4 pb-10">
        <h1 className="pb-3 font-bold text-3xl flex gap-3">
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
            <Button variant="soft" loading={false} type="submit">
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
    </AuthWrap>
  );
}

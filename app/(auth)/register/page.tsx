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
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { AuthWrap } from "../_components/auth-wrap";
import { InputWithLabel } from "../_components/input-with-label";

const formSchema = z.object({
  fullname: z.string().min(2, {
    message: "Có vẻ như tên của bạn quá ngắn",
  }),
  email: z.string().email({ message: "Email không hợp lệ" }),
  password: z.string().min(5, {
    message: "Mật khẩu phải có ít nhất 5 ký tự",
  }),
});

export default function Page() {
  useDocumentTitle("Đăng kí");
  const saveUser = useUserDetailStore((state) => state.saveUser);
  const { toast } = useToast();
  const router = useRouter();

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

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullname: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!device?.type || !device?.device_token) return;

    const { email, password, fullname } = values;
    const response = await auth.register({
      email,
      password,
      fullname,
      type: device.type,
      device_token: device.device_token,
    });

    if (response) {
      saveUser(response as UserType);
      router.push("/workspace");
    } else {
      toast({
        variant: "destructive",
        title: "Đăng kí thất bại",
        description: "Có lỗi xảy ra, vui lòng thử lại",
      });
    }
  }
  return (
    <AuthWrap>
      <div className="flex justify-center pt-2 pb-2">
        <Image
          src="/images/logo-max-size.png"
          alt="Logo"
          width={150}
          height={70}
        />
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <InputWithLabel
            placeholder="Nhập tên đầy đủ của bạn"
            fieldTitle="Fullname"
            nameInSchema="fullname"
          />

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
              Đăng kí
            </Button>
          </div>
        </form>
      </Form>

      <div className="text-right mt-3 text-sm ">
        Đã có tài khoản?
        <Link className="text-[#615EF0] text-sm ml-2" href={"/login"}>
          đăng nhập
        </Link>
      </div>
    </AuthWrap>
  );
}

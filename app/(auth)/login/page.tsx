"use client";
import { ButtonLoading } from "@/components/ButtonLoading";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Banner from "../_components/Banner";
import { InputWithLabel } from "../_components/InputWithLabel";
import auth from "@/apiRequest/auth";
import useUserDetailStore, { UserType } from "@/stores/user-store";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getDevice } from "@/utils/getDevice";
import { DeviceType } from "@/types";
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
      router.push("/message");
    } else {
      toast({
        variant: "destructive",
        title: "Đăng nhập thất bại",
        description: "Email hoặc mật khẩu không chính xác",
      });
    }
  }
  return (
    <div className="flex justify-center bg-[#19181F]">
      <div className="flex-1 flex justify-center items-center">
        <div className="w-[400px] text-white">
          <div className="pt-10 pb-12">
            <h1 className="pb-3 font-extrabold text-3xl flex gap-3">
              Welcome back{" "}
              <Image src="/images/logo.svg" alt="Logo" width={38} height={38} />{" "}
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
                <ButtonLoading
                  title="Đăng nhập"
                  isLoading={false}
                  type="submit"
                  className="border border-white hover:bg-white hover:text-black"
                />
              </div>
            </form>
          </Form>
          <div className="text-right mt-3 text-xs ">
            Chưa có tài khoản?
            <button
              className="text-[#615EF0] text-sm ml-2"
              onClick={() => router.push("/register")}
            >
              đăng kí ngay
            </button>
          </div>
        </div>
      </div>
      <Banner />
    </div>
  );
}

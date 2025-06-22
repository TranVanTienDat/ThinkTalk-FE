import { Toaster } from "@/components/ui/toaster";
import { TanstackQueryIniter } from "@/context/query-client";
import type { Metadata } from "next";
import "./globals.css";
import ThemeRegistry from "./ThemeRegistry";

export const metadata: Metadata = {
  title: "Cam app",
  description: "hihi",
  icons: {
    icon: "/images/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="h-[100vh]">
        <TanstackQueryIniter>
          <ThemeRegistry options={{ key: "joy" }}>
            {children}
            <Toaster />
          </ThemeRegistry>
        </TanstackQueryIniter>
      </body>
    </html>
  );
}

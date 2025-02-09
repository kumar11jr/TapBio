"use client";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

function ChildLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  useEffect(() => {
    const isAuthToken = localStorage.getItem("tapbio-token");
    if (!isAuthToken) {
      router.replace("/");
    }
  }, []);

  return (
    <html lang="en">
      <body
        style={{ backgroundColor: "#dedede", height: "100vh" }}
        className={inter.className}>
        <main>{children}</main>
        <Toaster />
      </body>
    </html>
  );
}

export default ChildLayout;

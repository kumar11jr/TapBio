"use client";
import { AuthProvider } from "@/context/auth/authCTX";
import React, { useEffect, useState } from "react";
const inter = Inter({ subsets: ["latin"] });
import { Inter } from "next/font/google";
import { useRouter } from "next/navigation";

function ChildLayout({ children }: { children: React.ReactNode }) {
  const [authStatus, setAuthStatus] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const isAuthToken = localStorage.getItem("tapbio-token");
    if (isAuthToken) {
      setAuthStatus(true);
      router.replace("/profile");
    }
  }, []);

  return (
    <AuthProvider value={{ authStatus, setAuthStatus }}>
      <html lang="en">
        <body
          style={{ backgroundColor: "#dedede", height: "100vh" }}
          className={inter.className}>
          {children}
        </body>
      </html>
    </AuthProvider>
  );
}

export default ChildLayout;

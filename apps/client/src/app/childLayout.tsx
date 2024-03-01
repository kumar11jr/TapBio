"use client";
import { Inter } from "next/font/google";
import "./global.css";
import UserProvider from "@/context/user/useUserCTX";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuth from "@/context/auth/useAuth";

const inter = Inter({ subsets: ["latin"] });

function ChildLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("tapbio-token");
    if (token) {
      router.push("/profile");
    }
  }, []);

  return (
    <UserProvider>
      <html lang="en">
        <body className={inter.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
            storageKey="TapBio">
            {children}
          </ThemeProvider>
        </body>
      </html>
    </UserProvider>
  );
}

export default ChildLayout;

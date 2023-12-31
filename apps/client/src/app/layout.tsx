import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./global.css";
import UserProvider from "@/context/user/useUserCTX";
import { ThemeProvider } from "@/components/providers/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tap Bio",
  description: "Tab Bio is a bio link tool for creators.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <UserProvider>
      <html lang="en">
        <body className={inter.className}>
          <ThemeProvider 
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          storageKey="TapBio"
          >
            {children}
          </ThemeProvider>
          </body>
      </html>
    </UserProvider>
  );
}

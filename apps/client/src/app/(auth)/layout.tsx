import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sign up",
  description: "Sign up for a new account",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en">
      <body style={{ backgroundColor: "#dedede", height:"100vh" }} className={inter.className}>
        {children}
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import ChildLayout from "./childLayout";

export const metadata: Metadata = {
  title: "Profile",
  description: "Sign up for a new account",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return <ChildLayout>{children}</ChildLayout>;
}

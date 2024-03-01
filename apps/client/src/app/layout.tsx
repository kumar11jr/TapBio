import type { Metadata } from "next";
import "./global.css";
import ChildLayout from "./childLayout";

export const metadata: Metadata = {
  title: "Tap Bio",
  description: "Tab Bio is a bio link tool for creators.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return <ChildLayout>{children}</ChildLayout>;
}

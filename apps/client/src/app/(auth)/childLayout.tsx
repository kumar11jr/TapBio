import React from "react";
const inter = Inter({ subsets: ["latin"] });
import { Inter } from "next/font/google";


function ChildLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        style={{ backgroundColor: "#dedede", height: "100vh" }}
        className={inter.className}>
        {children}
      </body>
    </html>
  );
}

export default ChildLayout;

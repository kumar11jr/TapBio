import { Inter } from "next/font/google";
import "./global.css";
import { ThemeProvider } from "@/components/providers/theme-provider";

const inter = Inter({ subsets: ["latin"] });

function ChildLayout({ children }: { children: React.ReactNode }) {
  return (
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
  );
}

export default ChildLayout;

import type { Metadata } from "next";
import { Footer } from "./_components/footer";

import "./globals.css";
import { ScrollProgress } from "@/shared/components/ui/scroll-progress";

export const metadata: Metadata = {
  title: "1-to-1",
  description: "Private 1-to-1 Chat App",
};

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <ScrollProgress className="top-1" />
        {children}
        <Footer />
      </body>
    </html>
  );
}

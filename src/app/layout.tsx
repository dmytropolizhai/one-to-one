import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "1-to-1",
  description: "Private 1-to-1 Chat App",
};

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        {children}
      </body>
    </html>
  );
}

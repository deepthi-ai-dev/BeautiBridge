import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BeautiBridge",
  description: "AI-powered beauty service marketplace.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

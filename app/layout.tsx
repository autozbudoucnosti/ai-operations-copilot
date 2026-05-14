import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Firemní AI asistent pro provoz a administrativu",
  description: "Demo AI automatizace pro firemní provoz a administrativu."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="cs">
      <body>{children}</body>
    </html>
  );
}

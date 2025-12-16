import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ayu | VibeCoding",
  description: "Personal portfolio and blog of Ayu - Frontend Engineer crafting digital experiences where code meets intuition",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}

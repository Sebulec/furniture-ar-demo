import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SpaceCheck.app | AR for Furniture Retailers",
  description: "Turn 2D product photos into 3D AR models instantly. Boost sales and reduce returns with SpaceCheck's AI-powered AR visualization platform.",
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
import type { Metadata } from "next";
import { ReactNode } from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import LayoutContent from "../components/LayoutContent";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pushpalatha Silks | Authentic Dharmavaram & Kanchipuram Sarees",
  description: "Shop premium authentic silk sarees from Dharmavaram and Kanchipuram at Pushpalatha Silks. Best quality, trusted local shop, and delivery available.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen flex flex-col antialiased bg-black text-white`}>
        <CartProvider>
          <LayoutContent>
            {children}
          </LayoutContent>
        </CartProvider>
      </body>
    </html>
  );
}

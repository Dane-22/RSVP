import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const jost = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-jost",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mariane Joy & Dominic | Wedding Invitation",
  description:
    "Join Mariane Joy Rillera and Dominic Chica as they celebrate their wedding on December 19, 2026 at Santol Tree Park, La Union.",
  openGraph: {
    title: "Mariane Joy & Dominic — Wedding Invitation",
    description: "December 19, 2026 · Santol Tree Park, La Union",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#610B0C",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jost.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}

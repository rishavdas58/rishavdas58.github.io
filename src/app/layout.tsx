import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Rishav Das | Portfolio",
  description: "Rishav Das - Project Manager, Program Operations, and Stakeholder Engagement Specialist portfolio.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable}`}
      style={{ colorScheme: "light" }}
    >
      <body className="antialiased">{children}</body>
    </html>
  );
}

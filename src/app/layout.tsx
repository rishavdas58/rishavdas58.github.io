import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Rishav Das | Project Manager & Social Impact Leader",
  description:
    "Rishav Das — TEDx Speaker, Biotechnologist, Founder of Youth Activism Nepal. Project Manager and Stakeholder Engagement Specialist.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={outfit.variable}
      style={{ colorScheme: "dark", background: "#0d0d0d" }}
    >
      <body style={{ background: "#0d0d0d", color: "#f0ece4" }}>
        {children}
      </body>
    </html>
  );
}

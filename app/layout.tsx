import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

export const metadata: Metadata = {
  title: "Raga Infra – AI Powered Smart Township",
  description:
    "300-acre AI-powered Smart Township Management Platform near Mahindra SEZ. Solar energy, smart security, elder care, IoT sensors and centralized AI Command Center.",
  keywords: "smart township, AI, solar, IoT, Raga Infra, Mahindra SEZ",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-brand-navy antialiased">
        <ClerkProvider>{children}</ClerkProvider>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "OCTOPILOT — Revenue Signal Intelligence",
  description: "AI-powered social listening & lead generation platform. Find B2B buyers the moment they signal intent.",
  openGraph: {
    type: "website",
    url: "https://octopilot.co",
    siteName: "OCTOPILOT",
    title: "OCTOPILOT — Revenue Signal Intelligence",
    description: "AI-powered social listening & lead generation platform.",
  },
  twitter: {
    card: "summary_large_image",
    site: "@octopilot",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

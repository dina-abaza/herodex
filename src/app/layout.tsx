import type { Metadata, Viewport } from "next";
import { Suspense } from "react";
import { Cairo, Tajawal } from "next/font/google";
import "./globals.css";
import { Providers } from "@/providers";

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const tajawal = Tajawal({
  variable: "--font-tajawal",
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "جمالك | وجهتك للجمال",
  description: "متجر جمالك لأفضل منتجات التجميل والعناية بالبشرة",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "جمالك",
  },
  icons: {
    icon: "/logo/logo.jpeg",
    apple: "/logo/logo.jpeg",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#117a5c",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${cairo.variable} ${tajawal.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-cairo text-[115%] leading-[1.6]">
        <Suspense fallback={null}>
          <Providers>{children}</Providers>
        </Suspense>
      </body>
    </html>
  );
}

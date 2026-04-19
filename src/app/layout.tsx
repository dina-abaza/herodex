import type { Metadata, Viewport } from "next";
import { Suspense } from "react";
import { Cairo, Tajawal } from "next/font/google";
import "./globals.css";
import { Providers } from "@/providers";
import {WhatsAppFloat} from "@/components/home/WhatsAppFloat";

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
  weight: ["400", "700", "900"],
});

const tajawal = Tajawal({
  variable: "--font-tajawal",
  subsets: ["arabic", "latin"],
  weight: ["400", "700", "900"],
});

// التعديل هنا فقط في الـ Metadata لتحسين الـ SEO
export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://herodex.com'),
  title: "Herodex Pharma | أفضل علاج لتساقط الشعر الشديد وفراغات الشعر",
  description: "اكتشفي مجموعة FortaHair من Herodex Pharma. منتجات طبية 100% لعلاج تساقط الشعر للنساء طبيعي، تكثيف الشعر، وعلاج الفراغات. أفضل منتج لمنع تساقط الشعر في مصر بتركيبة هندية.",
  keywords: [
    "علاج تساقط الشعر", "أفضل علاج لتساقط الشعر الشديد", "Herodex Pharma", "FortaHair", 
    "منتج يمنع تساقط الشعر ويكثفه", "حل نهائي لتساقط الشعر", "علاج الفراغات في الشعر", 
    "سعر علاج تساقط الشعر", "شراء منتج تكثيف الشعر", "منتجات طبية 100%", "كورس علاج تساقط الشعر"
  ],
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Herodex",
  },
  icons: {
    icon: "/logo/logo.jpeg",
    apple: "/logo/logo.jpeg",
  },
  openGraph: {
    title: "Herodex Pharma | حل نهائي لتساقط الشعر وتكثيفه",
    description: "مجموعة فورتا هير (FortaHair) لعلاج فراغات الشعر وتساقطه. منتجات طبيعية 100% لنتائج سريعة.",
    images: ["/logo/logo.jpeg"],
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
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
          <Providers>{children}
            <WhatsAppFloat/>
          </Providers>
        </Suspense>
      </body>
    </html>
  );
}
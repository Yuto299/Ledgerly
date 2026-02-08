import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ErrorBoundary from "@/components/ErrorBoundary";
import { ToastProvider } from "@/components/providers/ToastProvider";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

const baseUrl = process.env.NEXTAUTH_URL || "https://ledgerly.com";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Ledgerly | フリーランス向け会計管理システム",
    template: "%s | Ledgerly",
  },
  description:
    "請求書作成から経費管理、売上分析まで。フリーランス・個人事業主のための会計管理システム。無料プランで今すぐ始められます。",
  keywords: [
    "フリーランス",
    "会計管理",
    "請求書作成",
    "経費管理",
    "個人事業主",
    "売上管理",
    "案件管理",
    "顧客管理",
    "入金管理",
    "副業",
  ],
  authors: [{ name: "Ledgerly" }],
  creator: "Ledgerly",
  publisher: "Ledgerly",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    type: "website",
    locale: "ja_JP",
    url: baseUrl,
    title: "Ledgerly | フリーランス向け会計管理システム",
    description:
      "請求書作成から経費管理、売上分析まで。フリーランス・個人事業主のための会計管理システム。",
    siteName: "Ledgerly",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Ledgerly - フリーランス向け会計管理システム",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ledgerly | フリーランス向け会計管理システム",
    description:
      "請求書作成から経費管理、売上分析まで。フリーランス・個人事業主のための会計管理システム。",
    images: ["/og-image.png"],
    creator: "@ledgerly",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // google: "your-google-site-verification-code",
    // yandex: "your-yandex-verification-code",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        />
      </head>
      <body className={inter.className}>
        {/* JSON-LD 構造化データ */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "Ledgerly",
              applicationCategory: "BusinessApplication",
              operatingSystem: "Web",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "JPY",
              },
              description:
                "請求書作成から経費管理、売上分析まで。フリーランス・個人事業主のための会計管理システム。",
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.8",
                ratingCount: "150",
              },
            }),
          }}
        />
        <ErrorBoundary>
          <ToastProvider>
            {children}
            <Toaster position="top-right" richColors />
          </ToastProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}

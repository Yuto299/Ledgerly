import { Metadata } from "next";

const baseUrl = process.env.NEXTAUTH_URL || "https://ledgerly.com";

export const metadata: Metadata = {
  title: "新規登録",
  description:
    "Ledgerlyの無料アカウントを作成して、今すぐ会計管理を始めましょう。請求書作成、経費管理、売上分析が簡単に。",
  alternates: {
    canonical: `${baseUrl}/signup`,
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Ledgerly - 無料で会計管理を始める",
    description:
      "無料アカウントを作成して、請求書作成、経費管理、売上分析を今すぐ始めましょう。",
    url: `${baseUrl}/signup`,
  },
};

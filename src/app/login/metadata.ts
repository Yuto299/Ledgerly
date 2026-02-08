import { Metadata } from "next";

const baseUrl = process.env.NEXTAUTH_URL || "https://ledgerly.com";

export const metadata: Metadata = {
  title: "ログイン",
  description: "Ledgerlyにログインして会計管理を始めましょう。",
  alternates: {
    canonical: `${baseUrl}/login`,
  },
  robots: {
    index: true,
    follow: true,
  },
};

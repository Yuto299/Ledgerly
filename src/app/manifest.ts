import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Ledgerly - フリーランス向け会計管理システム",
    short_name: "Ledgerly",
    description:
      "請求書作成から経費管理、売上分析まで。フリーランス・個人事業主のための会計管理システム。",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#475569",
    icons: [
      {
        src: "/favicon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}

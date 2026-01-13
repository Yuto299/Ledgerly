"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navigation = [
  { name: "ダッシュボード", href: "/dashboard", icon: "dashboard" },
  { name: "顧客", href: "/customers", icon: "group" },
  { name: "案件", href: "/projects", icon: "folder" },
  { name: "請求書", href: "/invoices", icon: "description" },
  { name: "経費", href: "/expenses", icon: "credit_card" },
  { name: "経費カテゴリ", href: "/expense-categories", icon: "label" },
  { name: "レポート", href: "/reports", icon: "trending_up" },
  { name: "設定", href: "/settings", icon: "settings" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      {/* モバイルメニューボタン */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-gray-900 text-white"
        aria-label="メニュー"
      >
        <span className="material-symbols-outlined text-[24px]">
          {isMobileMenuOpen ? "close" : "menu"}
        </span>
      </button>

      {/* オーバーレイ */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* サイドバー */}
      <div
        className={`
          fixed lg:static inset-y-0 left-0 z-40
          w-64 bg-gray-900 text-white transform transition-transform duration-300
          ${
            isMobileMenuOpen
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
          }
        `}
      >
        <div className="p-6">
          <h1 className="text-2xl font-bold">Ledgerly</h1>
        </div>
        <nav className="mt-6">
          {navigation.map((item) => {
            const isActive =
              pathname === item.href || pathname?.startsWith(item.href + "/");
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center px-6 py-3 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-gray-800 text-white border-l-4 border-primary-500"
                    : "text-gray-300 hover:bg-gray-800 hover:text-white"
                }`}
              >
                <span className="material-symbols-outlined mr-3 text-[20px]">
                  {item.icon}
                </span>
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>
    </>
  );
}

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
        className="lg:hidden fixed top-3 left-3 z-50 p-2.5 rounded-lg bg-gray-900 text-white shadow-lg hover:bg-gray-800 transition-colors"
        aria-label="メニュー"
        aria-expanded={isMobileMenuOpen}
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
          w-64 bg-gray-900 text-white transform transition-transform duration-300 ease-in-out
          ${
            isMobileMenuOpen
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
          }
        `}
      >
        <div className="flex items-center gap-2 p-4 sm:p-6">
          <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-500/90 text-white">
            <span className="material-symbols-outlined text-[20px]">
              account_balance_wallet
            </span>
          </span>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
            Ledgerly
          </h1>
        </div>
        <nav className="mt-2 sm:mt-4 px-3 space-y-1">
          {navigation.map((item) => {
            const isActive =
              pathname === item.href || pathname?.startsWith(item.href + "/");
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                aria-current={isActive ? "page" : undefined}
                className={`flex items-center rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-gray-800 text-white"
                    : "text-gray-400 hover:bg-gray-800/60 hover:text-white"
                }`}
              >
                <span
                  className={`material-symbols-outlined mr-3 text-[20px] ${
                    isActive ? "text-blue-400" : "text-gray-500"
                  }`}
                >
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

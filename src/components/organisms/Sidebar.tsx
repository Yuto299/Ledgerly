"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Logo from "@/components/atoms/Logo";

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
        className="lg:hidden fixed top-3 left-3 z-50 p-2.5 rounded-lg bg-white text-gray-700 border border-gray-200 shadow-sm hover:bg-gray-50 transition-colors"
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
          className="lg:hidden fixed inset-0 bg-black bg-opacity-40 z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* サイドバー */}
      <div
        className={`
          fixed lg:static inset-y-0 left-0 z-40
          w-[220px] bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out
          ${
            isMobileMenuOpen
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
          }
        `}
      >
        <div className="flex items-center px-5 py-5">
          <Logo size="md" variant="dark" />
        </div>
        <nav className="mt-1 px-3 space-y-0.5">
          {navigation.map((item) => {
            const isActive =
              pathname === item.href || pathname?.startsWith(item.href + "/");
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                aria-current={isActive ? "page" : undefined}
                className={`flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-blue-50 text-blue-700"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                <span
                  className={`material-symbols-outlined mr-3 text-[20px] ${
                    isActive ? "text-blue-600" : "text-gray-400"
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

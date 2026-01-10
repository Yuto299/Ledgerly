"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navigation = [
  { name: "ダッシュボード", href: "/dashboard", icon: "📊" },
  { name: "顧客", href: "/customers", icon: "👥" },
  { name: "案件", href: "/projects", icon: "📁" },
  { name: "請求書", href: "/invoices", icon: "📄" },
  { name: "経費", href: "/expenses", icon: "💳" },
  { name: "レポート", href: "/reports", icon: "📈" },
  { name: "設定", href: "/settings", icon: "⚙️" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 bg-gray-900 text-white">
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
              className={`flex items-center px-6 py-3 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-gray-800 text-white border-l-4 border-primary-500"
                  : "text-gray-300 hover:bg-gray-800 hover:text-white"
              }`}
            >
              <span className="mr-3 text-lg">{item.icon}</span>
              {item.name}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

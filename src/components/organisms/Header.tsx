"use client";

import { signOut, useSession } from "next-auth/react";

export default function Header() {
  const { data: session } = useSession();

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="flex items-center justify-between px-4 md:px-6 py-3 md:py-4">
        <div className="lg:hidden w-12">
          {/* スペーサー（モバイルメニューボタンの分） */}
        </div>
        <div className="flex-1">{/* 検索バーなど（将来追加） */}</div>
        <div className="flex items-center gap-2 md:gap-3 lg:gap-6">
          {session?.user && (
            <>
              <span className="hidden sm:inline text-sm md:text-base text-gray-800 font-medium truncate max-w-[120px] md:max-w-none">
                {session.user.name}さん、ようこそ
              </span>
              <button
                onClick={() => signOut({ callbackUrl: "/login" })}
                className="text-xs sm:text-sm text-gray-600 hover:text-gray-900 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg border border-gray-300 hover:bg-gray-50 whitespace-nowrap transition-colors"
              >
                ログアウト
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

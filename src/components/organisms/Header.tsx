"use client";

import { signOut, useSession } from "next-auth/react";

export default function Header() {
  const { data: session } = useSession();

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="flex items-center justify-between px-6 py-4">
        <div>{/* 検索バーなど（将来追加） */}</div>
        <div className="flex items-center space-x-4">
          {session?.user && (
            <>
              <span className="text-sm text-gray-700">
                {session.user.email}
              </span>
              <button
                onClick={() => signOut({ callbackUrl: "/login" })}
                className="text-sm text-gray-700 hover:text-gray-900 px-3 py-2 rounded hover:bg-gray-100"
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

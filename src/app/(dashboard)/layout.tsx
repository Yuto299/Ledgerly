"use client";

import { SessionProvider } from "next-auth/react";
import QueryProvider from "@/lib/providers/QueryProvider";
import Sidebar from "@/components/organisms/Sidebar";
import Header from "@/components/organisms/Header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <QueryProvider>
        <div className="flex h-screen bg-gray-50 overflow-hidden">
          <Sidebar />
          <div className="flex-1 flex flex-col overflow-hidden w-0 min-w-0">
            <Header />
            <main className="flex-1 overflow-y-auto p-3 sm:p-4 md:p-6">
              {children}
            </main>
          </div>
        </div>
      </QueryProvider>
    </SessionProvider>
  );
}

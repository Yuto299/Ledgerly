"use client";

import { useState } from "react";
import { format } from "date-fns";
import { useDashboardData } from "@/features/reports/hooks/useReports";
import { useAlerts } from "@/features/alerts/hooks/useAlerts";
import { formatCurrency } from "@/lib/money/formatter";
import { formatDate } from "@/lib/utils";
import Card from "@/components/atoms/Card";
import Badge from "@/components/atoms/Badge";
import Button from "@/components/atoms/Button";
import Link from "next/link";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const INVOICE_STATUS_LABELS: Record<string, string> = {
  DRAFT: "下書き",
  SENT: "請求済",
  PAID: "入金済",
};

const INVOICE_STATUS_COLORS: Record<
  string,
  "default" | "info" | "danger" | "success" | "warning"
> = {
  DRAFT: "default",
  SENT: "warning",
  PAID: "success",
};

export default function DashboardPage() {
  const [selectedMonth, setSelectedMonth] = useState(
    format(new Date(), "yyyy-MM")
  );
  const { data, isLoading } = useDashboardData(selectedMonth);
  const { data: alertsData, isLoading: alertsLoading } = useAlerts();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">読み込み中...</div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">データがありません</div>
      </div>
    );
  }

  const {
    summary,
    trend,
    expenseBreakdown,
    projectSales,
    recentInvoices,
    recentExpenses,
  } = data;

  return (
    <div className="px-4 py-6 md:px-6 md:py-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight leading-tight">
          ダッシュボード
        </h1>
        <input
          type="month"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          className="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-lg text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* アラートセクション */}
      {alertsData &&
        (alertsData.summary.overdueCount > 0 ||
          alertsData.summary.urgentCount > 0) && (
          <div className="mb-8 space-y-4">
            {/* 期限切れアラート */}
            {alertsData.summary.overdueCount > 0 && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">⚠️</span>
                    <div>
                      <h3 className="text-lg font-semibold text-red-900 leading-tight mb-1">
                        支払期限切れの請求書
                      </h3>
                      <p className="text-sm text-red-700 leading-relaxed">
                        {alertsData.summary.overdueCount}件 (
                        {formatCurrency(alertsData.summary.overdueAmount)})
                      </p>
                    </div>
                  </div>
                  <Link href="/invoices">
                    <Button variant="danger" size="sm">
                      確認する
                    </Button>
                  </Link>
                </div>
                <div className="space-y-2">
                  {alertsData.overdue.slice(0, 3).map((invoice) => (
                    <Link
                      key={invoice.id}
                      href={`/invoices/${invoice.id}`}
                      className="block p-3 bg-white rounded border border-red-200 hover:border-red-300 transition-colors"
                    >
                      <div className="flex justify-between items-center gap-4">
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-gray-900 leading-snug mb-1">
                            {invoice.customer.name}
                            {invoice.project && ` - ${invoice.project.name}`}
                          </p>
                          <p className="text-sm text-gray-600 leading-relaxed">
                            期限: {formatDate(invoice.dueAt)}
                          </p>
                        </div>
                        <p className="font-bold text-red-600 flex-shrink-0 leading-tight">
                          {formatCurrency(
                            invoice.totalAmount - invoice.paidAmount
                          )}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* 期限間近アラート（3日以内） */}
            {alertsData.summary.urgentCount > 0 && (
              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">⏰</span>
                    <div>
                      <h3 className="text-lg font-semibold text-yellow-900 leading-tight mb-1">
                        支払期限間近（3日以内）
                      </h3>
                      <p className="text-sm text-yellow-700 leading-relaxed">
                        {alertsData.summary.urgentCount}件
                      </p>
                    </div>
                  </div>
                  <Link href="/invoices">
                    <Button variant="outline" size="sm">
                      確認する
                    </Button>
                  </Link>
                </div>
                <div className="space-y-2">
                  {alertsData.urgent.slice(0, 3).map((invoice) => (
                    <Link
                      key={invoice.id}
                      href={`/invoices/${invoice.id}`}
                      className="block p-3 bg-white rounded border border-yellow-200 hover:border-yellow-300 transition-colors"
                    >
                      <div className="flex justify-between items-center gap-4">
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-gray-900 leading-snug mb-1">
                            {invoice.customer.name}
                            {invoice.project && ` - ${invoice.project.name}`}
                          </p>
                          <p className="text-sm text-gray-600 leading-relaxed">
                            期限: {formatDate(invoice.dueAt)}
                          </p>
                        </div>
                        <p className="font-bold text-yellow-600 flex-shrink-0 leading-tight">
                          {formatCurrency(
                            invoice.totalAmount - invoice.paidAmount
                          )}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

      {/* サマリカード */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
        <Card className="hover:shadow-md transition-shadow">
          <h3 className="text-xs sm:text-sm font-medium text-gray-600 mb-3 leading-tight">
            今月の売上
          </h3>
          <p className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 leading-tight tracking-tight">
            {formatCurrency(summary.revenue)}
          </p>
          <p className="text-sm text-gray-500 leading-relaxed">
            請求額: {formatCurrency(summary.billedAmount)}
          </p>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <h3 className="text-xs sm:text-sm font-medium text-gray-600 mb-3 leading-tight">
            今月の経費
          </h3>
          <p className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight tracking-tight">
            {formatCurrency(summary.expenses)}
          </p>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <h3 className="text-xs sm:text-sm font-medium text-gray-600 mb-3 leading-tight">
            今月の利益
          </h3>
          <p
            className={`text-2xl sm:text-3xl font-bold mb-2 leading-tight tracking-tight ${
              summary.profit >= 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            {formatCurrency(summary.profit)}
          </p>
          <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
            売上 - 経費
          </p>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <h3 className="text-xs sm:text-sm font-medium text-gray-600 mb-3 leading-tight">
            未回収金額
          </h3>
          <p className="text-2xl sm:text-3xl font-bold text-orange-600 mb-2 leading-tight tracking-tight">
            {formatCurrency(summary.unpaidAmount)}
          </p>
          <p className="text-sm text-gray-500 leading-relaxed">
            請求済み未入金
          </p>
        </Card>
      </div>

      {/* グラフエリア */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* 月別推移グラフ */}
        <Card className="shadow-sm hover:shadow-md transition-shadow">
          <h2 className="text-base sm:text-lg font-semibold mb-6 text-gray-800 leading-tight tracking-tight">
            月別推移
          </h2>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart
              data={trend}
              margin={{ top: 5, right: 20, left: -20, bottom: 5 }}
            >
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#60a5fa" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#60a5fa" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#c084fc" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#c084fc" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#34d399" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#34d399" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#e5e7eb"
                strokeOpacity={0.5}
              />
              <XAxis
                dataKey="month"
                tick={{ fontSize: 11, fill: "#6b7280" }}
                axisLine={{ stroke: "#e5e7eb" }}
                tickLine={{ stroke: "#e5e7eb" }}
              />
              <YAxis
                tickFormatter={(value) => `¥${(value / 1000).toFixed(0)}k`}
                tick={{ fontSize: 11, fill: "#6b7280" }}
                width={60}
                axisLine={{ stroke: "#e5e7eb" }}
                tickLine={{ stroke: "#e5e7eb" }}
              />
              <Tooltip
                formatter={(value: number) => formatCurrency(value)}
                contentStyle={{
                  backgroundColor: "rgba(255, 255, 255, 0.95)",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                }}
              />
              <Legend wrapperStyle={{ fontSize: "13px" }} iconType="circle" />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#60a5fa"
                strokeWidth={3}
                name="売上"
                dot={{ r: 4, fill: "#60a5fa", strokeWidth: 2, stroke: "#fff" }}
                activeDot={{ r: 6 }}
                fill="url(#colorRevenue)"
              />
              <Line
                type="monotone"
                dataKey="expenses"
                stroke="#c084fc"
                strokeWidth={3}
                name="経費"
                dot={{ r: 4, fill: "#c084fc", strokeWidth: 2, stroke: "#fff" }}
                activeDot={{ r: 6 }}
                fill="url(#colorExpenses)"
              />
              <Line
                type="monotone"
                dataKey="profit"
                stroke="#34d399"
                strokeWidth={3}
                name="利益"
                dot={{ r: 4, fill: "#34d399", strokeWidth: 2, stroke: "#fff" }}
                activeDot={{ r: 6 }}
                fill="url(#colorProfit)"
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* 経費カテゴリ別円グラフ */}
        <Card className="shadow-sm hover:shadow-md transition-shadow">
          <h2 className="text-base sm:text-lg font-semibold mb-6 text-gray-800 leading-tight tracking-tight">
            経費カテゴリ別内訳
          </h2>
          {expenseBreakdown.length > 0 ? (
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={expenseBreakdown}
                  dataKey="amount"
                  nameKey="categoryName"
                  cx="50%"
                  cy="50%"
                  outerRadius={85}
                  innerRadius={50}
                  paddingAngle={3}
                  label={(entry) => {
                    const percent = (
                      (entry.amount /
                        expenseBreakdown.reduce(
                          (sum, e) => sum + e.amount,
                          0
                        )) *
                      100
                    ).toFixed(0);
                    return `${percent}%`;
                  }}
                  labelLine={false}
                >
                  {expenseBreakdown.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.categoryColor}
                      opacity={0.85}
                    />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: number) => formatCurrency(value)}
                  contentStyle={{
                    backgroundColor: "rgba(255, 255, 255, 0.95)",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[280px] flex items-center justify-center text-gray-500">
              データがありません
            </div>
          )}
        </Card>
      </div>

      {/* 案件別売上ランキング */}
      <Card className="mb-8 shadow-sm hover:shadow-md transition-shadow">
        <h2 className="text-base sm:text-lg font-semibold mb-6 text-gray-800 leading-tight tracking-tight">
          案件別売上ランキング
        </h2>
        {projectSales.length > 0 ? (
          <div className="w-full" style={{ height: 500 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={projectSales.slice(0, 5)}
                margin={{ top: 60, right: 30, left: 10, bottom: 40 }}
              >
                <defs>
                  <linearGradient
                    id="gradientBilled"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="#60a5fa" stopOpacity={0.9} />
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.7} />
                  </linearGradient>
                  <linearGradient id="gradientPaid" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#34d399" stopOpacity={0.9} />
                    <stop offset="100%" stopColor="#10b981" stopOpacity={0.7} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#e5e7eb"
                  strokeOpacity={0.5}
                />
                <XAxis
                  dataKey="projectName"
                  angle={0}
                  textAnchor="middle"
                  interval={0}
                  tick={{ fontSize: 12, fill: "#6b7280", dy: 10 }}
                  style={{ fontWeight: 500 }}
                  axisLine={{ stroke: "#e5e7eb" }}
                  tickLine={{ stroke: "#e5e7eb" }}
                  padding={{ left: 10, right: 10 }}
                />
                <YAxis
                  tickFormatter={(value) => `¥${(value / 1000).toFixed(0)}k`}
                  tick={{ fontSize: 13, fill: "#6b7280" }}
                  width={70}
                  domain={[0, (dataMax: number) => Math.ceil(dataMax * 1.2)]}
                  axisLine={{ stroke: "#e5e7eb" }}
                  tickLine={{ stroke: "#e5e7eb" }}
                />
                <Tooltip
                  formatter={(value: number) => formatCurrency(value)}
                  labelStyle={{ fontSize: 14, fontWeight: "bold" }}
                  contentStyle={{
                    fontSize: 13,
                    backgroundColor: "rgba(255, 255, 255, 0.95)",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                  }}
                />
                <Legend
                  verticalAlign="top"
                  align="right"
                  wrapperStyle={{ fontSize: "13px", marginTop: "-10px" }}
                  iconType="circle"
                  iconSize={10}
                />
                <Bar
                  dataKey="totalBilled"
                  fill="url(#gradientBilled)"
                  name="請求額"
                  radius={[8, 8, 0, 0]}
                  barSize={55}
                />
                <Bar
                  dataKey="totalPaid"
                  fill="url(#gradientPaid)"
                  name="入金額"
                  radius={[8, 8, 0, 0]}
                  barSize={55}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="h-[400px] flex items-center justify-center text-gray-500">
            データがありません
          </div>
        )}
      </Card>

      {/* 最近のアクティビティ */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 最近の請求書 */}
        <Card className="hover:shadow-md transition-shadow">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-base sm:text-lg font-semibold text-gray-800 leading-tight tracking-tight">
              最近の請求書
            </h2>
            <Link href="/invoices">
              <Button variant="ghost" size="sm">
                すべて表示
              </Button>
            </Link>
          </div>
          {recentInvoices.length > 0 ? (
            <div className="space-y-3">
              {recentInvoices.map(
                (invoice: {
                  id: string;
                  customer: { name: string };
                  project: { name: string };
                  issuedAt: Date;
                  totalAmount: number;
                  status: string;
                }) => (
                  <Link
                    key={invoice.id}
                    href={`/invoices/${invoice.id}`}
                    className="block p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
                  >
                    <div className="flex justify-between items-start gap-4">
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900 leading-snug mb-1">
                          {invoice.customer.name}
                        </p>
                        <p className="text-sm text-gray-500 leading-relaxed mb-1">
                          {invoice.project.name}
                        </p>
                        <p className="text-xs text-gray-400 leading-relaxed">
                          {formatDate(invoice.issuedAt)}
                        </p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="font-semibold text-gray-900 leading-tight mb-1">
                          {formatCurrency(invoice.totalAmount)}
                        </p>
                        <Badge variant={INVOICE_STATUS_COLORS[invoice.status]}>
                          {INVOICE_STATUS_LABELS[invoice.status]}
                        </Badge>
                      </div>
                    </div>
                  </Link>
                )
              )}
            </div>
          ) : (
            <p className="text-gray-500 leading-relaxed">データがありません</p>
          )}
        </Card>

        {/* 最近の経費 */}
        <Card className="hover:shadow-md transition-shadow">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-base sm:text-lg font-semibold text-gray-800 leading-tight tracking-tight">
              最近の経費
            </h2>
            <Link href="/expenses">
              <Button variant="ghost" size="sm">
                すべて表示
              </Button>
            </Link>
          </div>
          {recentExpenses.length > 0 ? (
            <div className="space-y-3">
              {recentExpenses.map(
                (expense: {
                  id: string;
                  description: string;
                  date: Date;
                  amount: number;
                  category: { name: string; color: string } | null;
                }) => (
                  <Link
                    key={expense.id}
                    href={`/expenses/${expense.id}`}
                    className="block p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
                  >
                    <div className="flex justify-between items-start gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          {expense.category && (
                            <div
                              className="w-3 h-3 rounded-full flex-shrink-0"
                              style={{
                                backgroundColor: expense.category.color,
                              }}
                            />
                          )}
                          <p className="font-medium text-gray-900 leading-snug">
                            {expense.description}
                          </p>
                        </div>
                        <p className="text-sm text-gray-500 leading-relaxed mb-1">
                          {expense.category?.name || "未分類"}
                        </p>
                        <p className="text-xs text-gray-400 leading-relaxed">
                          {formatDate(expense.date)}
                        </p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="font-semibold text-gray-900 leading-tight">
                          {formatCurrency(expense.amount)}
                        </p>
                      </div>
                    </div>
                  </Link>
                )
              )}
            </div>
          ) : (
            <p className="text-gray-500 leading-relaxed">データがありません</p>
          )}
        </Card>
      </div>
    </div>
  );
}

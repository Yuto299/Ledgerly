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
import StatCard from "@/components/molecules/StatCard";
import Skeleton from "@/components/atoms/Skeleton";
import Link from "next/link";
import {
  AreaChart,
  Area,
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
import {
  CHART_COLORS,
  gridProps,
  xAxisProps,
  yAxisProps,
  tooltipContentStyle,
  tooltipLabelStyle,
  tooltipCursor,
  legendProps,
  formatAxisCurrency,
} from "@/lib/charts/theme";

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
    format(new Date(), "yyyy-MM"),
  );
  const { data, isLoading } = useDashboardData(selectedMonth);
  const { data: alertsData, isLoading: alertsLoading } = useAlerts();

  if (isLoading) {
    return <DashboardSkeleton />;
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

  // 前月比（%）を算出。trend から selectedMonth とその前月を探して比較する。
  // selectedMonth が trend の範囲外、または前月が 0/欠損なら null（バッジ非表示）。
  const pctChange = (key: "revenue" | "expenses" | "profit"): number | null => {
    const curIdx = trend.findIndex((t) => t.month === selectedMonth);
    if (curIdx < 1) return null; // 見つからない or 前月が範囲外
    const cur = trend[curIdx][key];
    const prev = trend[curIdx - 1][key];
    if (prev === 0) return null;
    return ((cur - prev) / Math.abs(prev)) * 100;
  };

  return (
    <div className="px-4 py-6 md:px-6 md:py-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h1 className="text-xl font-bold text-gray-900 tracking-tight leading-tight">
          ダッシュボード
        </h1>
        <input
          type="month"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          className="w-full sm:w-auto px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm sm:text-base shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* アラートセクション */}
      {alertsData &&
        (alertsData.summary.overdueCount > 0 ||
          alertsData.summary.urgentCount > 0) && (
          <div className="mb-8 space-y-4">
            {/* 期限切れアラート */}
            {alertsData.summary.overdueCount > 0 && (
              <div className="bg-red-50 border border-red-200 border-l-4 border-l-red-500 p-4 rounded-xl">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2.5">
                    <span className="material-symbols-outlined text-red-500 text-[24px]">
                      error
                    </span>
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
                            invoice.totalAmount - invoice.paidAmount,
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
              <div className="bg-yellow-50 border border-yellow-200 border-l-4 border-l-yellow-500 p-4 rounded-xl">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2.5">
                    <span className="material-symbols-outlined text-yellow-500 text-[24px]">
                      schedule
                    </span>
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
                            invoice.totalAmount - invoice.paidAmount,
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 mb-8">
        <StatCard
          label="今月の売上"
          value={formatCurrency(summary.revenue)}
          icon="payments"
          tone="blue"
          change={pctChange("revenue")}
        />
        <StatCard
          label="今月の経費"
          value={formatCurrency(summary.expenses)}
          icon="receipt_long"
          tone="purple"
          change={pctChange("expenses")}
          higherIsBetter={false}
        />
        <StatCard
          label="今月の利益"
          value={formatCurrency(summary.profit)}
          icon="savings"
          tone="green"
          change={pctChange("profit")}
          valueClassName={summary.profit >= 0 ? "text-green-600" : "text-red-600"}
          hint="売上 - 経費"
        />
        <StatCard
          label="未回収金額"
          value={formatCurrency(summary.unpaidAmount)}
          icon="hourglass_top"
          tone="orange"
          valueClassName="text-orange-600"
          hint="請求済み未入金"
        />
      </div>

      {/* グラフエリア */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-8">
        {/* 月別推移グラフ */}
        <Card className="transition-shadow hover:shadow-md">
          <h2 className="text-base font-semibold mb-5 text-gray-900 leading-tight tracking-tight">
            月別推移
          </h2>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart
              data={trend}
              margin={{ top: 8, right: 12, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={CHART_COLORS.revenue} stopOpacity={0.18} />
                  <stop offset="95%" stopColor={CHART_COLORS.revenue} stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={CHART_COLORS.profit} stopOpacity={0.18} />
                  <stop offset="95%" stopColor={CHART_COLORS.profit} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid {...gridProps} />
              <XAxis dataKey="month" {...xAxisProps} />
              <YAxis tickFormatter={formatAxisCurrency} {...yAxisProps} />
              <Tooltip
                formatter={(value: number) => formatCurrency(value)}
                contentStyle={tooltipContentStyle}
                labelStyle={tooltipLabelStyle}
                cursor={tooltipCursor}
              />
              <Legend {...legendProps} />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke={CHART_COLORS.revenue}
                strokeWidth={2.5}
                name="売上"
                fill="url(#colorRevenue)"
                dot={false}
                activeDot={{ r: 5, strokeWidth: 2, stroke: "#fff" }}
              />
              <Area
                type="monotone"
                dataKey="profit"
                stroke={CHART_COLORS.profit}
                strokeWidth={2.5}
                name="利益"
                fill="url(#colorProfit)"
                dot={false}
                activeDot={{ r: 5, strokeWidth: 2, stroke: "#fff" }}
              />
              <Area
                type="monotone"
                dataKey="expenses"
                stroke={CHART_COLORS.expenses}
                strokeWidth={2}
                strokeDasharray="5 4"
                name="経費"
                fill="none"
                dot={false}
                activeDot={{ r: 5, strokeWidth: 2, stroke: "#fff" }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        {/* 経費カテゴリ別円グラフ */}
        <Card className="transition-shadow hover:shadow-md">
          <h2 className="text-base font-semibold mb-5 text-gray-900 leading-tight tracking-tight">
            経費カテゴリ別内訳
          </h2>
          {expenseBreakdown.length > 0 ? (
            (() => {
              const total = expenseBreakdown.reduce(
                (sum, e) => sum + e.amount,
                0,
              );
              return (
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <ResponsiveContainer width="100%" height={240} className="flex-1">
                    <PieChart>
                      <Pie
                        data={expenseBreakdown}
                        dataKey="amount"
                        nameKey="categoryName"
                        cx="50%"
                        cy="50%"
                        outerRadius={90}
                        innerRadius={58}
                        paddingAngle={2}
                        stroke="#fff"
                        strokeWidth={2}
                        labelLine={false}
                      >
                        {expenseBreakdown.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.categoryColor} />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(value: number) => formatCurrency(value)}
                        contentStyle={tooltipContentStyle}
                        labelStyle={tooltipLabelStyle}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                  {/* カスタム凡例：色・名称・割合を縦並びで読みやすく */}
                  <div className="w-full sm:w-44 space-y-2">
                    {expenseBreakdown.map((entry) => {
                      const pct = total > 0 ? (entry.amount / total) * 100 : 0;
                      return (
                        <div
                          key={entry.categoryId}
                          className="flex items-center gap-2 text-sm"
                        >
                          <span
                            className="w-2.5 h-2.5 rounded-sm flex-shrink-0"
                            style={{ backgroundColor: entry.categoryColor }}
                          />
                          <span className="flex-1 truncate text-gray-700">
                            {entry.categoryName}
                          </span>
                          <span className="text-gray-500 tabular-nums">
                            {pct.toFixed(0)}%
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })()
          ) : (
            <div className="h-[240px] flex items-center justify-center text-gray-400">
              データがありません
            </div>
          )}
        </Card>
      </div>

      {/* 案件別売上ランキング */}
      <Card className="mb-8 transition-shadow hover:shadow-md">
        <h2 className="text-base font-semibold mb-5 text-gray-900 leading-tight tracking-tight">
          案件別売上ランキング
        </h2>
        {projectSales.length > 0 ? (
          <ResponsiveContainer
            width="100%"
            height={Math.max(220, projectSales.slice(0, 5).length * 76)}
          >
            <BarChart
              layout="vertical"
              data={projectSales.slice(0, 5)}
              margin={{ top: 4, right: 16, left: 8, bottom: 4 }}
              barGap={4}
            >
              <CartesianGrid {...gridProps} horizontal={false} vertical={true} />
              <XAxis
                type="number"
                tickFormatter={formatAxisCurrency}
                {...xAxisProps}
                domain={[0, (dataMax: number) => Math.ceil(dataMax * 1.1)]}
              />
              <YAxis
                type="category"
                dataKey="projectName"
                {...yAxisProps}
                width={120}
                tick={{ fontSize: 12, fill: "#374151" }}
              />
              <Tooltip
                formatter={(value: number) => formatCurrency(value)}
                contentStyle={tooltipContentStyle}
                labelStyle={tooltipLabelStyle}
                cursor={tooltipCursor}
              />
              <Legend {...legendProps} verticalAlign="top" align="right" />
              <Bar
                dataKey="totalBilled"
                fill={CHART_COLORS.billed}
                name="請求額"
                radius={[0, 6, 6, 0]}
                barSize={14}
              />
              <Bar
                dataKey="totalPaid"
                fill={CHART_COLORS.paid}
                name="入金額"
                radius={[0, 6, 6, 0]}
                barSize={14}
              />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-[220px] flex items-center justify-center text-gray-400">
            データがありません
          </div>
        )}
      </Card>

      {/* 最近のアクティビティ */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 最近の請求書 */}
        <Card className="hover:shadow-md transition-shadow">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-base font-semibold text-gray-900 leading-tight tracking-tight">
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
                    className="block p-3 border border-gray-100 rounded-lg hover:bg-gray-50 hover:border-gray-200 transition-colors"
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
                ),
              )}
            </div>
          ) : (
            <p className="text-gray-500 leading-relaxed">データがありません</p>
          )}
        </Card>

        {/* 最近の経費 */}
        <Card className="hover:shadow-md transition-shadow">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-base font-semibold text-gray-900 leading-tight tracking-tight">
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
                    className="block p-3 border border-gray-100 rounded-lg hover:bg-gray-50 hover:border-gray-200 transition-colors"
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
                ),
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

/** ダッシュボード読み込み中のスケルトン */
function DashboardSkeleton() {
  return (
    <div className="px-4 py-6 md:px-6 md:py-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <Skeleton variant="rectangular" className="h-6 w-40" />
        <Skeleton variant="rectangular" className="h-10 w-36" />
      </div>
      {/* サマリカード */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 mb-8">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="bg-white rounded-xl border border-gray-200/80 shadow-sm p-5"
          >
            <Skeleton variant="rectangular" className="h-9 w-9 rounded-lg mb-3" />
            <Skeleton variant="rectangular" className="h-3.5 w-20 mb-2" />
            <Skeleton variant="rectangular" className="h-7 w-32" />
          </div>
        ))}
      </div>
      {/* グラフ */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-8">
        {Array.from({ length: 2 }).map((_, i) => (
          <div
            key={i}
            className="bg-white rounded-xl border border-gray-200/80 shadow-sm p-6"
          >
            <Skeleton variant="rectangular" className="h-5 w-32 mb-6" />
            <Skeleton variant="rectangular" className="h-[240px] w-full rounded-lg" />
          </div>
        ))}
      </div>
      <div className="bg-white rounded-xl border border-gray-200/80 shadow-sm p-6">
        <Skeleton variant="rectangular" className="h-5 w-40 mb-6" />
        <Skeleton variant="rectangular" className="h-[280px] w-full rounded-lg" />
      </div>
    </div>
  );
}

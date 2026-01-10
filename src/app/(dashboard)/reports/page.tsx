"use client";

import { useState } from "react";
import { format, subMonths } from "date-fns";
import {
  useMonthlySummary,
  useMonthlyTrend,
  useExpenseBreakdown,
  useProjectSales,
} from "@/features/reports/hooks/useReports";
import { formatCurrency } from "@/lib/money/formatter";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
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

export default function ReportsPage() {
  const [selectedMonth, setSelectedMonth] = useState(
    format(new Date(), "yyyy-MM")
  );
  const [trendMonths, setTrendMonths] = useState(12);

  const { data: summary, isLoading: summaryLoading } =
    useMonthlySummary(selectedMonth);
  const { data: trend, isLoading: trendLoading } = useMonthlyTrend(trendMonths);
  const { data: expenseBreakdown, isLoading: expenseLoading } =
    useExpenseBreakdown(selectedMonth);
  const { data: projectSales, isLoading: projectsLoading } =
    useProjectSales(selectedMonth);

  const isLoading =
    summaryLoading || trendLoading || expenseLoading || projectsLoading;

  // 月の選択肢を生成（過去24ヶ月）
  const monthOptions = Array.from({ length: 24 }, (_, i) => {
    const date = subMonths(new Date(), i);
    return format(date, "yyyy-MM");
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">読み込み中...</div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">月別レポート</h1>
        <div className="flex gap-4">
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg"
          >
            {monthOptions.map((month) => (
              <option key={month} value={month}>
                {month}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* サマリカード */}
      {summary && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <h3 className="text-sm font-medium text-gray-600 mb-2">
              売上（入金ベース）
            </h3>
            <p className="text-3xl font-bold text-gray-900">
              {formatCurrency(summary.revenue)}
            </p>
            <p className="text-sm text-gray-500 mt-2">入金された金額</p>
          </Card>

          <Card>
            <h3 className="text-sm font-medium text-gray-600 mb-2">
              請求額（請求ベース）
            </h3>
            <p className="text-3xl font-bold text-gray-900">
              {formatCurrency(summary.billedAmount)}
            </p>
            <p className="text-sm text-gray-500 mt-2">発行した請求書の合計</p>
          </Card>

          <Card>
            <h3 className="text-sm font-medium text-gray-600 mb-2">経費</h3>
            <p className="text-3xl font-bold text-gray-900">
              {formatCurrency(summary.expenses)}
            </p>
            <p className="text-sm text-gray-500 mt-2">発生した経費の合計</p>
          </Card>

          <Card>
            <h3 className="text-sm font-medium text-gray-600 mb-2">利益</h3>
            <p
              className={`text-3xl font-bold ${
                summary.profit >= 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              {formatCurrency(summary.profit)}
            </p>
            <p className="text-sm text-gray-500 mt-2">売上 - 経費</p>
          </Card>
        </div>
      )}

      {/* 未回収金額 */}
      {summary && summary.unpaidAmount > 0 && (
        <Card className="mb-8 bg-orange-50 border-orange-200">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold text-orange-900 mb-2">
                未回収金額
              </h3>
              <p className="text-sm text-orange-700">
                請求済みで未入金の金額があります
              </p>
            </div>
            <p className="text-4xl font-bold text-orange-600">
              {formatCurrency(summary.unpaidAmount)}
            </p>
          </div>
        </Card>
      )}

      {/* 月別推移グラフ */}
      <Card className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">月別推移</h2>
          <select
            value={trendMonths}
            onChange={(e) => setTrendMonths(Number(e.target.value))}
            className="px-3 py-1 border border-gray-300 rounded-lg text-sm"
          >
            <option value={6}>6ヶ月</option>
            <option value={12}>12ヶ月</option>
            <option value={24}>24ヶ月</option>
          </select>
        </div>
        {trend && trend.length > 0 ? (
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={trend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value: number) => formatCurrency(value)} />
              <Legend />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#10b981"
                name="売上"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="expenses"
                stroke="#ef4444"
                name="経費"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="profit"
                stroke="#3b82f6"
                name="利益"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-[400px] flex items-center justify-center text-gray-500">
            データがありません
          </div>
        )}
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* 経費カテゴリ別内訳 */}
        <Card>
          <h2 className="text-lg font-semibold mb-4">経費カテゴリ別内訳</h2>
          {expenseBreakdown && expenseBreakdown.length > 0 ? (
            <>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={expenseBreakdown}
                    dataKey="amount"
                    nameKey="categoryName"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label={(entry) =>
                      `${entry.categoryName}: ${formatCurrency(entry.amount)}`
                    }
                  >
                    {expenseBreakdown.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.categoryColor} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value: number) => formatCurrency(value)}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-4 space-y-2">
                {expenseBreakdown.map((item) => (
                  <div
                    key={item.categoryId}
                    className="flex justify-between items-center p-2 bg-gray-50 rounded"
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: item.categoryColor }}
                      />
                      <span className="font-medium">{item.categoryName}</span>
                      <span className="text-sm text-gray-500">
                        ({item.count}件)
                      </span>
                    </div>
                    <span className="font-semibold">
                      {formatCurrency(item.amount)}
                    </span>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="h-[300px] flex items-center justify-center text-gray-500">
              データがありません
            </div>
          )}
        </Card>

        {/* 案件別売上 */}
        <Card>
          <h2 className="text-lg font-semibold mb-4">案件別売上</h2>
          {projectSales && projectSales.length > 0 ? (
            <>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={projectSales.slice(0, 10)}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="projectName"
                    angle={-45}
                    textAnchor="end"
                    height={100}
                  />
                  <YAxis />
                  <Tooltip
                    formatter={(value: number) => formatCurrency(value)}
                  />
                  <Legend />
                  <Bar dataKey="totalBilled" fill="#3b82f6" name="請求額" />
                  <Bar dataKey="totalPaid" fill="#10b981" name="入金額" />
                </BarChart>
              </ResponsiveContainer>
              <div className="mt-4 space-y-2">
                {projectSales.slice(0, 5).map((item) => (
                  <div
                    key={item.projectId}
                    className="flex justify-between items-center p-2 bg-gray-50 rounded"
                  >
                    <span className="font-medium">{item.projectName}</span>
                    <div className="text-right">
                      <div className="font-semibold">
                        {formatCurrency(item.totalBilled)}
                      </div>
                      {item.unpaidAmount > 0 && (
                        <div className="text-sm text-orange-600">
                          未回収: {formatCurrency(item.unpaidAmount)}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="h-[300px] flex items-center justify-center text-gray-500">
              データがありません
            </div>
          )}
        </Card>
      </div>

      {/* エクスポート機能（将来実装） */}
      <Card>
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-semibold mb-1">レポートのエクスポート</h3>
            <p className="text-sm text-gray-500">
              このレポートをCSV形式でダウンロードできます（将来実装予定）
            </p>
          </div>
          <Button variant="secondary" disabled>
            CSV エクスポート
          </Button>
        </div>
      </Card>
    </div>
  );
}

"use client";

import { use } from "react";
import Link from "next/link";
import { format } from "date-fns";
import { useProjectSales } from "@/features/reports/hooks/useReports";
import { useProject } from "@/features/projects/hooks/useProjects";
import { useInvoices } from "@/features/invoices/hooks/useInvoices";
import { useExpenses } from "@/features/expenses/hooks/useExpenses";
import { formatCurrency } from "@/lib/money/formatter";
import { formatDate } from "@/lib/utils";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
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

const INVOICE_STATUS_COLORS: Record<string, string> = {
  DRAFT: "gray",
  SENT: "orange",
  PAID: "green",
};

export default function ProjectReportPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { data: project, isLoading: projectLoading } = useProject(id);
  const { data: invoicesData, isLoading: invoicesLoading } = useInvoices({
    projectId: id,
  });
  const { data: expensesData, isLoading: expensesLoading } = useExpenses({
    projectId: id,
  });

  const isLoading = projectLoading || invoicesLoading || expensesLoading;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">読み込み中...</div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">案件が見つかりません</div>
      </div>
    );
  }

  const invoices = invoicesData?.invoices || [];
  const expenses = expensesData?.expenses || [];

  // 集計データを計算
  const totalBilled = invoices.reduce((sum, inv) => sum + inv.totalAmount, 0);
  const totalPaid = invoices.reduce((sum, inv) => sum + inv.paidAmount, 0);
  const unpaidAmount = totalBilled - totalPaid;
  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  const profit = totalPaid - totalExpenses;

  // 月別データを生成
  const monthlyData = new Map<
    string,
    { month: string; billed: number; paid: number; expenses: number }
  >();

  invoices.forEach((invoice) => {
    const month = format(new Date(invoice.issuedAt), "yyyy-MM");
    if (!monthlyData.has(month)) {
      monthlyData.set(month, { month, billed: 0, paid: 0, expenses: 0 });
    }
    const data = monthlyData.get(month)!;
    data.billed += invoice.totalAmount;
    data.paid += invoice.paidAmount;
  });

  expenses.forEach((expense) => {
    const month = format(new Date(expense.createdAt), "yyyy-MM");
    if (!monthlyData.has(month)) {
      monthlyData.set(month, { month, billed: 0, paid: 0, expenses: 0 });
    }
    const data = monthlyData.get(month)!;
    data.expenses += expense.amount;
  });

  const monthlyChartData = Array.from(monthlyData.values())
    .sort((a, b) => a.month.localeCompare(b.month))
    .map((d) => ({
      ...d,
      profit: d.paid - d.expenses,
    }));

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">案件レポート</h1>
          <p className="text-xl text-gray-600">{project.project.name}</p>
        </div>
        <Link href={`/projects/${id}`}>
          <Button variant="secondary">案件詳細へ戻る</Button>
        </Link>
      </div>

      {/* サマリカード */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        <Card>
          <h3 className="text-sm font-medium text-gray-600 mb-2">契約金額</h3>
          <p className="text-2xl font-bold text-gray-900">
            {project.project.contractAmount
              ? formatCurrency(project.project.contractAmount)
              : "未設定"}
          </p>
        </Card>

        <Card>
          <h3 className="text-sm font-medium text-gray-600 mb-2">請求額</h3>
          <p className="text-2xl font-bold text-gray-900">
            {formatCurrency(totalBilled)}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            {invoices.length}件の請求書
          </p>
        </Card>

        <Card>
          <h3 className="text-sm font-medium text-gray-600 mb-2">入金額</h3>
          <p className="text-2xl font-bold text-green-600">
            {formatCurrency(totalPaid)}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            {((totalPaid / (totalBilled || 1)) * 100).toFixed(1)}% 回収済
          </p>
        </Card>

        <Card>
          <h3 className="text-sm font-medium text-gray-600 mb-2">未回収</h3>
          <p className="text-2xl font-bold text-orange-600">
            {formatCurrency(unpaidAmount)}
          </p>
        </Card>

        <Card>
          <h3 className="text-sm font-medium text-gray-600 mb-2">経費</h3>
          <p className="text-2xl font-bold text-red-600">
            {formatCurrency(totalExpenses)}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            {expenses.length}件の経費
          </p>
        </Card>
      </div>

      {/* 利益カード */}
      <Card
        className={`mb-8 ${
          profit >= 0
            ? "bg-green-50 border-green-200"
            : "bg-red-50 border-red-200"
        }`}
      >
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-semibold mb-2">利益（入金ベース）</h3>
            <p className="text-sm text-gray-700">入金額 - 経費 = 利益</p>
          </div>
          <p
            className={`text-4xl font-bold ${
              profit >= 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            {formatCurrency(profit)}
          </p>
        </div>
      </Card>

      {/* 月別推移グラフ */}
      {monthlyChartData.length > 0 && (
        <Card className="mb-8">
          <h2 className="text-lg font-semibold mb-4">月別推移</h2>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={monthlyChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value: number) => formatCurrency(value)} />
              <Legend />
              <Line
                type="monotone"
                dataKey="billed"
                stroke="#3b82f6"
                name="請求額"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="paid"
                stroke="#10b981"
                name="入金額"
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
                stroke="#8b5cf6"
                name="利益"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 請求書一覧 */}
        <Card>
          <h2 className="text-lg font-semibold mb-4">請求書一覧</h2>
          {invoices.length > 0 ? (
            <div className="space-y-3">
              {invoices.map((invoice) => (
                <Link
                  key={invoice.id}
                  href={`/invoices/${invoice.id}`}
                  className="block p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">
                        {invoice.invoiceNumber ||
                          `INV-${invoice.id.slice(0, 8)}`}
                      </p>
                      <p className="text-sm text-gray-500">
                        発行日: {formatDate(invoice.issuedAt)}
                      </p>
                      <p className="text-sm text-gray-500">
                        支払期限: {formatDate(invoice.dueAt)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">
                        {formatCurrency(invoice.totalAmount)}
                      </p>
                      <Badge
                        variant={
                          INVOICE_STATUS_COLORS[invoice.status] === "green"
                            ? "success"
                            : INVOICE_STATUS_COLORS[invoice.status] === "orange"
                            ? "warning"
                            : "info"
                        }
                      >
                        {INVOICE_STATUS_LABELS[invoice.status]}
                      </Badge>
                      {invoice.paidAmount > 0 && invoice.status !== "PAID" && (
                        <p className="text-xs text-green-600 mt-1">
                          入金済: {formatCurrency(invoice.paidAmount)}
                        </p>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">請求書がありません</p>
          )}
        </Card>

        {/* 経費一覧 */}
        <Card>
          <h2 className="text-lg font-semibold mb-4">経費一覧</h2>
          {expenses.length > 0 ? (
            <div className="space-y-3">
              {expenses.map((expense) => (
                <Link
                  key={expense.id}
                  href={`/expenses/${expense.id}`}
                  className="block p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2">
                        {expense.category && (
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{
                              backgroundColor:
                                expense.category.color || "#gray-500",
                            }}
                          />
                        )}
                        <p className="font-medium">{expense.description}</p>
                      </div>
                      {expense.category && (
                        <p className="text-sm text-gray-500">
                          {expense.category.name}
                        </p>
                      )}
                      <p className="text-xs text-gray-400 mt-1">
                        {formatDate(expense.createdAt)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">
                        {formatCurrency(expense.amount)}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">経費がありません</p>
          )}
        </Card>
      </div>
    </div>
  );
}

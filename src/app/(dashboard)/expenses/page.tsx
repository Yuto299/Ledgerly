"use client";

import { useState } from "react";
import Link from "next/link";
import {
  useExpenses,
  useDeleteExpense,
  useDuplicateExpense,
} from "@/features/expenses/hooks/useExpenses";
import { useExpenseCategories } from "@/features/expense-categories/hooks/useExpenseCategories";
import { useProjects } from "@/features/projects/hooks/useProjects";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
import { formatDate } from "@/lib/utils";
import { formatCurrency } from "@/lib/money/formatter";
import { useToast } from "@/components/providers/ToastProvider";
import { exportToCSV } from "@/lib/csv/generator";

const PAYMENT_METHOD_LABELS: Record<string, string> = {
  BANK_TRANSFER: "銀行振込",
  CREDIT_CARD: "クレジットカード",
  CASH: "現金",
  OTHER: "その他",
};

export default function ExpensesPage() {
  const [categoryFilter, setCategoryFilter] = useState<string>("");
  const [projectFilter, setProjectFilter] = useState<string>("");
  const [monthFilter, setMonthFilter] = useState<string>(
    (new Date().getMonth() + 1).toString().padStart(2, "0"),
  );
  const [yearFilter, setYearFilter] = useState<string>(
    new Date().getFullYear().toString(),
  );

  const { data, isLoading, error } = useExpenses({
    categoryId: categoryFilter || undefined,
    projectId: projectFilter || undefined,
    startDate: monthFilter
      ? `${yearFilter}-${monthFilter}-01`
      : yearFilter
        ? `${yearFilter}-01-01`
        : undefined,
    endDate: monthFilter
      ? `${yearFilter}-${monthFilter}-${new Date(
          parseInt(yearFilter),
          parseInt(monthFilter),
          0,
        ).getDate()}`
      : yearFilter
        ? `${yearFilter}-12-31`
        : undefined,
    limit: 100,
  });
  const { data: categoriesData } = useExpenseCategories();
  const { data: projectsData } = useProjects({ limit: 100 });
  const { mutate: deleteExpense, isPending: isDeleting } = useDeleteExpense();
  const { mutate: duplicateExpense, isPending: isDuplicating } =
    useDuplicateExpense();
  const { addToast } = useToast();
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [duplicatingId, setDuplicatingId] = useState<string | null>(null);

  const handleDelete = (expenseId: string, description: string) => {
    if (window.confirm(`経費「${description}」を削除しますか？`)) {
      setDeletingId(expenseId);
      deleteExpense(expenseId, {
        onSuccess: () => {
          addToast("経費を削除しました", "success");
          setDeletingId(null);
        },
        onError: (error) => {
          addToast(`削除に失敗しました: ${error.message}`, "error");
          setDeletingId(null);
        },
      });
    }
  };

  const handleDuplicate = (expenseId: string, description: string) => {
    setDuplicatingId(expenseId);
    duplicateExpense(expenseId, {
      onSuccess: () => {
        addToast(
          `経費「${description}」を複製しました（日付は今日に設定）`,
          "success",
        );
        setDuplicatingId(null);
      },
      onError: (error) => {
        addToast(`複製に失敗しました: ${error.message}`, "error");
        setDuplicatingId(null);
      },
    });
  };

  const handleExportCSV = () => {
    if (!expenses || expenses.length === 0) {
      addToast("エクスポートするデータがありません", "warning");
      return;
    }

    const csvData = expenses.map((expense) => ({
      date: formatDate(expense.date),
      description: expense.description,
      category: expense.category?.name || "",
      project: expense.project?.name || "",
      amount: expense.amount,
      paymentMethod:
        PAYMENT_METHOD_LABELS[expense.paymentMethod] || expense.paymentMethod,
      notes: expense.notes || "",
    }));

    exportToCSV(
      csvData,
      [
        { label: "日付", key: "date" },
        { label: "説明", key: "description" },
        { label: "カテゴリ", key: "category" },
        { label: "案件", key: "project" },
        { label: "金額", key: "amount" },
        { label: "支払方法", key: "paymentMethod" },
        { label: "備考", key: "notes" },
      ],
      `expenses_${new Date().toISOString().split("T")[0]}.csv`,
    );

    addToast("CSVをエクスポートしました", "success");
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500">読み込み中...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-red-600">エラーが発生しました: {error.message}</p>
      </div>
    );
  }

  const expenses = data?.expenses || [];
  const categories = categoriesData?.categories || [];
  const projects = projectsData?.projects || [];

  // 合計金額を計算
  const totalAmount = expenses.reduce(
    (sum, expense) => sum + expense.amount,
    0,
  );

  return (
    <div className="px-4 py-4 md:px-0 md:py-0">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h1 className="text-xl font-bold">経費管理</h1>
        <div className="flex gap-2 w-full sm:w-auto">
          <Button
            variant="outline"
            onClick={handleExportCSV}
            className="flex-1 sm:flex-initial"
          >
            📊 CSV出力
          </Button>
          <Link href="/expenses/new" className="flex-1 sm:flex-initial">
            <Button className="w-full">+ 新規経費</Button>
          </Link>
        </div>
      </div>

      <Card className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              年
            </label>
            <select
              value={yearFilter}
              onChange={(e) => setYearFilter(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2"
            >
              <option value="">すべて</option>
              {Array.from({ length: 10 }, (_, i) => {
                const year = new Date().getFullYear() - i;
                return (
                  <option key={year} value={year}>
                    {year}年
                  </option>
                );
              })}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              月
            </label>
            <select
              value={monthFilter}
              onChange={(e) => setMonthFilter(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2"
            >
              <option value="">すべて</option>
              {Array.from({ length: 12 }, (_, i) => {
                const month = String(i + 1).padStart(2, "0");
                return (
                  <option key={month} value={month}>
                    {i + 1}月
                  </option>
                );
              })}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              カテゴリ
            </label>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2"
            >
              <option value="">すべて</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              案件
            </label>
            <select
              value={projectFilter}
              onChange={(e) => setProjectFilter(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2"
            >
              <option value="">すべて</option>
              {projects.map((project) => (
                <option key={project.id} value={project.id}>
                  {project.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {(yearFilter || monthFilter || categoryFilter || projectFilter) && (
          <div className="mt-4 flex items-center justify-between">
            <div className="text-sm text-gray-600">
              {monthFilter
                ? `${yearFilter}年${parseInt(monthFilter)}月`
                : yearFilter
                  ? `${yearFilter}年`
                  : "全期間"}
              の合計:
              <span className="ml-2 text-lg font-bold text-gray-900">
                {formatCurrency(totalAmount)}
              </span>
            </div>
            <Button
              variant="outline"
              onClick={() => {
                setYearFilter(new Date().getFullYear().toString());
                setMonthFilter("");
                setCategoryFilter("");
                setProjectFilter("");
              }}
            >
              クリア
            </Button>
          </div>
        )}
      </Card>

      {expenses.length === 0 ? (
        <Card>
          <p className="text-center text-gray-500 py-8">経費がありません</p>
        </Card>
      ) : (
        <Card>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    日付
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    カテゴリ
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    説明
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    案件
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    支払方法
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    金額
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    操作
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {expenses.map((expense) => (
                  <tr key={expense.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatDate(expense.date)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <Badge variant="info">{expense.category?.name}</Badge>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {expense.description || "-"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {expense.project ? (
                        <Link
                          href={`/projects/${expense.project.id}`}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          {expense.project.name}
                        </Link>
                      ) : (
                        "-"
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {PAYMENT_METHOD_LABELS[expense.paymentMethod]}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right font-medium">
                      {formatCurrency(expense.amount)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link
                        href={`/expenses/${expense.id}`}
                        className="text-blue-600 hover:text-blue-900 mr-4"
                      >
                        詳細
                      </Link>
                      <Link
                        href={`/expenses/${expense.id}/edit`}
                        className="text-indigo-600 hover:text-indigo-900 mr-4"
                      >
                        編集
                      </Link>
                      <button
                        onClick={() =>
                          handleDuplicate(
                            expense.id,
                            expense.description || "経費",
                          )
                        }
                        disabled={duplicatingId === expense.id}
                        className="text-green-600 hover:text-green-900 disabled:opacity-50 mr-4"
                      >
                        {duplicatingId === expense.id ? "複製中..." : "複製"}
                      </button>
                      <button
                        onClick={() =>
                          handleDelete(
                            expense.id,
                            expense.description || "経費",
                          )
                        }
                        disabled={deletingId === expense.id}
                        className="text-red-600 hover:text-red-900 disabled:opacity-50"
                      >
                        {deletingId === expense.id ? "削除中..." : "削除"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-gray-50">
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-4 text-sm font-bold text-gray-900 text-right"
                  >
                    合計
                  </td>
                  <td className="px-6 py-4 text-sm font-bold text-gray-900 text-right">
                    {formatCurrency(
                      expenses.reduce((sum, e) => sum + e.amount, 0),
                    )}
                  </td>
                  <td></td>
                </tr>
              </tfoot>
            </table>
          </div>
        </Card>
      )}
    </div>
  );
}

"use client";

import { use } from "react";
import Link from "next/link";
import {
  useCustomer,
  useDeleteCustomer,
} from "@/features/customers/hooks/useCustomers";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
import { formatDate } from "@/lib/utils";
import { formatCurrency } from "@/lib/money/formatter";

export default function CustomerDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { data, isLoading, error } = useCustomer(id);
  const { mutate: deleteCustomer, isPending: isDeleting } = useDeleteCustomer();

  const handleDelete = () => {
    if (window.confirm("この顧客を削除してもよろしいですか？")) {
      deleteCustomer(id);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500">読み込み中...</p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-red-600">
          エラーが発生しました: {error?.message || "顧客が見つかりません"}
        </p>
      </div>
    );
  }

  const { customer, salesSummary, projectCount } = data;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">{customer.name}</h1>
        <div className="flex gap-2">
          <Link href={`/customers/${id}/edit`}>
            <Button variant="outline">編集</Button>
          </Link>
          <Button variant="danger" onClick={handleDelete} disabled={isDeleting}>
            {isDeleting ? "削除中..." : "削除"}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <h3 className="text-sm font-medium text-gray-600 mb-2">総請求額</h3>
          <p className="text-2xl font-bold text-gray-900">
            {formatCurrency(salesSummary.totalInvoiced)}
          </p>
        </Card>

        <Card>
          <h3 className="text-sm font-medium text-gray-600 mb-2">入金済み</h3>
          <p className="text-2xl font-bold text-green-600">
            {formatCurrency(salesSummary.totalPaid)}
          </p>
        </Card>

        <Card>
          <h3 className="text-sm font-medium text-gray-600 mb-2">未回収</h3>
          <p className="text-2xl font-bold text-orange-600">
            {formatCurrency(salesSummary.unpaid)}
          </p>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <h2 className="text-xl font-semibold mb-4">基本情報</h2>
          <dl className="space-y-3">
            <div>
              <dt className="text-sm font-medium text-gray-600">担当者名</dt>
              <dd className="mt-1 text-sm text-gray-900">
                {customer.contactName || "-"}
              </dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-600">
                メールアドレス
              </dt>
              <dd className="mt-1 text-sm text-gray-900">
                {customer.email || "-"}
              </dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-600">電話番号</dt>
              <dd className="mt-1 text-sm text-gray-900">
                {customer.phone || "-"}
              </dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-600">登録日</dt>
              <dd className="mt-1 text-sm text-gray-900">
                {formatDate(customer.createdAt)}
              </dd>
            </div>
          </dl>
        </Card>

        <Card>
          <h2 className="text-xl font-semibold mb-4">メモ</h2>
          <p className="text-sm text-gray-700 whitespace-pre-wrap">
            {customer.notes || "メモはありません"}
          </p>
        </Card>
      </div>

      <div className="mt-6">
        <Card>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">案件</h2>
            <Badge variant="info">{projectCount}件</Badge>
          </div>
          <p className="text-sm text-gray-500">
            この顧客に紐づく案件が{projectCount}件あります。
          </p>
        </Card>
      </div>
    </div>
  );
}

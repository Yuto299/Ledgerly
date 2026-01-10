"use client";

import { use } from "react";
import Link from "next/link";
import {
  useProject,
  useDeleteProject,
} from "@/features/projects/hooks/useProjects";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
import { formatDate } from "@/lib/utils";
import { formatCurrency } from "@/lib/money/formatter";

const STATUS_LABELS: Record<string, string> = {
  PROSPECT: "見込み",
  IN_PROGRESS: "進行中",
  COMPLETED: "完了",
  LOST: "失注",
};

const STATUS_VARIANTS: Record<
  string,
  "success" | "warning" | "danger" | "info"
> = {
  PROSPECT: "info",
  IN_PROGRESS: "warning",
  COMPLETED: "success",
  LOST: "danger",
};

const CONTRACT_TYPE_LABELS: Record<string, string> = {
  FIXED: "固定報酬",
  HOURLY: "時給",
  COMMISSION: "成果報酬",
};

export default function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { data, isLoading, error } = useProject(id);
  const { mutate: deleteProject, isPending: isDeleting } = useDeleteProject();

  const handleDelete = () => {
    if (window.confirm("この案件を削除してもよろしいですか？")) {
      deleteProject(id);
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
          エラーが発生しました: {error?.message || "案件が見つかりません"}
        </p>
      </div>
    );
  }

  const { project, invoicesSummary, invoiceCount } = data;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">{project.name}</h1>
          <div className="mt-2">
            <Badge variant={STATUS_VARIANTS[project.status]}>
              {STATUS_LABELS[project.status]}
            </Badge>
          </div>
        </div>
        <div className="flex gap-2">
          <Link href={`/projects/${id}/reports`}>
            <Button variant="secondary">レポート</Button>
          </Link>
          <Link href={`/projects/${id}/edit`}>
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
            {formatCurrency(invoicesSummary.totalInvoiced)}
          </p>
        </Card>

        <Card>
          <h3 className="text-sm font-medium text-gray-600 mb-2">入金済み</h3>
          <p className="text-2xl font-bold text-green-600">
            {formatCurrency(invoicesSummary.totalPaid)}
          </p>
        </Card>

        <Card>
          <h3 className="text-sm font-medium text-gray-600 mb-2">未回収</h3>
          <p className="text-2xl font-bold text-orange-600">
            {formatCurrency(invoicesSummary.unpaid)}
          </p>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <h2 className="text-xl font-semibold mb-4">基本情報</h2>
          <dl className="space-y-3">
            <div>
              <dt className="text-sm font-medium text-gray-600">顧客</dt>
              <dd className="mt-1 text-sm text-gray-900">
                <Link
                  href={`/customers/${project.customer.id}`}
                  className="text-primary-600 hover:text-primary-800"
                >
                  {project.customer.name}
                </Link>
              </dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-600">契約形態</dt>
              <dd className="mt-1 text-sm text-gray-900">
                {CONTRACT_TYPE_LABELS[project.contractType]}
              </dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-600">契約金額</dt>
              <dd className="mt-1 text-sm text-gray-900">
                {project.contractAmount
                  ? formatCurrency(project.contractAmount)
                  : "-"}
              </dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-600">開始日</dt>
              <dd className="mt-1 text-sm text-gray-900">
                {project.startDate ? formatDate(project.startDate) : "-"}
              </dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-600">終了日</dt>
              <dd className="mt-1 text-sm text-gray-900">
                {project.endDate ? formatDate(project.endDate) : "-"}
              </dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-600">登録日</dt>
              <dd className="mt-1 text-sm text-gray-900">
                {formatDate(project.createdAt)}
              </dd>
            </div>
          </dl>
        </Card>

        <Card>
          <h2 className="text-xl font-semibold mb-4">説明</h2>
          <p className="text-sm text-gray-700 whitespace-pre-wrap">
            {project.description || "説明はありません"}
          </p>
        </Card>
      </div>

      <div className="mt-6">
        <Card>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">請求書</h2>
            <Badge variant="info">{invoiceCount}件</Badge>
          </div>
          <p className="text-sm text-gray-500">
            この案件に紐づく請求書が{invoiceCount}件あります。
          </p>
        </Card>
      </div>
    </div>
  );
}

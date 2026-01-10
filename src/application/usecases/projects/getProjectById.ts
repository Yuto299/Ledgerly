import { projectRepository } from "@/infrastructure/repositories/projectRepository";
import { NotFoundError } from "@/lib/api/errors";

/**
 * 案件詳細取得ユースケース
 */
export async function getProjectById(userId: string, projectId: string) {
  const project = await projectRepository.findById(projectId, userId);

  if (!project) {
    throw new NotFoundError("案件が見つかりません");
  }

  // 請求書サマリーを取得
  const [invoicesSummary, invoiceCount] = await Promise.all([
    projectRepository.getInvoicesSummary(projectId, userId),
    projectRepository.countInvoices(projectId, userId),
  ]);

  return {
    project,
    invoicesSummary,
    invoiceCount,
  };
}

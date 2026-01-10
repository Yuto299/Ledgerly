import { projectRepository } from "@/infrastructure/repositories/projectRepository";
import { NotFoundError, BusinessLogicError } from "@/lib/api/errors";

/**
 * 案件削除ユースケース
 */
export async function deleteProject(userId: string, projectId: string) {
  // 案件の存在確認
  const existingProject = await projectRepository.findById(projectId, userId);
  if (!existingProject) {
    throw new NotFoundError("案件が見つかりません");
  }

  // 請求書が存在するか確認
  const invoiceCount = await projectRepository.countInvoices(projectId, userId);
  if (invoiceCount > 0) {
    throw new BusinessLogicError(
      `この案件には${invoiceCount}件の請求書が紐づいています。削除する前に請求書を削除してください。`
    );
  }

  // 案件削除
  await projectRepository.delete(projectId, userId);

  return { success: true };
}

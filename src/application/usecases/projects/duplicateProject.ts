import { projectRepository } from "@/infrastructure/repositories/projectRepository";
import { NotFoundError } from "@/lib/api/errors";

/**
 * 案件複製ユースケース
 * 指定した案件をコピーして新しい案件を作成
 */
export async function duplicateProject(userId: string, projectId: string) {
  // 元の案件を取得
  const originalProject = await projectRepository.findById(projectId, userId);

  if (!originalProject) {
    throw new NotFoundError("案件が見つかりません");
  }

  // 案件を複製（名前に「(コピー)」を追加）
  const duplicatedProject = await projectRepository.create({
    userId,
    customerId: originalProject.customerId,
    name: `${originalProject.name} (コピー)`,
    description: originalProject.description || undefined,
    contractType: originalProject.contractType,
    contractAmount: originalProject.contractAmount || undefined,
    hourlyRate: originalProject.hourlyRate || undefined,
    startDate: originalProject.startDate || undefined,
    endDate: originalProject.endDate || undefined,
    status: originalProject.status,
  });

  return duplicatedProject;
}

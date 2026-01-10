import { projectRepository } from "@/infrastructure/repositories/projectRepository";
import { ProjectStatus } from "@prisma/client";

/**
 * 案件一覧取得ユースケース
 */
export async function listProjects(
  userId: string,
  options: {
    page?: number;
    limit?: number;
    customerId?: string;
    status?: ProjectStatus;
  } = {}
) {
  return projectRepository.findAll(userId, options);
}

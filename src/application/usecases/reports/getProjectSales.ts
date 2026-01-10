import { ReportService } from "@/domain/services/reportService";

export async function getProjectSales(userId: string, month?: string) {
  return await ReportService.getProjectSales(userId, month);
}

import { ReportService } from "@/domain/services/reportService";

export async function getMonthlySummary(userId: string, month: string) {
  return await ReportService.getMonthlySummary(userId, month);
}

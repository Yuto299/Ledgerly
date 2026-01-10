import { ReportService } from "@/domain/services/reportService";

export async function getMonthlyTrend(userId: string, months: number = 6) {
  return await ReportService.getMonthlyTrend(userId, months);
}

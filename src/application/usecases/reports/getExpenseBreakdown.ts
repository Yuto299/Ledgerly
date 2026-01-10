import { ReportService } from "@/domain/services/reportService";

export async function getExpenseBreakdown(userId: string, month?: string) {
  return await ReportService.getExpenseBreakdown(userId, month);
}

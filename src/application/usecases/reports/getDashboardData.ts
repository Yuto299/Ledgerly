import { ReportService } from "@/domain/services/reportService";

export async function getDashboardData(userId: string, month: string) {
  const [
    summary,
    trend,
    expenseBreakdown,
    projectSales,
    recentInvoices,
    recentExpenses,
  ] = await Promise.all([
    ReportService.getMonthlySummary(userId, month),
    ReportService.getMonthlyTrend(userId, 6),
    ReportService.getExpenseBreakdown(userId, month),
    ReportService.getProjectSales(userId, month),
    ReportService.getRecentInvoices(userId, 5),
    ReportService.getRecentExpenses(userId, 5),
  ]);

  return {
    summary,
    trend,
    expenseBreakdown,
    projectSales,
    recentInvoices,
    recentExpenses,
  };
}

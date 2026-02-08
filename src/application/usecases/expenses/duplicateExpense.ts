import { expenseRepository } from "@/infrastructure/repositories/expenseRepository";
import { NotFoundError } from "@/lib/api/errors";

/**
 * 経費複製ユースケース
 * 指定した経費をコピーして新しい経費を作成（日付は今日に設定）
 */
export async function duplicateExpense(userId: string, expenseId: string) {
  // 元の経費を取得
  const originalExpense = await expenseRepository.findById(expenseId, userId);

  if (!originalExpense) {
    throw new NotFoundError("経費が見つかりません");
  }

  // 経費を複製（日付を今日に設定）
  const duplicatedExpense = await expenseRepository.create({
    userId,
    projectId: originalExpense.projectId || undefined,
    categoryId: originalExpense.categoryId,
    date: new Date(), // 今日の日付に設定
    amount: originalExpense.amount,
    paymentMethod: originalExpense.paymentMethod,
    description: originalExpense.description || undefined,
    notes: originalExpense.notes || undefined,
  });

  return duplicatedExpense;
}

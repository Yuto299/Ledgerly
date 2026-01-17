import { prisma } from "@/infrastructure/db/prisma";
import { DEFAULT_EXPENSE_CATEGORIES } from "../expenses/defaultCategories";

/**
 * ユーザー作成時にデフォルトの経費カテゴリを作成
 */
export async function createDefaultExpenseCategories(userId: string) {
  try {
    // 既存のカテゴリをチェック
    const existingCategories = await prisma.expenseCategory.findMany({
      where: { userId },
      select: { name: true },
    });

    const existingNames = new Set(existingCategories.map((c) => c.name));

    // 存在しないカテゴリのみを作成
    const categoriesToCreate = DEFAULT_EXPENSE_CATEGORIES.filter(
      (category) => !existingNames.has(category.name)
    );

    if (categoriesToCreate.length > 0) {
      await prisma.expenseCategory.createMany({
        data: categoriesToCreate.map((category) => ({
          userId,
          name: category.name,
          color: category.color,
          sortOrder: category.sortOrder,
        })),
        skipDuplicates: true, // 念のため重複をスキップ
      });
      console.log(
        `Created ${categoriesToCreate.length} default expense categories for user: ${userId}`
      );
    }
  } catch (error) {
    console.error("Failed to create default expense categories:", error);
    // エラーを再スローせず、ログのみ記録（ユーザー作成は成功とする）
    // 本番環境では監視システムに送信することを推奨
  }
}

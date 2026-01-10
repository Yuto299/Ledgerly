import { invoiceRepository } from "@/infrastructure/repositories/invoiceRepository";
import { NotFoundError } from "@/lib/api/errors";

/**
 * 請求書削除ユースケース
 */
export async function deleteInvoice(userId: string, invoiceId: string) {
  // 請求書の存在確認
  const existingInvoice = await invoiceRepository.findById(invoiceId, userId);
  if (!existingInvoice) {
    throw new NotFoundError("請求書が見つかりません");
  }

  // 請求書削除
  await invoiceRepository.delete(invoiceId, userId);

  return { success: true };
}

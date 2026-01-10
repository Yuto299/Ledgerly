import { invoiceRepository } from "@/infrastructure/repositories/invoiceRepository";
import { NotFoundError, BusinessLogicError } from "@/lib/api/errors";

/**
 * 請求書を送付済みにするユースケース
 */
export async function markInvoiceSent(userId: string, invoiceId: string) {
  // 請求書の存在確認
  const existingInvoice = await invoiceRepository.findById(invoiceId, userId);
  if (!existingInvoice) {
    throw new NotFoundError("請求書が見つかりません");
  }

  // 下書き以外は送付済みにできない
  if (existingInvoice.status !== "DRAFT") {
    throw new BusinessLogicError("下書き状態の請求書のみ送付できます");
  }

  // ステータスを更新
  const invoice = await invoiceRepository.updateStatus(
    invoiceId,
    userId,
    "SENT"
  );

  return invoice;
}

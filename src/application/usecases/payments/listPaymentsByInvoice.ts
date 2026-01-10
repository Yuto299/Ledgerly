import { paymentRepository } from "@/infrastructure/repositories/paymentRepository";
import { invoiceRepository } from "@/infrastructure/repositories/invoiceRepository";
import { NotFoundError } from "@/lib/api/errors";

/**
 * 入金一覧取得ユースケース
 */
export async function listPaymentsByInvoice(userId: string, invoiceId: string) {
  // 請求書の存在確認
  const invoice = await invoiceRepository.findById(invoiceId, userId);
  if (!invoice) {
    throw new NotFoundError("請求書が見つかりません");
  }

  // 入金一覧を取得
  const payments = await paymentRepository.findByInvoiceId(invoiceId);

  return { payments };
}

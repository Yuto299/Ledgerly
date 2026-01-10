import { invoiceRepository } from "@/infrastructure/repositories/invoiceRepository";
import { NotFoundError } from "@/lib/api/errors";

/**
 * 請求書詳細取得ユースケース
 */
export async function getInvoiceById(userId: string, invoiceId: string) {
  const invoice = await invoiceRepository.findById(invoiceId, userId);

  if (!invoice) {
    throw new NotFoundError("請求書が見つかりません");
  }

  return { invoice };
}

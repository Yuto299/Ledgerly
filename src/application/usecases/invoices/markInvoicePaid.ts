import { invoiceRepository } from "@/infrastructure/repositories/invoiceRepository";
import { paymentRepository } from "@/infrastructure/repositories/paymentRepository";
import { NotFoundError } from "@/lib/api/errors";

/**
 * 請求書を入金済みにするユースケース
 * 未入金分の金額に対して入金レコードを自動生成し、ステータスをPAIDに更新する
 */
export async function markInvoicePaid(userId: string, invoiceId: string) {
  const invoice = await invoiceRepository.findById(invoiceId, userId);
  if (!invoice) {
    throw new NotFoundError("請求書が見つかりません");
  }

  const remainingAmount = invoice.totalAmount - invoice.paidAmount;

  // 未入金分がある場合は自動で入金レコードを作成
  if (remainingAmount > 0) {
    await paymentRepository.create({
      invoiceId,
      amount: remainingAmount,
      paidAt: new Date(),
      paymentMethod: "BANK_TRANSFER",
    });
  }

  // paidAmountをtotalAmountに更新してPAIDに
  return invoiceRepository.updatePaidAmount(
    invoiceId,
    userId,
    invoice.totalAmount,
  );
}

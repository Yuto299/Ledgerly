import { paymentRepository } from "@/infrastructure/repositories/paymentRepository";
import { invoiceRepository } from "@/infrastructure/repositories/invoiceRepository";
import { NotFoundError } from "@/lib/api/errors";

/**
 * 入金削除ユースケース
 */
export async function deletePayment(userId: string, paymentId: string) {
  // 入金の存在確認
  const existingPayment = await paymentRepository.findById(paymentId);
  if (!existingPayment) {
    throw new NotFoundError("入金が見つかりません");
  }

  // 請求書の存在確認
  const invoice = await invoiceRepository.findById(
    existingPayment.invoiceId,
    userId
  );
  if (!invoice) {
    throw new NotFoundError("請求書が見つかりません");
  }

  // 入金を削除
  await paymentRepository.delete(paymentId);

  // 入金合計額を再計算して請求書を更新
  const totalPaidAmount = await paymentRepository.getTotalPaidAmount(
    existingPayment.invoiceId
  );
  await invoiceRepository.updatePaidAmount(
    existingPayment.invoiceId,
    userId,
    totalPaidAmount
  );

  return { success: true };
}

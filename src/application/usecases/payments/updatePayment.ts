import { paymentRepository } from "@/infrastructure/repositories/paymentRepository";
import { invoiceRepository } from "@/infrastructure/repositories/invoiceRepository";
import {
  UpdatePaymentDto,
  updatePaymentSchema,
} from "@/features/payments/schemas/paymentSchema";
import { NotFoundError } from "@/lib/api/errors";
import { PaymentMethod } from "@prisma/client";

/**
 * 入金更新ユースケース
 */
export async function updatePayment(
  userId: string,
  paymentId: string,
  data: UpdatePaymentDto
) {
  // バリデーション
  const validatedData = updatePaymentSchema.parse(data);

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

  // 入金を更新
  const payment = await paymentRepository.update(paymentId, {
    amount: validatedData.amount,
    paidAt: validatedData.paidAt ? new Date(validatedData.paidAt) : undefined,
    paymentMethod: validatedData.paymentMethod as PaymentMethod | undefined,
    notes: validatedData.notes,
  });

  // 入金合計額を再計算して請求書を更新
  const totalPaidAmount = await paymentRepository.getTotalPaidAmount(
    existingPayment.invoiceId
  );
  await invoiceRepository.updatePaidAmount(
    existingPayment.invoiceId,
    userId,
    totalPaidAmount
  );

  return payment;
}

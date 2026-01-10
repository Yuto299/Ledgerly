import { paymentRepository } from "@/infrastructure/repositories/paymentRepository";
import { invoiceRepository } from "@/infrastructure/repositories/invoiceRepository";
import {
  CreatePaymentDto,
  createPaymentSchema,
} from "@/features/payments/schemas/paymentSchema";
import { NotFoundError } from "@/lib/api/errors";
import { PaymentMethod } from "@prisma/client";

/**
 * 入金登録ユースケース
 */
export async function registerPayment(
  userId: string,
  invoiceId: string,
  data: CreatePaymentDto
) {
  // バリデーション
  const validatedData = createPaymentSchema.parse(data);

  // 請求書の存在確認
  const invoice = await invoiceRepository.findById(invoiceId, userId);
  if (!invoice) {
    throw new NotFoundError("請求書が見つかりません");
  }

  // 入金を登録
  const payment = await paymentRepository.create({
    invoiceId,
    amount: validatedData.amount,
    paidAt: new Date(validatedData.paidAt),
    paymentMethod: validatedData.paymentMethod as PaymentMethod,
    notes: validatedData.notes,
  });

  // 入金合計額を計算して請求書を更新
  const totalPaidAmount = await paymentRepository.getTotalPaidAmount(invoiceId);
  await invoiceRepository.updatePaidAmount(invoiceId, userId, totalPaidAmount);

  return payment;
}

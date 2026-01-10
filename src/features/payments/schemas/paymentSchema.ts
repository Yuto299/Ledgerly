import { z } from "zod";

/**
 * 入金作成スキーマ
 */
export const createPaymentSchema = z.object({
  amount: z.number().min(1, "入金額は1円以上で入力してください"),
  paidAt: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "有効な入金日を入力してください",
  }),
  paymentMethod: z.enum(["BANK_TRANSFER", "CREDIT_CARD", "CASH", "OTHER"]),
  notes: z.string().optional(),
});

/**
 * 入金更新スキーマ
 */
export const updatePaymentSchema = createPaymentSchema.partial();

/**
 * 入金レスポンススキーマ
 */
export const paymentResponseSchema = z.object({
  id: z.string().uuid(),
  invoiceId: z.string().uuid(),
  amount: z.number(),
  paidAt: z.date(),
  paymentMethod: z.enum(["BANK_TRANSFER", "CREDIT_CARD", "CASH", "OTHER"]),
  notes: z.string().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

/**
 * 入金一覧レスポンススキーマ
 */
export const paymentListResponseSchema = z.object({
  payments: z.array(paymentResponseSchema),
});

export type CreatePaymentDto = z.infer<typeof createPaymentSchema>;
export type UpdatePaymentDto = z.infer<typeof updatePaymentSchema>;
export type PaymentResponse = z.infer<typeof paymentResponseSchema>;
export type PaymentListResponse = z.infer<typeof paymentListResponseSchema>;

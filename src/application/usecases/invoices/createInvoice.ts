import { invoiceRepository } from "@/infrastructure/repositories/invoiceRepository";
import {
  CreateInvoiceDto,
  createInvoiceSchema,
} from "@/features/invoices/schemas/invoiceSchema";

/**
 * 請求書作成ユースケース
 */
export async function createInvoice(userId: string, data: CreateInvoiceDto) {
  // バリデーション
  const validatedData = createInvoiceSchema.parse(data);

  // 明細から合計金額を計算
  const totalAmount = validatedData.items.reduce(
    (sum, item) => sum + item.quantity * item.unitPrice,
    0
  );

  // 明細データを変換
  const items = validatedData.items.map((item, index) => ({
    name: item.description,
    description: item.description,
    quantity: item.quantity,
    unitPrice: item.unitPrice,
    amount: item.quantity * item.unitPrice,
    sortOrder: index,
  }));

  // 請求書作成
  const invoice = await invoiceRepository.create({
    userId,
    customerId: validatedData.customerId,
    projectId: validatedData.projectId,
    invoiceNumber: validatedData.invoiceNumber,
    issuedAt: new Date(validatedData.issuedAt),
    dueAt: new Date(validatedData.dueAt),
    totalAmount,
    notes: validatedData.notes,
    items,
  });

  return invoice;
}

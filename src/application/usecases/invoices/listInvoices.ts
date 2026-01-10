import { invoiceRepository } from "@/infrastructure/repositories/invoiceRepository";
import { InvoiceStatus } from "@prisma/client";

/**
 * 請求書一覧取得ユースケース
 */
export async function listInvoices(
  userId: string,
  options: {
    page?: number;
    limit?: number;
    customerId?: string;
    projectId?: string;
    status?: InvoiceStatus;
  } = {}
) {
  return invoiceRepository.findAll(userId, options);
}

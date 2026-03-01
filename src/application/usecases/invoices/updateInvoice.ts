import { prisma } from "@/infrastructure/db/prisma";
import { invoiceRepository } from "@/infrastructure/repositories/invoiceRepository";
import { paymentRepository } from "@/infrastructure/repositories/paymentRepository";
import {
  UpdateInvoiceDto,
  updateInvoiceSchema,
} from "@/features/invoices/schemas/invoiceSchema";
import { NotFoundError } from "@/lib/api/errors";

/**
 * 請求書更新ユースケース
 */
export async function updateInvoice(
  userId: string,
  invoiceId: string,
  data: UpdateInvoiceDto,
) {
  // バリデーション
  const validatedData = updateInvoiceSchema.parse(data);

  // 請求書の存在確認
  const existingInvoice = await invoiceRepository.findById(invoiceId, userId);
  if (!existingInvoice) {
    throw new NotFoundError("請求書が見つかりません");
  }

  // 明細が更新される場合
  if (validatedData.items) {
    // 既存の明細を全て削除
    await invoiceRepository.deleteAllItems(invoiceId);

    // 新しい明細から合計金額を計算（時給契約の場合は時間×単価、通常は数量×単価）
    const totalAmount = validatedData.items.reduce((sum, item) => {
      if (item.hours && item.hours > 0) {
        return sum + item.hours * item.unitPrice;
      }
      return sum + item.quantity * item.unitPrice;
    }, 0);

    // 明細データを変換
    const items = validatedData.items.map((item, index) => {
      const amount =
        item.hours && item.hours > 0
          ? item.hours * item.unitPrice
          : item.quantity * item.unitPrice;

      return {
        name: item.description,
        description: item.description,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        hours: item.hours ?? undefined,
        amount,
        sortOrder: index,
      };
    });

    // 明細と合計金額を含めて更新
    await invoiceRepository.update(invoiceId, userId, {
      customerId: validatedData.customerId,
      projectId: validatedData.projectId,
      invoiceNumber: validatedData.invoiceNumber,
      status: validatedData.status,
      issuedAt: validatedData.issuedAt
        ? new Date(validatedData.issuedAt)
        : undefined,
      dueAt: validatedData.dueAt ? new Date(validatedData.dueAt) : undefined,
      totalAmount,
      notes: validatedData.notes,
    });

    // 新しい明細を作成
    for (const item of items) {
      await prisma.invoiceItem.create({
        data: {
          invoiceId,
          ...item,
        },
      });
    }
  } else {
    // 明細以外のフィールドのみ更新
    await invoiceRepository.update(invoiceId, userId, {
      customerId: validatedData.customerId,
      projectId: validatedData.projectId,
      invoiceNumber: validatedData.invoiceNumber,
      status: validatedData.status,
      issuedAt: validatedData.issuedAt
        ? new Date(validatedData.issuedAt)
        : undefined,
      dueAt: validatedData.dueAt ? new Date(validatedData.dueAt) : undefined,
      notes: validatedData.notes,
    });
  }

  // 更新後の請求書を取得
  const invoice = await invoiceRepository.findById(invoiceId, userId);
  if (!invoice) return null;

  const statusChanged =
    validatedData.status !== undefined &&
    validatedData.status !== existingInvoice.status;

  if (statusChanged) {
    if (validatedData.status === "PAID" && existingInvoice.status !== "PAID") {
      // → PAID: 未入金分の入金レコードを自動生成して paidAmount を totalAmount に更新
      const remaining = invoice.totalAmount - invoice.paidAmount;
      if (remaining > 0) {
        await paymentRepository.create({
          invoiceId,
          amount: remaining,
          paidAt: new Date(),
          paymentMethod: "BANK_TRANSFER",
        });
      }
      await invoiceRepository.updatePaidAmount(
        invoiceId,
        userId,
        invoice.totalAmount,
      );
    } else if (
      existingInvoice.status === "PAID" &&
      validatedData.status !== "PAID"
    ) {
      // PAID → 他ステータス: 全入金を取り消して paidAmount を 0 にリセット
      // forceStatus を渡してステータスが DRAFT に上書きされるのを防ぐ
      await paymentRepository.deleteAllByInvoiceId(invoiceId);
      await invoiceRepository.updatePaidAmount(
        invoiceId,
        userId,
        0,
        validatedData.status as import("@prisma/client").InvoiceStatus,
      );
    }
  } else if (validatedData.items) {
    // ステータス変更なし + 明細更新: totalAmount が変わるので paidAmount を再計算
    const totalPaid = await paymentRepository.getTotalPaidAmount(invoiceId);
    await invoiceRepository.updatePaidAmount(invoiceId, userId, totalPaid);
  }

  // 最終的な請求書を返す
  return invoiceRepository.findById(invoiceId, userId);
}

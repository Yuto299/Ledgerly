import { prisma } from "../db/prisma";
import { PaymentMethod } from "@prisma/client";

/**
 * 入金リポジトリ
 */
export class PaymentRepository {
  /**
   * 請求書IDで入金一覧を取得
   */
  async findByInvoiceId(invoiceId: string) {
    return prisma.payment.findMany({
      where: {
        invoiceId,
        deletedAt: null,
      },
      orderBy: {
        paidAt: "desc",
      },
    });
  }

  /**
   * IDで入金を取得
   */
  async findById(id: string) {
    return prisma.payment.findFirst({
      where: {
        id,
        deletedAt: null,
      },
    });
  }

  /**
   * 入金を作成
   */
  async create(data: {
    invoiceId: string;
    amount: number;
    paidAt: Date;
    paymentMethod: PaymentMethod;
    notes?: string;
  }) {
    return prisma.payment.create({
      data,
    });
  }

  /**
   * 入金を更新
   */
  async update(
    id: string,
    data: {
      amount?: number;
      paidAt?: Date;
      paymentMethod?: PaymentMethod;
      notes?: string;
    },
  ) {
    return prisma.payment.update({
      where: {
        id,
        deletedAt: null,
      },
      data,
    });
  }

  /**
   * 入金を削除（論理削除）
   */
  async delete(id: string) {
    return prisma.payment.update({
      where: {
        id,
        deletedAt: null,
      },
      data: {
        deletedAt: new Date(),
      },
    });
  }

  /**
   * 請求書に紐づく全入金を論理削除
   */
  async deleteAllByInvoiceId(invoiceId: string) {
    return prisma.payment.updateMany({
      where: {
        invoiceId,
        deletedAt: null,
      },
      data: {
        deletedAt: new Date(),
      },
    });
  }

  /**
   * 請求書の入金合計額を計算
   */
  async getTotalPaidAmount(invoiceId: string): Promise<number> {
    const payments = await this.findByInvoiceId(invoiceId);
    return payments.reduce((sum, payment) => sum + payment.amount, 0);
  }
}

export const paymentRepository = new PaymentRepository();

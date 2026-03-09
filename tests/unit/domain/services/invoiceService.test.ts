import { describe, it, expect } from "vitest";
import {
  calculateInvoiceTotalFromItems,
  calculateItemAmount,
} from "@/domain/services/invoiceService";

describe("InvoiceService - 明細から合計金額算出", () => {
  describe("calculateInvoiceTotalFromItems", () => {
    it("通常の明細（数量×単価）から合計金額を計算する", () => {
      const items = [
        { quantity: 2, unitPrice: 50000 },
        { quantity: 1, unitPrice: 30000 },
        { quantity: 3, unitPrice: 10000 },
      ];

      const total = calculateInvoiceTotalFromItems(items);
      expect(total).toBe(160000); // 100000 + 30000 + 30000
    });

    it("時給契約の明細（時間×単価）から合計金額を計算する", () => {
      const items = [
        { quantity: 1, unitPrice: 5000, hours: 10 },
        { quantity: 1, unitPrice: 5000, hours: 5 },
      ];

      const total = calculateInvoiceTotalFromItems(items);
      expect(total).toBe(75000); // 50000 + 25000
    });

    it("時給契約と通常契約が混在する場合を正しく計算する", () => {
      const items = [
        { quantity: 2, unitPrice: 50000 }, // 通常: 100000
        { quantity: 1, unitPrice: 5000, hours: 10 }, // 時給: 50000
        { quantity: 3, unitPrice: 10000 }, // 通常: 30000
      ];

      const total = calculateInvoiceTotalFromItems(items);
      expect(total).toBe(180000); // 100000 + 50000 + 30000
    });

    it("hoursが0の場合は数量×単価で計算する", () => {
      const items = [
        { quantity: 2, unitPrice: 50000, hours: 0 },
      ];

      const total = calculateInvoiceTotalFromItems(items);
      expect(total).toBe(100000);
    });

    it("hoursがnullの場合は数量×単価で計算する", () => {
      const items = [
        { quantity: 2, unitPrice: 50000, hours: null },
      ];

      const total = calculateInvoiceTotalFromItems(items);
      expect(total).toBe(100000);
    });

    it("明細が空の場合は0を返す", () => {
      const items: Array<{ quantity: number; unitPrice: number }> = [];

      const total = calculateInvoiceTotalFromItems(items);
      expect(total).toBe(0);
    });

    it("明細が1つの場合はその金額を返す", () => {
      const items = [
        { quantity: 1, unitPrice: 100000 },
      ];

      const total = calculateInvoiceTotalFromItems(items);
      expect(total).toBe(100000);
    });
  });

  describe("calculateItemAmount", () => {
    it("通常の明細（数量×単価）の金額を計算する", () => {
      const item = { quantity: 2, unitPrice: 50000 };
      const amount = calculateItemAmount(item);
      expect(amount).toBe(100000);
    });

    it("時給契約の明細（時間×単価）の金額を計算する", () => {
      const item = { quantity: 1, unitPrice: 5000, hours: 10 };
      const amount = calculateItemAmount(item);
      expect(amount).toBe(50000);
    });

    it("hoursが0の場合は数量×単価で計算する", () => {
      const item = { quantity: 2, unitPrice: 50000, hours: 0 };
      const amount = calculateItemAmount(item);
      expect(amount).toBe(100000);
    });

    it("hoursがnullの場合は数量×単価で計算する", () => {
      const item = { quantity: 2, unitPrice: 50000, hours: null };
      const amount = calculateItemAmount(item);
      expect(amount).toBe(100000);
    });
  });
});

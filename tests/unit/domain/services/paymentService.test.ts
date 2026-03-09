import { describe, it, expect } from "vitest";
import {
  determineInvoiceStatus,
  determineInvoiceStatusWithForce,
} from "@/domain/services/paymentService";

describe("PaymentService - 自動PAID更新ロジック", () => {
  describe("determineInvoiceStatus", () => {
    it("全額入金時はPAIDを返す", () => {
      const status = determineInvoiceStatus(100000, 100000);
      expect(status).toBe("PAID");
    });

    it("過入金時もPAIDを返す", () => {
      const status = determineInvoiceStatus(100000, 150000);
      expect(status).toBe("PAID");
    });

    it("一部入金時はSENTを返す", () => {
      const status = determineInvoiceStatus(100000, 30000);
      expect(status).toBe("SENT");
    });

    it("入金がない場合はDRAFTを返す", () => {
      const status = determineInvoiceStatus(100000, 0);
      expect(status).toBe("DRAFT");
    });

    it("請求額が0で入金も0の場合はDRAFTを返す", () => {
      const status = determineInvoiceStatus(0, 0);
      expect(status).toBe("DRAFT");
    });

    it("請求額が0で入金がある場合はPAIDを返す", () => {
      const status = determineInvoiceStatus(0, 10000);
      expect(status).toBe("PAID");
    });
  });

  describe("determineInvoiceStatusWithForce", () => {
    it("forceStatusが指定されている場合はそれを返す", () => {
      const status = determineInvoiceStatusWithForce(
        100000,
        0,
        "PAID"
      );
      expect(status).toBe("PAID");
    });

    it("forceStatusが指定されていない場合は通常のロジックで決定する", () => {
      const status = determineInvoiceStatusWithForce(
        100000,
        100000
      );
      expect(status).toBe("PAID");
    });

    it("forceStatusがSENTの場合はSENTを返す（入金が全額でも）", () => {
      const status = determineInvoiceStatusWithForce(
        100000,
        100000,
        "SENT"
      );
      expect(status).toBe("SENT");
    });

    it("forceStatusがDRAFTの場合はDRAFTを返す（入金があっても）", () => {
      const status = determineInvoiceStatusWithForce(
        100000,
        50000,
        "DRAFT"
      );
      expect(status).toBe("DRAFT");
    });
  });
});

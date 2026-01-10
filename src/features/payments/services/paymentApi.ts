import {
  CreatePaymentDto,
  UpdatePaymentDto,
  PaymentListResponse,
} from "../schemas/paymentSchema";

const API_BASE_URL = "/api";

/**
 * 入金API Client
 */
export const paymentApi = {
  /**
   * 入金一覧取得
   */
  async listByInvoice(invoiceId: string): Promise<PaymentListResponse> {
    const response = await fetch(
      `${API_BASE_URL}/invoices/${invoiceId}/payments`
    );
    if (!response.ok) {
      throw new Error("入金一覧の取得に失敗しました");
    }
    return response.json();
  },

  /**
   * 入金登録
   */
  async register(invoiceId: string, data: CreatePaymentDto): Promise<unknown> {
    const response = await fetch(
      `${API_BASE_URL}/invoices/${invoiceId}/payments`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }
    );
    if (!response.ok) {
      throw new Error("入金の登録に失敗しました");
    }
    return response.json();
  },

  /**
   * 入金更新
   */
  async update(paymentId: string, data: UpdatePaymentDto): Promise<unknown> {
    const response = await fetch(`${API_BASE_URL}/payments/${paymentId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error("入金の更新に失敗しました");
    }
    return response.json();
  },

  /**
   * 入金削除
   */
  async delete(paymentId: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/payments/${paymentId}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("入金の削除に失敗しました");
    }
  },
};

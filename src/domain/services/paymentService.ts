/**
 * 入金ドメインサービス
 * 自動PAID更新ロジック
 */

/**
 * 入金合計額に基づいて請求書のステータスを決定
 * @param totalAmount - 請求額
 * @param paidAmount - 入金済み額
 * @param currentStatus - 現在のステータス
 * @returns 新しいステータス
 */
export function determineInvoiceStatus(
  totalAmount: number,
  paidAmount: number,
  currentStatus: "DRAFT" | "SENT" | "PAID" = "DRAFT"
): "DRAFT" | "SENT" | "PAID" {
  // 請求額が0で入金も0の場合はDRAFT
  if (totalAmount === 0 && paidAmount === 0) {
    return "DRAFT";
  }
  // 請求額が0で入金がある場合はPAID
  if (totalAmount === 0 && paidAmount > 0) {
    return "PAID";
  }
  // 全額入金または過入金
  if (paidAmount >= totalAmount) {
    return "PAID";
  }
  // 入金がない場合はDRAFT
  if (paidAmount === 0) {
    return "DRAFT";
  }
  // 一部入金
  return "SENT";
}

/**
 * 入金合計額に基づいて請求書のステータスを決定（強制ステータス指定あり）
 */
export function determineInvoiceStatusWithForce(
  totalAmount: number,
  paidAmount: number,
  forceStatus?: "DRAFT" | "SENT" | "PAID"
): "DRAFT" | "SENT" | "PAID" {
  if (forceStatus) {
    return forceStatus;
  }
  return determineInvoiceStatus(totalAmount, paidAmount);
}

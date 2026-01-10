/**
 * 金額計算ヘルパー関数
 * すべて整数（円）で計算
 */

/**
 * 明細の金額を計算
 * @param quantity - 数量
 * @param unitPrice - 単価
 * @returns 金額（quantity * unitPrice）
 */
export function calculateItemAmount(
  quantity: number,
  unitPrice: number
): number {
  return quantity * unitPrice;
}

/**
 * 請求書の合計金額を計算
 * @param items - 明細リスト
 * @returns 合計金額
 */
export function calculateInvoiceTotal(
  items: Array<{ amount: number }>
): number {
  return items.reduce((sum, item) => sum + item.amount, 0);
}

/**
 * 入金済み金額を計算
 * @param payments - 入金リスト
 * @returns 入金済み金額
 */
export function calculatePaidAmount(
  payments: Array<{ amount: number }>
): number {
  return payments.reduce((sum, payment) => sum + payment.amount, 0);
}

/**
 * 未回収金額を計算
 * @param totalAmount - 請求額
 * @param paidAmount - 入金済み額
 * @returns 未回収金額
 */
export function calculateUnpaidAmount(
  totalAmount: number,
  paidAmount: number
): number {
  return Math.max(0, totalAmount - paidAmount);
}

/**
 * 入金済みかどうかを判定
 * @param totalAmount - 請求額
 * @param paidAmount - 入金済み額
 * @returns 入金済みの場合 true
 */
export function isFullyPaid(totalAmount: number, paidAmount: number): boolean {
  return paidAmount >= totalAmount;
}

/**
 * 利益を計算
 * @param revenue - 売上
 * @param expenses - 経費
 * @returns 利益
 */
export function calculateProfit(revenue: number, expenses: number): number {
  return revenue - expenses;
}

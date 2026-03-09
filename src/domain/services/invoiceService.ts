/**
 * 請求書ドメインサービス
 * 明細から合計金額を算出するロジック
 */

export interface InvoiceItemInput {
  quantity: number;
  unitPrice: number;
  hours?: number | null;
}

/**
 * 明細から合計金額を計算
 * 時給契約の場合は時間×単価、通常は数量×単価
 */
export function calculateInvoiceTotalFromItems(
  items: InvoiceItemInput[]
): number {
  return items.reduce((sum, item) => {
    if (item.hours && item.hours > 0) {
      return sum + item.hours * item.unitPrice;
    }
    return sum + item.quantity * item.unitPrice;
  }, 0);
}

/**
 * 明細の金額を計算
 */
export function calculateItemAmount(
  item: InvoiceItemInput
): number {
  if (item.hours && item.hours > 0) {
    return item.hours * item.unitPrice;
  }
  return item.quantity * item.unitPrice;
}

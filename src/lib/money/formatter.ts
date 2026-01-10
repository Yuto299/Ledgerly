/**
 * 金額フォーマットヘルパー
 */

/**
 * 金額を円表記でフォーマット
 * @param amount - 金額（円）
 * @param options - フォーマットオプション
 * @returns フォーマットされた文字列
 */
export function formatCurrency(
  amount: number,
  options: {
    showSymbol?: boolean;
    showPlus?: boolean;
  } = {}
): string {
  const { showSymbol = true, showPlus = false } = options;

  const formatted = new Intl.NumberFormat("ja-JP", {
    style: showSymbol ? "currency" : "decimal",
    currency: "JPY",
  }).format(amount);

  if (showPlus && amount > 0) {
    return `+${formatted}`;
  }

  return formatted;
}

/**
 * 金額をコンパクト形式でフォーマット（例: "1.5万円"）
 * @param amount - 金額（円）
 * @returns フォーマットされた文字列
 */
export function formatCurrencyCompact(amount: number): string {
  return new Intl.NumberFormat("ja-JP", {
    style: "currency",
    currency: "JPY",
    notation: "compact",
    compactDisplay: "short",
  }).format(amount);
}

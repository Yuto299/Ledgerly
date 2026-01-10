import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Tailwind CSSのクラス名をマージする
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * 金額を円表記でフォーマット
 * @param amount - 金額（円）
 * @returns フォーマットされた文字列（例: "¥1,000"）
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("ja-JP", {
    style: "currency",
    currency: "JPY",
  }).format(amount);
}

/**
 * 日付をフォーマット
 * @param date - 日付
 * @param format - フォーマット形式（デフォルト: 'yyyy/MM/dd'）
 * @returns フォーマットされた文字列
 */
export function formatDate(
  date: Date | string | null | undefined,
  format: string = "yyyy/MM/dd"
): string {
  if (!date) {
    return "-";
  }

  const d = typeof date === "string" ? new Date(date) : date;

  if (isNaN(d.getTime())) {
    return "-";
  }

  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");

  return format
    .replace("yyyy", String(year))
    .replace("MM", month)
    .replace("dd", day);
}

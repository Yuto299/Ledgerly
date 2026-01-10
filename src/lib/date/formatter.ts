import {
  format,
  parseISO,
  startOfMonth,
  endOfMonth,
  addMonths,
  subMonths,
} from "date-fns";
import { ja } from "date-fns/locale";

/**
 * 日付フォーマットヘルパー
 */

/**
 * 日付を指定形式でフォーマット
 * @param date - 日付
 * @param formatStr - フォーマット文字列（デフォルト: 'yyyy/MM/dd'）
 * @returns フォーマットされた文字列
 */
export function formatDate(
  date: Date | string,
  formatStr: string = "yyyy/MM/dd"
): string {
  const d = typeof date === "string" ? parseISO(date) : date;
  return format(d, formatStr, { locale: ja });
}

/**
 * 日付を長い形式でフォーマット（例: "2026年1月10日"）
 * @param date - 日付
 * @returns フォーマットされた文字列
 */
export function formatDateLong(date: Date | string): string {
  return formatDate(date, "yyyy年M月d日");
}

/**
 * 日時をフォーマット
 * @param date - 日時
 * @returns フォーマットされた文字列（例: "2026/01/10 15:30"）
 */
export function formatDateTime(date: Date | string): string {
  return formatDate(date, "yyyy/MM/dd HH:mm");
}

/**
 * 月の開始日を取得
 * @param date - 基準日
 * @returns 月の開始日
 */
export function getMonthStart(date: Date = new Date()): Date {
  return startOfMonth(date);
}

/**
 * 月の終了日を取得
 * @param date - 基準日
 * @returns 月の終了日
 */
export function getMonthEnd(date: Date = new Date()): Date {
  return endOfMonth(date);
}

/**
 * 前月を取得
 * @param date - 基準日
 * @returns 前月の同日
 */
export function getPreviousMonth(date: Date = new Date()): Date {
  return subMonths(date, 1);
}

/**
 * 翌月を取得
 * @param date - 基準日
 * @returns 翌月の同日
 */
export function getNextMonth(date: Date = new Date()): Date {
  return addMonths(date, 1);
}

/**
 * 年月を文字列に変換（例: "2026-01"）
 * @param date - 日付
 * @returns YYYY-MM形式の文字列
 */
export function formatYearMonth(date: Date = new Date()): string {
  return format(date, "yyyy-MM");
}

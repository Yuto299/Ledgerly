/**
 * CSVエクスポート用のユーティリティ関数
 */

/**
 * データをCSV形式の文字列に変換
 * @param headers ヘッダー行の配列
 * @param rows データ行の2次元配列
 * @returns CSV形式の文字列
 */
export function generateCSV(
  headers: string[],
  rows: (string | number)[][]
): string {
  // ヘッダー行
  const headerLine = headers.map(escapeCSVValue).join(",");

  // データ行
  const dataLines = rows.map((row) => row.map(escapeCSVValue).join(","));

  return [headerLine, ...dataLines].join("\n");
}

/**
 * CSV値をエスケープ
 * カンマ、改行、ダブルクォートを含む場合はダブルクォートで囲む
 * @param value エスケープする値
 * @returns エスケープされた文字列
 */
function escapeCSVValue(value: string | number): string {
  if (value === null || value === undefined) {
    return "";
  }

  const stringValue = String(value);

  // カンマ、改行、ダブルクォートを含む場合はダブルクォートで囲む
  if (
    stringValue.includes(",") ||
    stringValue.includes("\n") ||
    stringValue.includes('"')
  ) {
    // ダブルクォートは2つにエスケープ
    return `"${stringValue.replace(/"/g, '""')}"`;
  }

  return stringValue;
}

/**
 * CSVファイルをダウンロード
 * @param csv CSV文字列
 * @param filename ファイル名
 */
export function downloadCSV(csv: string, filename: string): void {
  // BOMを追加（Excelで正しく開けるようにするため）
  const bom = "\uFEFF";
  const blob = new Blob([bom + csv], { type: "text/csv;charset=utf-8;" });

  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);

  link.href = url;
  link.download = filename.endsWith(".csv") ? filename : `${filename}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  URL.revokeObjectURL(url);
}

/**
 * オブジェクトの配列をCSVに変換してダウンロード
 * @param data オブジェクトの配列
 * @param headers ヘッダーとキーのマッピング
 * @param filename ファイル名
 */
export function exportToCSV<T extends Record<string, unknown>>(
  data: T[],
  headers: { label: string; key: keyof T }[],
  filename: string
): void {
  const headerLabels = headers.map((h) => h.label);
  const rows = data.map((item) =>
    headers.map((h) => {
      const value = item[h.key];
      return value !== null && value !== undefined ? String(value) : "";
    })
  );

  const csv = generateCSV(headerLabels, rows);
  downloadCSV(csv, filename);
}

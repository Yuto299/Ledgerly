/**
 * Recharts 共通テーマ
 *
 * ダッシュボード／レポートのグラフで一貫した見た目を出すための共通設定。
 * 色そのものは既存のブランドカラーを踏襲しつつ、軸・グリッド・トゥールチップ・
 * 凡例のスタイルを統一して可読性を上げる。
 */

/** グラフで使う系列カラー（既存配色を踏襲） */
export const CHART_COLORS = {
  revenue: "#3b82f6", // 売上: blue-500
  expenses: "#a855f7", // 経費: purple-500
  profit: "#10b981", // 利益: emerald-500
  billed: "#3b82f6", // 請求額: blue-500
  paid: "#10b981", // 入金額: emerald-500
} as const;

/** 軸・グリッドのグレー */
export const AXIS_COLOR = "#9ca3af"; // gray-400
export const GRID_COLOR = "#f1f5f9"; // slate-100（薄め）
export const TICK_COLOR = "#6b7280"; // gray-500

/** 軸の目盛りスタイル */
export const axisTick = {
  fontSize: 12,
  fill: TICK_COLOR,
} as const;

/** グリッド線（横線のみ・点線・薄く） */
export const gridProps = {
  strokeDasharray: "4 4",
  stroke: GRID_COLOR,
  vertical: false,
} as const;

/** X/Y 軸の共通 props（線を消してすっきり見せる） */
export const xAxisProps = {
  tick: axisTick,
  axisLine: false,
  tickLine: false,
  tickMargin: 10,
} as const;

export const yAxisProps = {
  tick: axisTick,
  axisLine: false,
  tickLine: false,
  width: 56,
} as const;

/** トゥールチップの箱（白カード・やわらかい影） */
export const tooltipContentStyle = {
  backgroundColor: "#ffffff",
  border: "1px solid #e5e7eb",
  borderRadius: "12px",
  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
  padding: "10px 14px",
  fontSize: 13,
} as const;

export const tooltipLabelStyle = {
  fontWeight: 600,
  color: "#111827",
  marginBottom: 4,
} as const;

/** ホバー時のカーソル（縦の薄いバンド） */
export const tooltipCursor = {
  fill: "rgba(148, 163, 184, 0.08)",
} as const;

/** 凡例 */
export const legendProps = {
  iconType: "circle" as const,
  iconSize: 8,
  wrapperStyle: { fontSize: 13, color: TICK_COLOR },
};

/** 金額を「¥◯◯k / ¥◯◯M」に省略（Y軸ラベル用） */
export function formatAxisCurrency(value: number): string {
  if (Math.abs(value) >= 1_000_000) {
    return `¥${(value / 1_000_000).toFixed(value % 1_000_000 === 0 ? 0 : 1)}M`;
  }
  if (Math.abs(value) >= 1_000) {
    return `¥${Math.round(value / 1_000)}k`;
  }
  return `¥${value}`;
}

import { cn } from "@/lib/utils";

type Tone = "blue" | "purple" | "green" | "orange" | "red";

const toneStyles: Record<Tone, { iconBg: string; iconText: string }> = {
  blue: { iconBg: "bg-blue-50", iconText: "text-blue-600" },
  purple: { iconBg: "bg-purple-50", iconText: "text-purple-600" },
  green: { iconBg: "bg-green-50", iconText: "text-green-600" },
  orange: { iconBg: "bg-orange-50", iconText: "text-orange-600" },
  red: { iconBg: "bg-red-50", iconText: "text-red-600" },
};

interface StatCardProps {
  label: string;
  value: string;
  /** Material Symbols のアイコン名 */
  icon: string;
  tone?: Tone;
  /** 前月比（%）。指定すると上昇/下降バッジを表示 */
  change?: number | null;
  /**
   * 増加（change >= 0）が「良い」指標かどうか。
   * 売上・利益は true（増=緑）、経費は false（増=赤）。デフォルト true。
   * 矢印の向きは増減そのまま、色だけこのフラグで良し悪しを表す。
   */
  higherIsBetter?: boolean;
  /** 値の色を上書きしたい場合（利益のプラス/マイナスなど） */
  valueClassName?: string;
  /** 補足テキスト（例: 「売上 - 経費」） */
  hint?: string;
}

export default function StatCard({
  label,
  value,
  icon,
  tone = "blue",
  change,
  higherIsBetter = true,
  valueClassName,
  hint,
}: StatCardProps) {
  const t = toneStyles[tone];
  const hasChange = change !== null && change !== undefined && isFinite(change);
  const isUp = (change ?? 0) >= 0;
  // 色は「良し悪し」、矢印は「増減」で別管理
  const isGood = higherIsBetter ? isUp : !isUp;

  return (
    <div className="group bg-white rounded-xl border border-gray-200/80 shadow-sm p-5 transition-all hover:shadow-md hover:border-gray-300">
      <div className="flex items-start justify-between mb-4">
        <span
          className={cn(
            "flex items-center justify-center w-10 h-10 rounded-lg",
            t.iconBg,
            t.iconText,
          )}
        >
          <span className="material-symbols-outlined text-[22px]">{icon}</span>
        </span>
        {hasChange && (
          <span
            className={cn(
              "inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 text-xs font-semibold",
              isGood
                ? "bg-green-50 text-green-700"
                : "bg-red-50 text-red-700",
            )}
          >
            <span className="material-symbols-outlined text-[14px] leading-none">
              {isUp ? "trending_up" : "trending_down"}
            </span>
            {isUp ? "+" : ""}
            {change!.toFixed(1)}%
          </span>
        )}
      </div>
      <h3 className="text-sm font-medium text-gray-500 mb-1 leading-tight">
        {label}
      </h3>
      <p
        className={cn(
          "text-2xl sm:text-3xl font-bold text-gray-900 leading-tight tracking-tight tabular-nums",
          valueClassName,
        )}
      >
        {value}
      </p>
      {hint && (
        <p className="mt-1 text-xs text-gray-400 leading-relaxed">{hint}</p>
      )}
    </div>
  );
}

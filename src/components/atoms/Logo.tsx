import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  /** ロゴをリンクにする場合の遷移先。省略時は span 表示 */
  href?: string;
  /** マークのサイズ */
  size?: "sm" | "md" | "lg";
  /** テキスト色（暗い背景なら white を指定） */
  variant?: "dark" | "light";
  className?: string;
}

const markSizes = {
  sm: "w-8 h-8 text-base",
  md: "w-9 h-9 text-lg",
  lg: "w-10 h-10 text-xl",
};

const textSizes = {
  sm: "text-lg",
  md: "text-xl",
  lg: "text-2xl",
};

/** Ledgerly のブランドロゴ（マーク＋ワードマーク） */
export default function Logo({
  href,
  size = "md",
  variant = "dark",
  className,
}: LogoProps) {
  const content = (
    <span className={cn("flex items-center gap-2", className)}>
      <span
        className={cn(
          "flex items-center justify-center rounded-lg bg-slate-900 text-white font-bold",
          markSizes[size],
        )}
      >
        L
      </span>
      <span
        className={cn(
          "font-bold tracking-tight",
          textSizes[size],
          variant === "light" ? "text-white" : "text-gray-900",
        )}
      >
        Ledgerly
      </span>
    </span>
  );

  if (href) {
    return (
      <Link href={href} aria-label="Ledgerlyホーム">
        {content}
      </Link>
    );
  }
  return content;
}

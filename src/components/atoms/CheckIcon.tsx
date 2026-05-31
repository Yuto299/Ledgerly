import { cn } from "@/lib/utils";

interface CheckIconProps {
  className?: string;
}

/** 丸の中にチェックマーク。LP の特徴リスト等で使う共通アイコン */
export default function CheckIcon({ className }: CheckIconProps) {
  return (
    <svg
      className={cn("w-5 h-5 text-slate-900 flex-shrink-0", className)}
      fill="currentColor"
      viewBox="0 0 20 20"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
        clipRule="evenodd"
      />
    </svg>
  );
}

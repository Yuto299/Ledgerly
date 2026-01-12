import { z } from "zod";

/**
 * 強力なパスワードのバリデーションスキーマ
 */
export const strongPasswordSchema = z
  .string()
  .min(8, "パスワードは8文字以上である必要があります")
  .regex(/[A-Z]/, "パスワードには大文字を1文字以上含める必要があります")
  .regex(/[a-z]/, "パスワードには小文字を1文字以上含める必要があります")
  .regex(/[0-9]/, "パスワードには数字を1文字以上含める必要があります")
  .regex(
    /[^A-Za-z0-9]/,
    "パスワードには特殊文字を1文字以上含める必要があります"
  );

/**
 * パスワード強度チェック
 */
export function checkPasswordStrength(password: string): {
  score: number; // 0-4
  feedback: string[];
} {
  const feedback: string[] = [];
  let score = 0;

  if (password.length >= 8) score++;
  if (password.length >= 12) score++;

  if (/[A-Z]/.test(password) && /[a-z]/.test(password)) {
    score++;
  } else {
    feedback.push("大文字と小文字を含めてください");
  }

  if (/[0-9]/.test(password)) {
    score++;
  } else {
    feedback.push("数字を含めてください");
  }

  if (/[^A-Za-z0-9]/.test(password)) {
    score++;
  } else {
    feedback.push("特殊文字を含めてください");
  }

  if (password.length < 8) {
    feedback.push("8文字以上にしてください");
  }

  return { score: Math.min(score, 4), feedback };
}

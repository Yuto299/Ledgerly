import { NextRequest } from "next/server";

interface RateLimitStore {
  count: number;
  resetTime: number;
}

// メモリストア（本番環境では Redis 推奨）
const store = new Map<string, RateLimitStore>();

export interface RateLimitConfig {
  interval: number; // ミリ秒
  maxRequests: number;
}

/**
 * レートリミットチェック
 * @param identifier - 識別子（通常は IP アドレスまたはユーザーID）
 * @param config - レートリミット設定
 * @returns 制限内かどうか
 */
export function checkRateLimit(
  identifier: string,
  config: RateLimitConfig
): { success: boolean; remaining: number; resetTime: number } {
  const now = Date.now();
  const record = store.get(identifier);

  // レコードが存在しない、または期限切れ
  if (!record || now > record.resetTime) {
    const resetTime = now + config.interval;
    store.set(identifier, { count: 1, resetTime });
    return {
      success: true,
      remaining: config.maxRequests - 1,
      resetTime,
    };
  }

  // 制限超過
  if (record.count >= config.maxRequests) {
    return {
      success: false,
      remaining: 0,
      resetTime: record.resetTime,
    };
  }

  // カウント増加
  record.count++;
  return {
    success: true,
    remaining: config.maxRequests - record.count,
    resetTime: record.resetTime,
  };
}

/**
 * リクエストから識別子を取得
 */
export function getIdentifier(req: NextRequest): string {
  // X-Forwarded-For または X-Real-IP から IP を取得
  const forwarded = req.headers.get("x-forwarded-for");
  const realIp = req.headers.get("x-real-ip");

  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }

  if (realIp) {
    return realIp;
  }

  // フォールバック
  return "unknown";
}

/**
 * レートリミットのクリーンアップ（定期実行推奨）
 */
export function cleanupRateLimit() {
  const now = Date.now();
  for (const [key, record] of store.entries()) {
    if (now > record.resetTime) {
      store.delete(key);
    }
  }
}

// 定期的にクリーンアップ（1時間ごと）
if (typeof setInterval !== "undefined") {
  setInterval(cleanupRateLimit, 60 * 60 * 1000);
}

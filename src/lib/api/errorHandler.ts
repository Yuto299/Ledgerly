import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { ApiError, ValidationError, InternalServerError } from "./errors";

/**
 * エラーレスポンス型
 */
interface ErrorResponse {
  error: {
    code: string;
    message: string;
    details?: unknown;
  };
}

/**
 * APIエラーハンドラー
 * @param error - エラーオブジェクト
 * @returns NextResponse
 */
export function handleApiError(error: unknown): NextResponse<ErrorResponse> {
  console.error("API Error:", error);

  // Zodバリデーションエラー
  if (error instanceof ZodError) {
    const details = error.errors.map((err) => ({
      field: err.path.join("."),
      message: err.message,
    }));

    return NextResponse.json(
      {
        error: {
          code: "VALIDATION_ERROR",
          message: "Invalid input",
          details,
        },
      },
      { status: 400 }
    );
  }

  // カスタムAPIエラー
  if (error instanceof ApiError) {
    return NextResponse.json(
      {
        error: {
          code: error.code,
          message: error.message,
          details: error.details,
        },
      },
      { status: error.statusCode }
    );
  }

  // 予期しないエラー
  const internalError = new InternalServerError();
  return NextResponse.json(
    {
      error: {
        code: internalError.code,
        message: internalError.message,
      },
    },
    { status: 500 }
  );
}

/**
 * 成功レスポンスを返す
 * @param data - レスポンスデータ
 * @param status - HTTPステータスコード（デフォルト: 200）
 * @returns NextResponse
 */
export function handleApiSuccess<T>(
  data: T,
  status: number = 200
): NextResponse<T> {
  return NextResponse.json(data, { status });
}

/**
 * APIエラークラス
 */
export class ApiError extends Error {
  constructor(
    public statusCode: number,
    public code: string,
    message: string,
    public details?: unknown
  ) {
    super(message);
    this.name = "ApiError";
  }
}

/**
 * バリデーションエラー（400）
 */
export class ValidationError extends ApiError {
  constructor(message: string, details?: unknown) {
    super(400, "VALIDATION_ERROR", message, details);
    this.name = "ValidationError";
  }
}

/**
 * 認証エラー（401）
 */
export class UnauthorizedError extends ApiError {
  constructor(message: string = "Unauthorized") {
    super(401, "UNAUTHORIZED", message);
    this.name = "UnauthorizedError";
  }
}

/**
 * 権限エラー（403）
 */
export class ForbiddenError extends ApiError {
  constructor(message: string = "Forbidden") {
    super(403, "FORBIDDEN", message);
    this.name = "ForbiddenError";
  }
}

/**
 * リソース未発見エラー（404）
 */
export class NotFoundError extends ApiError {
  constructor(message: string = "Not found") {
    super(404, "NOT_FOUND", message);
    this.name = "NotFoundError";
  }
}

/**
 * 競合エラー（409）
 */
export class ConflictError extends ApiError {
  constructor(message: string, details?: unknown) {
    super(409, "CONFLICT", message, details);
    this.name = "ConflictError";
  }
}

/**
 * ビジネスロジックエラー（400）
 */
export class BusinessLogicError extends ApiError {
  constructor(message: string, details?: unknown) {
    super(400, "BUSINESS_LOGIC_ERROR", message, details);
    this.name = "BusinessLogicError";
  }
}

/**
 * 内部サーバーエラー（500）
 */
export class InternalServerError extends ApiError {
  constructor(message: string = "Internal server error") {
    super(500, "INTERNAL_SERVER_ERROR", message);
    this.name = "InternalServerError";
  }
}

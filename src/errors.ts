/**
 * Application error codes
 * Used for consistent error handling and exit codes
 */
export enum ErrorCode {
  // User input errors (exit code 2)
  VALIDATION_ERROR = "VALIDATION_ERROR",
  INVALID_ARGUMENT = "INVALID_ARGUMENT",
  MISSING_REQUIRED = "MISSING_REQUIRED",

  // Application errors (exit code 1)
  CONFIG_ERROR = "CONFIG_ERROR",
  RUNTIME_ERROR = "RUNTIME_ERROR",
  UNKNOWN = "UNKNOWN",
}

/**
 * Standard application error class
 * Provides consistent error handling across the CLI
 */
export class AppError extends Error {
  readonly code: ErrorCode;
  override readonly cause?: unknown;
  readonly exitCode: number;

  constructor(
    message: string,
    code: ErrorCode = ErrorCode.UNKNOWN,
    options?: { cause?: unknown },
  ) {
    super(message);
    this.name = "AppError";
    this.code = code;
    this.cause = options?.cause;

    // Determine exit code based on error type
    // Exit code 2 = user error (validation, invalid args)
    // Exit code 1 = application/system error
    this.exitCode = this.isUserError() ? 2 : 1;

    Error.captureStackTrace(this, this.constructor);
  }

  private isUserError(): boolean {
    return [
      ErrorCode.VALIDATION_ERROR,
      ErrorCode.INVALID_ARGUMENT,
      ErrorCode.MISSING_REQUIRED,
    ].includes(this.code);
  }

  /**
   * Create a validation error
   */
  static validation(message: string, cause?: unknown): AppError {
    return new AppError(message, ErrorCode.VALIDATION_ERROR, { cause });
  }

  /**
   * Create a config error
   */
  static config(message: string, cause?: unknown): AppError {
    return new AppError(message, ErrorCode.CONFIG_ERROR, { cause });
  }

  /**
   * Create a runtime error
   */
  static runtime(message: string, cause?: unknown): AppError {
    return new AppError(message, ErrorCode.RUNTIME_ERROR, { cause });
  }

  /**
   * Convert any error to AppError
   */
  static from(error: unknown): AppError {
    if (error instanceof AppError) {
      return error;
    }

    const message = error instanceof Error ? error.message : String(error);
    return new AppError(message, ErrorCode.UNKNOWN, { cause: error });
  }
}

/**
 * Type guard for AppError
 */
export function isAppError(error: unknown): error is AppError {
  return error instanceof AppError;
}

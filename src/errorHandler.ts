import type { Logger } from "pino";
import { isAppError, type AppError } from "./errors.js";

/**
 * Centralized error handler for CLI
 * Handles logging and determines appropriate exit code
 */
export function handleError(error: unknown, logger: Logger): number {
  if (isAppError(error)) {
    return handleAppError(error, logger);
  }

  // Unknown error
  const errorMessage = error instanceof Error ? error.message : String(error);
  const stack = error instanceof Error ? error.stack : undefined;

  const logData: Record<string, string | undefined> = { error: errorMessage };
  if (stack !== undefined) {
    logData["stack"] = stack;
  }

  logger.error(logData, "Unexpected error");

  return 1;
}

/**
 * Handle AppError with appropriate logging
 */
function handleAppError(error: AppError, logger: Logger): number {
  let causeMessage: string | undefined;

  if (error.cause instanceof Error) {
    causeMessage = error.cause.message;
  } else if (error.cause !== undefined) {
    // eslint-disable-next-line @typescript-eslint/no-base-to-string
    causeMessage = String(error.cause);
  }

  const context: Record<string, string> = { code: error.code };
  if (causeMessage !== undefined) {
    context["cause"] = causeMessage;
  }

  // User errors (validation, missing args, etc)
  if (error.exitCode === 2) {
    logger.warn(context, error.message);
  } else {
    // Application errors
    logger.error(
      {
        ...context,
        stack: error.stack,
      },
      error.message,
    );
  }

  return error.exitCode;
}

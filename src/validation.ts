import z from "zod";
import { AppError } from "./errors.js";

/**
 * Validation schemas for CLI inputs
 * Strongly typed to ensure safe command handling
 */

// Hello command options schema
const helloOptionsSchema = z.strictObject({
  name: z.string().min(1, "Name cannot be empty"),
  verbose: z.boolean().default(false),
});

export type HelloOptions = z.infer<typeof helloOptionsSchema>;

export const validateInputs = {
  hello: (options: unknown): HelloOptions => {
    const result = helloOptionsSchema.safeParse(options);
    if (!result.success) {
      const errors = z.prettifyError(result.error);
      throw AppError.validation(errors, result.error);
    }
    return result.data;
  },
};

/**
 * Type definitions for CLI options
 */
export interface CliOptions {
  hello: HelloOptions;
}

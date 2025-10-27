import z from "zod";
import config from "config";

// Configuration schema for the config file
export const configSchema = z.strictObject({
  path: z.string().optional(),
});
export type FileConfig = z.infer<typeof configSchema>;

export const getConfig = (): FileConfig => {
  const result = configSchema.safeParse(config);
  if (!result.success) {
    const errors = z.prettifyError(result.error);
    throw new Error(`Configuration validation error: ${errors}`);
  }

  return result.data;
};

import { Command } from "commander";
import { getLoggerForFile } from "./logger.js";
import { validateInputs, type CliOptions } from "./validation.js";

const logger = getLoggerForFile(import.meta.url);

/**
 * Create and configure the CLI program with strongly-typed options
 */
export function createProgram(): Command {
  const program = new Command();

  program
    .name("my-cli")
    .description("A Node.js CLI application template")
    .version("1.0.0");

  // Example command with typed options
  program
    .command("hello")
    .description("Hello world example command")
    .option("--name <string>", "Name to greet", "World")
    .option("--verbose", "Enable verbose output", false)
    .action((options: CliOptions["hello"]) => {
      try {
        const validated = validateInputs.hello(options);
        logger.info({ name: validated.name }, `Hello, ${validated.name}!`);
        if (validated.verbose) {
          logger.debug("Verbose mode enabled");
        }
      } catch (error) {
        logger.error(error);
        process.exit(1);
      }
    });

  return program;
}

/**
 * Parse CLI arguments and execute the appropriate command
 */
export async function runCli(args: string[]): Promise<void> {
  const program = createProgram();
  await program.parseAsync(args);
}

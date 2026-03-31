#!/usr/bin/env node
"use strict";

import "dotenv/config";
import { getLoggerForFile } from "./logger.js";
import { runCli } from "./cli.js";
import { handleError } from "./errorHandler.js";

const logger = getLoggerForFile(import.meta.url);

async function main() {
  try {
    logger.debug({ env: process.env.NODE_ENV }, "Environment detected");
    await runCli(process.argv);
  } catch (error) {
    const exitCode = handleError(error, logger);
    process.exit(exitCode);
  }
}

void main();

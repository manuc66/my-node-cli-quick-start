#!/usr/bin/env node
"use strict";

import "dotenv/config";
import { getLoggerForFile } from "./logger.js";
import { runCli } from "./cli.js";

const logger = getLoggerForFile(import.meta.url);

async function main() {
  try {
    logger.debug({ env: process.env.NODE_ENV }, "Environment detected");
    await runCli(process.argv);
  } catch (error) {
    logger.error(error);
    process.exit(1);
  }
}

void main();

"use strict";

import { getConfig } from "./fileConfig.js";
import "dotenv/config";
import { getLoggerForFile } from "./logger.js";

const logger = getLoggerForFile(import.meta.url);

async function main() {
  logger.debug({ env: process.env.NODE_ENV }, "Environment detected");

  const fileConfig = getConfig();

  logger.debug(process.env.SECRET);

  logger.info(fileConfig.path);

  await new Promise((resolve) => setTimeout(resolve, 10));
}

main().catch((err) => logger.error(err));

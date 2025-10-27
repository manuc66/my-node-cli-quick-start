// env.d.ts
declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV?: "development" | "production" | "test";
    LOG_LEVEL?: "debug" | "info" | "warn" | "error";
    SECRET?: string;
  }
}

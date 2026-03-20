import { trace } from "@opentelemetry/api";

export type LogLevel = "debug" | "info" | "warn" | "error";

export interface RapidataRuntimeConfig {
  enableBetaFeatures: boolean;
  logging: {
    level: LogLevel;
    silentMode: boolean;
    enableOtlp: boolean;
  };
  upload: {
    cacheToDisk: boolean;
    cacheLocation: string;
    maxWorkers: number;
    batchSize: number;
    batchPollInterval: number;
  };
}

export const rapidataConfig: RapidataRuntimeConfig = {
  enableBetaFeatures: false,
  logging: {
    level: "info",
    silentMode: false,
    enableOtlp: true,
  },
  upload: {
    cacheToDisk: false,
    cacheLocation: ".rapidata-cache",
    maxWorkers: 4,
    batchSize: 25,
    batchPollInterval: 2_000,
  },
};

const levelWeight: Record<LogLevel, number> = {
  debug: 10,
  info: 20,
  warn: 30,
  error: 40,
};

function shouldLog(level: LogLevel) {
  if (rapidataConfig.logging.silentMode) {
    return false;
  }

  return levelWeight[level] >= levelWeight[rapidataConfig.logging.level];
}

export const logger = {
  debug(message: string, ...args: unknown[]) {
    if (shouldLog("debug")) {
      console.debug(message, ...args);
    }
  },
  info(message: string, ...args: unknown[]) {
    if (shouldLog("info")) {
      console.info(message, ...args);
    }
  },
  warn(message: string, ...args: unknown[]) {
    if (shouldLog("warn")) {
      console.warn(message, ...args);
    }
  },
  error(message: string, ...args: unknown[]) {
    if (shouldLog("error")) {
      console.error(message, ...args);
    }
  },
};

export function managedPrint(...args: unknown[]) {
  if (!rapidataConfig.logging.silentMode) {
    console.log(...args);
  }
}

export class RapidataTracer {
  private readonly tracer = trace.getTracer("rapidata-typescript-sdk");

  private sessionId?: string;

  private userInfo?: { clientId?: string; email?: string };

  setSessionId(sessionId: string) {
    this.sessionId = sessionId;
  }

  setUserInfo(userInfo: { clientId?: string; email?: string }) {
    this.userInfo = userInfo;
  }

  startActiveSpan<T>(name: string, fn: () => Promise<T>): Promise<T> {
    return this.tracer.startActiveSpan(name, (span) => {
      if (this.sessionId) {
        span.setAttribute("rapidata.session_id", this.sessionId);
      }

      if (this.userInfo?.clientId) {
        span.setAttribute("enduser.id", this.userInfo.clientId);
      }

      if (this.userInfo?.email) {
        span.setAttribute("enduser.email", this.userInfo.email);
      }

      return fn()
        .then((result) => {
          span.end();
          return result;
        })
        .catch((error: unknown) => {
          span.recordException(error instanceof Error ? error : new Error(String(error)));
          span.end();
          throw error;
        });
    });
  }
}

export const tracer = new RapidataTracer();

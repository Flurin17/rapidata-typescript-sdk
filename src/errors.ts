export class RapidataError extends Error {
  readonly statusCode?: number;

  readonly details?: unknown;

  readonly originalError?: unknown;

  constructor(message: string, options?: {
    statusCode?: number;
    details?: unknown;
    originalError?: unknown;
  }) {
    super(message);
    this.name = "RapidataError";
    this.statusCode = options?.statusCode;
    this.details = options?.details;
    this.originalError = options?.originalError;
  }
}

export class FailedUpload<T> {
  constructor(
    readonly item: T,
    readonly errorType: string,
    readonly errorMessage: string,
  ) {}

  static fromException<T>(item: T, error: unknown) {
    if (error instanceof RapidataError) {
      return new FailedUpload(item, "RapidataError", error.message);
    }

    if (error instanceof Error) {
      return new FailedUpload(item, error.name || "Error", error.message);
    }

    return new FailedUpload(item, "UnknownError", String(error));
  }
}

export class FailedUploadException<T> extends Error {
  readonly failedUploads: Array<FailedUpload<T>>;

  readonly datasetId?: string;

  readonly orderId?: string;

  readonly jobDefinitionId?: string;

  constructor(message: string, options: {
    failedUploads: Array<FailedUpload<T>>;
    datasetId?: string;
    orderId?: string;
    jobDefinitionId?: string;
  }) {
    super(message);
    this.name = "FailedUploadException";
    this.failedUploads = options.failedUploads;
    this.datasetId = options.datasetId;
    this.orderId = options.orderId;
    this.jobDefinitionId = options.jobDefinitionId;
  }
}

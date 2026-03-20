/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BatchUploadStatus } from './BatchUploadStatus';
import type { GetBatchUploadResultEndpoint_UrlOutput } from './GetBatchUploadResultEndpoint_UrlOutput';
export type GetBatchUploadResultEndpoint_Output = {
    /**
     * The identifier of the batch upload.
     */
    batchUploadId: string;
    status: BatchUploadStatus;
    /**
     * The total number of URLs in the batch.
     */
    totalCount: number;
    /**
     * The number of URLs that have been successfully processed.
     */
    completedCount: number;
    /**
     * The number of URLs that failed to process.
     */
    failedCount: number;
    /**
     * The individual results for each URL in the batch.
     */
    items: Array<GetBatchUploadResultEndpoint_UrlOutput>;
};


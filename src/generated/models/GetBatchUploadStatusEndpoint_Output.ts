/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BatchUploadStatus } from './BatchUploadStatus';
export type GetBatchUploadStatusEndpoint_Output = {
    status: BatchUploadStatus;
    /**
     * The total number of URLs across all queried batches.
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
     * The identifiers of batch uploads that have fully completed.
     */
    completedBatches: Array<string>;
};


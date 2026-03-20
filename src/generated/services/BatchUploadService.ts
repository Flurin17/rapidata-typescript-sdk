/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateBatchUploadEndpoint_Input } from '../models/CreateBatchUploadEndpoint_Input';
import type { CreateBatchUploadEndpoint_Output } from '../models/CreateBatchUploadEndpoint_Output';
import type { GetBatchUploadResultEndpoint_Output } from '../models/GetBatchUploadResultEndpoint_Output';
import type { GetBatchUploadStatusEndpoint_Output } from '../models/GetBatchUploadStatusEndpoint_Output';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class BatchUploadService {
    /**
     * Aborts the specified batch upload.
     * URLs already processed will not be reverted. Only remaining URLs are prevented from processing.
     * @returns void
     * @throws ApiError
     */
    public static postAssetBatchUploadAbort({
        batchUploadId,
    }: {
        /**
         * The identifier of the batch upload to abort.
         */
        batchUploadId: string,
    }): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/asset/batch-upload/{batchUploadId}/abort',
            path: {
                'batchUploadId': batchUploadId,
            },
            errors: {
                400: `Bad Request`,
                401: `Unauthenticated`,
                403: `Forbidden`,
            },
        });
    }
    /**
     * Creates a batch upload and queues processing for each URL.
     * Each URL is processed asynchronously. Use the batch upload status or result endpoints to track progress.
     * @returns CreateBatchUploadEndpoint_Output OK
     * @throws ApiError
     */
    public static postAssetBatchUpload({
        requestBody,
    }: {
        /**
         * The list of URLs to include in the batch upload.
         */
        requestBody: CreateBatchUploadEndpoint_Input,
    }): CancelablePromise<CreateBatchUploadEndpoint_Output> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/asset/batch-upload',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
                401: `Unauthenticated`,
                403: `Forbidden`,
            },
        });
    }
    /**
     * Gets the full result of a batch upload including all items.
     * @returns GetBatchUploadResultEndpoint_Output OK
     * @throws ApiError
     */
    public static getAssetBatchUpload({
        batchUploadId,
    }: {
        /**
         * The identifier of the batch upload to retrieve.
         */
        batchUploadId: string,
    }): CancelablePromise<GetBatchUploadResultEndpoint_Output> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/asset/batch-upload/{batchUploadId}',
            path: {
                'batchUploadId': batchUploadId,
            },
            errors: {
                400: `Bad Request`,
                401: `Unauthenticated`,
                403: `Forbidden`,
            },
        });
    }
    /**
     * Gets aggregated status for batch uploads identified by IDs or a correlation ID.
     * @returns GetBatchUploadStatusEndpoint_Output OK
     * @throws ApiError
     */
    public static getAssetBatchUploadStatus({
        batchUploadIds,
        correlationId,
    }: {
        /**
         * The identifiers of the batch uploads to query.
         */
        batchUploadIds?: Array<string>,
        /**
         * A client-supplied identifier to look up related batch uploads.
         */
        correlationId?: string,
    }): CancelablePromise<GetBatchUploadStatusEndpoint_Output> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/asset/batch-upload/status',
            query: {
                'batchUploadIds': batchUploadIds,
                'correlationId': correlationId,
            },
            errors: {
                400: `Bad Request`,
                401: `Unauthenticated`,
                403: `Forbidden`,
            },
        });
    }
}

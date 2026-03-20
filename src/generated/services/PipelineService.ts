/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { FileStreamResult } from '../models/FileStreamResult';
import type { GetPipelineByIdResult } from '../models/GetPipelineByIdResult';
import type { PreliminaryDownloadModel } from '../models/PreliminaryDownloadModel';
import type { StartPreliminaryDownloadResult } from '../models/StartPreliminaryDownloadResult';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class PipelineService {
    /**
     * Gets a pipeline by its id.
     * @returns GetPipelineByIdResult OK
     * @throws ApiError
     */
    public static getPipeline({
        pipelineId,
    }: {
        /**
         * The id of the pipeline to get.
         */
        pipelineId: string,
    }): CancelablePromise<GetPipelineByIdResult> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/pipeline/{pipelineId}',
            path: {
                'pipelineId': pipelineId,
            },
        });
    }
    /**
     * Initiates a preliminary download of the pipeline.
     * @returns StartPreliminaryDownloadResult OK
     * @throws ApiError
     */
    public static postPipelinePreliminaryDownload({
        pipelineId,
        requestBody,
    }: {
        /**
         * The id of the pipeline to initiate the download for.
         */
        pipelineId: string,
        /**
         * The body request.
         */
        requestBody: PreliminaryDownloadModel,
    }): CancelablePromise<StartPreliminaryDownloadResult> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/pipeline/{pipelineId}/preliminary-download',
            path: {
                'pipelineId': pipelineId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Gets the preliminary download.
     * If it's still processing the request will return 202 Accepted.
     * @returns FileStreamResult OK
     * @returns any Accepted
     * @throws ApiError
     */
    public static getPipelinePreliminaryDownload({
        preliminaryDownloadId,
    }: {
        /**
         * The id of the preliminary download to get.
         */
        preliminaryDownloadId: string,
    }): CancelablePromise<FileStreamResult | any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/pipeline/preliminary-download/{preliminaryDownloadId}',
            path: {
                'preliminaryDownloadId': preliminaryDownloadId,
            },
        });
    }
}

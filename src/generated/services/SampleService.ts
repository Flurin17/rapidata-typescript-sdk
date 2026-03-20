/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { GetSampleByIdResult } from '../models/GetSampleByIdResult';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class SampleService {
    /**
     * Gets a sample by its Id.
     * @returns GetSampleByIdResult OK
     * @throws ApiError
     */
    public static getBenchmarkSample({
        sampleId,
    }: {
        /**
         * The Id of the sample to be retrieved
         */
        sampleId: string,
    }): CancelablePromise<GetSampleByIdResult> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/benchmark-sample/{sampleId}',
            path: {
                'sampleId': sampleId,
            },
        });
    }
}

/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { GetDatapointByIdResult } from '../models/GetDatapointByIdResult';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class DatapointService {
    /**
     * Gets a datapoint by its id.
     * @returns GetDatapointByIdResult OK
     * @throws ApiError
     */
    public static getDatapoint({
        datapointId,
    }: {
        /**
         * The id of the datapoint to get.
         */
        datapointId: string,
    }): CancelablePromise<GetDatapointByIdResult> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/datapoint/{datapointId}',
            path: {
                'datapointId': datapointId,
            },
        });
    }
    /**
     * Deletes a datapoint by its id.
     * @returns void
     * @throws ApiError
     */
    public static deleteDatapoint({
        datapointId,
    }: {
        /**
         * The id of the datapoint to delete.
         */
        datapointId: string,
    }): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/datapoint/{datapointId}',
            path: {
                'datapointId': datapointId,
            },
        });
    }
}

/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateDatasetGroupEndpoint_Input } from '../models/CreateDatasetGroupEndpoint_Input';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class DatasetGroupService {
    /**
     * Creates a new dataset group.
     * @returns void
     * @throws ApiError
     */
    public static postDatasetGroup({
        datasetId,
        requestBody,
    }: {
        /**
         * The id of the dataset to create the group for.
         */
        datasetId: string,
        /**
         * The dataset group creation parameters.
         */
        requestBody: CreateDatasetGroupEndpoint_Input,
    }): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/dataset/{datasetId}/group',
            path: {
                'datasetId': datasetId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
                401: `Unauthenticated`,
                403: `Forbidden`,
            },
        });
    }
}

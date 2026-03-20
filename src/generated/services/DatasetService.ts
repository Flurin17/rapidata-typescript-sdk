/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateDatapointModel } from '../models/CreateDatapointModel';
import type { CreateDatapointResult } from '../models/CreateDatapointResult';
import type { CreateDatasetEndpoint_Input } from '../models/CreateDatasetEndpoint_Input';
import type { CreateDatasetEndpoint_Output } from '../models/CreateDatasetEndpoint_Output';
import type { GetDatasetByIdResult } from '../models/GetDatasetByIdResult';
import type { GetDatasetProgressResult } from '../models/GetDatasetProgressResult';
import type { GetFailedDatapointsResult } from '../models/GetFailedDatapointsResult';
import type { PagedResultOfQueryDatapointsByDatasetIdResult } from '../models/PagedResultOfQueryDatapointsByDatasetIdResult';
import type { UpdateDatasetNameModel } from '../models/UpdateDatasetNameModel';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class DatasetService {
    /**
     * Creates a new empty dataset.
     * @returns CreateDatasetEndpoint_Output OK
     * @throws ApiError
     */
    public static postDataset({
        requestBody,
    }: {
        /**
         * The dataset creation parameters.
         */
        requestBody: CreateDatasetEndpoint_Input,
    }): CancelablePromise<CreateDatasetEndpoint_Output> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/dataset',
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
     * Gets a dataset by its id.
     * @returns GetDatasetByIdResult OK
     * @throws ApiError
     */
    public static getDataset({
        datasetId,
    }: {
        /**
         * The id of the dataset to get.
         */
        datasetId: string,
    }): CancelablePromise<GetDatasetByIdResult> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/dataset/{datasetId}',
            path: {
                'datasetId': datasetId,
            },
        });
    }
    /**
     * Gets all datapoints of a dataset.
     * @returns PagedResultOfQueryDatapointsByDatasetIdResult OK
     * @throws ApiError
     */
    public static getDatasetDatapoints({
        datasetId,
        request,
    }: {
        /**
         * The id of the dataset to get the datapoints of.
         */
        datasetId: string,
        /**
         * The query model to filter, sort, and paginate the results.
         */
        request?: any,
    }): CancelablePromise<PagedResultOfQueryDatapointsByDatasetIdResult> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/dataset/{datasetId}/datapoints',
            path: {
                'datasetId': datasetId,
            },
            query: {
                'request': request,
            },
        });
    }
    /**
     * Gets the upload progress of a dataset.
     * @returns GetDatasetProgressResult OK
     * @throws ApiError
     */
    public static getDatasetProgress({
        datasetId,
    }: {
        /**
         * The id of the dataset to get the progress of.
         */
        datasetId: string,
    }): CancelablePromise<GetDatasetProgressResult> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/dataset/{datasetId}/progress',
            path: {
                'datasetId': datasetId,
            },
        });
    }
    /**
     * Gets a list of all datapoints that failed to upload.
     * A datapoint usually fails to upload when using a deferred upload mechanism such as when providing a URL
     * and the URL is not accessible.
     * @returns GetFailedDatapointsResult OK
     * @throws ApiError
     */
    public static getDatasetDatapointsFailed({
        datasetId,
    }: {
        /**
         * The id of the dataset to get the failed datapoints of.
         */
        datasetId: string,
    }): CancelablePromise<GetFailedDatapointsResult> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/dataset/{datasetId}/datapoints/failed',
            path: {
                'datasetId': datasetId,
            },
        });
    }
    /**
     * Creates a datapoint with JSON body.
     * @returns CreateDatapointResult OK
     * @throws ApiError
     */
    public static postDatasetDatapoint({
        datasetId,
        requestBody,
    }: {
        /**
         * The id of the dataset to create the datapoint in.
         */
        datasetId: string,
        /**
         * The datapoint model containing asset, metadata, and sort index.
         */
        requestBody: CreateDatapointModel,
    }): CancelablePromise<CreateDatapointResult> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/dataset/{datasetId}/datapoint',
            path: {
                'datasetId': datasetId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Updates the name of a dataset.
     * @returns void
     * @throws ApiError
     */
    public static patchDatasetName({
        datasetId,
        requestBody,
    }: {
        /**
         * The id of the dataset to update.
         */
        datasetId: string,
        /**
         * The body of the request.
         */
        requestBody: UpdateDatasetNameModel,
    }): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/dataset/{datasetId}/name',
            path: {
                'datasetId': datasetId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
}

/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AddExampleToAudienceEndpoint_Input } from '../models/AddExampleToAudienceEndpoint_Input';
import type { QueryExamplesForAudienceEndpoint_PagedResultOfOutput } from '../models/QueryExamplesForAudienceEndpoint_PagedResultOfOutput';
import type { UpdateAudienceExampleEndpoint_Input } from '../models/UpdateAudienceExampleEndpoint_Input';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ExamplesService {
    /**
     * Adds a new example to an audience.
     * @returns void
     * @throws ApiError
     */
    public static postAudienceExample({
        audienceId,
        requestBody,
    }: {
        /**
         * The unique identifier of the audience.
         */
        audienceId: string,
        /**
         * The example data to add.
         */
        requestBody: AddExampleToAudienceEndpoint_Input,
    }): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/audience/{audienceId}/example',
            path: {
                'audienceId': audienceId,
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
    /**
     * Deletes the specified audience example.
     * @returns void
     * @throws ApiError
     */
    public static deleteAudienceExample({
        exampleId,
    }: {
        /**
         * The unique identifier of the example to delete.
         */
        exampleId: string,
    }): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/audience/example/{exampleId}',
            path: {
                'exampleId': exampleId,
            },
            errors: {
                400: `Bad Request`,
                401: `Unauthenticated`,
                403: `Forbidden`,
            },
        });
    }
    /**
     * Queries all examples for the specified audience.
     * @returns QueryExamplesForAudienceEndpoint_PagedResultOfOutput OK
     * @throws ApiError
     */
    public static getAudienceExamples({
        audienceId,
        page,
        pageSize,
    }: {
        /**
         * The unique identifier of the audience.
         */
        audienceId: string,
        /**
         * The 1-based page index.
         */
        page?: number,
        /**
         * The number of items per page.
         */
        pageSize?: number,
    }): CancelablePromise<QueryExamplesForAudienceEndpoint_PagedResultOfOutput> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/audience/{audienceId}/examples',
            path: {
                'audienceId': audienceId,
            },
            query: {
                'page': page,
                'page_size': pageSize,
            },
            errors: {
                400: `Bad Request`,
                401: `Unauthenticated`,
                403: `Forbidden`,
            },
        });
    }
    /**
     * Updates an example's properties within an audience.
     * @returns void
     * @throws ApiError
     */
    public static patchAudienceExample({
        audienceId,
        exampleId,
        requestBody,
    }: {
        /**
         * The unique identifier of the audience.
         */
        audienceId: string,
        /**
         * The unique identifier of the example to update.
         */
        exampleId: string,
        /**
         * The example properties to update.
         */
        requestBody: UpdateAudienceExampleEndpoint_Input,
    }): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/audience/{audienceId}/example/{exampleId}',
            path: {
                'audienceId': audienceId,
                'exampleId': exampleId,
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

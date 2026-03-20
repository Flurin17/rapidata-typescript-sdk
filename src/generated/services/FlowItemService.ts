/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class FlowItemService {
    /**
     * Stops the specified flow item and triggers partial result processing.
     * @returns void
     * @throws ApiError
     */
    public static postFlowItemStop({
        flowItemId,
    }: {
        /**
         * The ID of the flow item to stop.
         */
        flowItemId: string,
    }): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/flow/item/{flowItemId}/stop',
            path: {
                'flowItemId': flowItemId,
            },
            errors: {
                400: `Bad Request`,
                401: `Unauthenticated`,
                403: `Forbidden`,
            },
        });
    }
}

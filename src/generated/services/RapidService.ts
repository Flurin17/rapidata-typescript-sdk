/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class RapidService {
    /**
     * Rejects a completed rapid, marking its results as invalid.
     * The rapid must be in the Done state. Rejection propagates staleness to dependent entities.
     * @returns void
     * @throws ApiError
     */
    public static postRapidReject({
        rapidId,
    }: {
        /**
         * The identifier of the rapid to reject.
         */
        rapidId: string,
    }): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/rapid/{rapidId}/reject',
            path: {
                'rapidId': rapidId,
            },
            errors: {
                400: `Bad Request`,
                401: `Unauthenticated`,
                403: `Forbidden`,
            },
        });
    }
}

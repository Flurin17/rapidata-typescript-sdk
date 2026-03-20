/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { UpdateAudienceRapidEndpoint_Input } from '../models/UpdateAudienceRapidEndpoint_Input';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class RapidsService {
    /**
     * Updates a rapid's validation properties within an audience.
     * @returns void
     * @throws ApiError
     */
    public static patchAudienceRapid({
        audienceId,
        rapidId,
        requestBody,
    }: {
        /**
         * The unique identifier of the audience.
         */
        audienceId: string,
        /**
         * The unique identifier of the rapid to update.
         */
        rapidId: string,
        /**
         * The rapid validation properties to update.
         */
        requestBody: UpdateAudienceRapidEndpoint_Input,
    }): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/audience/{audienceId}/rapid/{rapidId}',
            path: {
                'audienceId': audienceId,
                'rapidId': rapidId,
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

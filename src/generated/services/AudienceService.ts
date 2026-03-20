/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateAudienceRequest } from '../models/CreateAudienceRequest';
import type { CreateAudienceResult } from '../models/CreateAudienceResult';
import type { GetAudienceByIdResult } from '../models/GetAudienceByIdResult';
import type { GetAudienceUserStateMetricsResult } from '../models/GetAudienceUserStateMetricsResult';
import type { PagedResultOfQueryAudiencesResult } from '../models/PagedResultOfQueryAudiencesResult';
import type { PagedResultOfQueryJobsResult } from '../models/PagedResultOfQueryJobsResult';
import type { RecreateExternalAudiencesEndpoint_Input } from '../models/RecreateExternalAudiencesEndpoint_Input';
import type { UpdateAudienceRequest } from '../models/UpdateAudienceRequest';
import type { UpdateBoostConfigEndpoint_Input } from '../models/UpdateBoostConfigEndpoint_Input';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AudienceService {
    /**
     * Deletes the specified audience.
     * @returns void
     * @throws ApiError
     */
    public static deleteAudience({
        audienceId,
    }: {
        /**
         * The unique identifier of the audience to delete.
         */
        audienceId: string,
    }): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/audience/{audienceId}',
            path: {
                'audienceId': audienceId,
            },
            errors: {
                400: `Bad Request`,
                401: `Unauthenticated`,
                403: `Forbidden`,
            },
        });
    }
    /**
     * Gets an audience by its Id.
     * @returns GetAudienceByIdResult OK
     * @throws ApiError
     */
    public static getAudience({
        audienceId,
    }: {
        /**
         * The id of the audience to get.
         */
        audienceId: string,
    }): CancelablePromise<GetAudienceByIdResult> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/audience/{audienceId}',
            path: {
                'audienceId': audienceId,
            },
        });
    }
    /**
     * Patches an existing audience.
     * @returns void
     * @throws ApiError
     */
    public static patchAudience({
        audienceId,
        requestBody,
    }: {
        audienceId: string,
        requestBody: UpdateAudienceRequest,
    }): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/audience/{audienceId}',
            path: {
                'audienceId': audienceId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Gets the count of users in each state for the specified audience.
     * @returns GetAudienceUserStateMetricsResult OK
     * @throws ApiError
     */
    public static getAudienceUserMetrics({
        audienceId,
    }: {
        /**
         * The unique identifier of the audience.
         */
        audienceId: string,
    }): CancelablePromise<GetAudienceUserStateMetricsResult> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/audience/{audienceId}/user-metrics',
            path: {
                'audienceId': audienceId,
            },
            errors: {
                400: `Bad Request`,
                401: `Unauthenticated`,
                403: `Forbidden`,
            },
        });
    }
    /**
     * Pauses the distillation campaign for the specified audience.
     * @returns void
     * @throws ApiError
     */
    public static postAudiencePauseDistillation({
        audienceId,
    }: {
        /**
         * The unique identifier of the audience.
         */
        audienceId: string,
    }): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/audience/{audienceId}/pause-distillation',
            path: {
                'audienceId': audienceId,
            },
            errors: {
                400: `Bad Request`,
                401: `Unauthenticated`,
                403: `Forbidden`,
            },
        });
    }
    /**
     * Queries jobs for the specified audience.
     * @returns PagedResultOfQueryJobsResult OK
     * @throws ApiError
     */
    public static getAudienceJobs({
        audienceId,
    }: {
        /**
         * The unique identifier of the audience.
         */
        audienceId: string,
    }): CancelablePromise<PagedResultOfQueryJobsResult> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/audience/{audienceId}/jobs',
            path: {
                'audienceId': audienceId,
            },
            errors: {
                400: `Bad Request`,
                401: `Unauthenticated`,
                403: `Forbidden`,
            },
        });
    }
    /**
     * Rebuilds the distilling campaign for the specified audience.
     * Recalculates campaign filters and selections based on the audience's current settings
     * (demographic filters, exit conditions, etc.).
     * @returns void
     * @throws ApiError
     */
    public static postAudienceRebuildDistillingCampaign({
        audienceId,
    }: {
        /**
         * The unique identifier of the audience.
         */
        audienceId: string,
    }): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/audience/{audienceId}/rebuild-distilling-campaign',
            path: {
                'audienceId': audienceId,
            },
            errors: {
                400: `Bad Request`,
                401: `Unauthenticated`,
                403: `Forbidden`,
            },
        });
    }
    /**
     * Recreates external audiences for the specified audience.
     * @returns void
     * @throws ApiError
     */
    public static postAudienceRecreateExternalAudiences({
        audienceId,
        requestBody,
    }: {
        /**
         * The unique identifier of the audience.
         */
        audienceId: string,
        /**
         * Configuration for which external audiences to recreate.
         */
        requestBody: RecreateExternalAudiencesEndpoint_Input,
    }): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/audience/{audienceId}/recreate-external-audiences',
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
     * Resumes the distillation campaign for the specified audience.
     * @returns void
     * @throws ApiError
     */
    public static postAudienceResumeDistillation({
        audienceId,
    }: {
        /**
         * The unique identifier of the audience.
         */
        audienceId: string,
    }): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/audience/{audienceId}/resume-distillation',
            path: {
                'audienceId': audienceId,
            },
            errors: {
                400: `Bad Request`,
                401: `Unauthenticated`,
                403: `Forbidden`,
            },
        });
    }
    /**
     * Starts recruiting users for the specified audience.
     * @returns void
     * @throws ApiError
     */
    public static postAudienceRecruit({
        audienceId,
    }: {
        /**
         * The unique identifier of the audience.
         */
        audienceId: string,
    }): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/audience/{audienceId}/recruit',
            path: {
                'audienceId': audienceId,
            },
            errors: {
                400: `Bad Request`,
                401: `Unauthenticated`,
                403: `Forbidden`,
            },
        });
    }
    /**
     * Updates the boost configuration for the specified audience.
     * @returns void
     * @throws ApiError
     */
    public static patchAudienceBoostConfig({
        audienceId,
        requestBody,
    }: {
        /**
         * The unique identifier of the audience.
         */
        audienceId: string,
        /**
         * The boost configuration values to update.
         */
        requestBody: UpdateBoostConfigEndpoint_Input,
    }): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/audience/{audienceId}/boost-config',
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
     * Queries all available audiences.
     * @returns PagedResultOfQueryAudiencesResult OK
     * @throws ApiError
     */
    public static getAudiences({
        request,
    }: {
        request?: any,
    }): CancelablePromise<PagedResultOfQueryAudiencesResult> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/audiences',
            query: {
                'request': request,
            },
        });
    }
    /**
     * Creates a new empty audience.
     * An audience is a group of users that are trained to solve particular tasks.
     * @returns CreateAudienceResult OK
     * @throws ApiError
     */
    public static postAudience({
        requestBody,
    }: {
        requestBody: CreateAudienceRequest,
    }): CancelablePromise<CreateAudienceResult> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/audience',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
}

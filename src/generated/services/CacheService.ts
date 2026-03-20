/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { GetCampaignCacheEndpoint_Output } from '../models/GetCampaignCacheEndpoint_Output';
import type { GetUserScoreCacheEndpoint_Output } from '../models/GetUserScoreCacheEndpoint_Output';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class CacheService {
    /**
     * Returns the current state of the in-memory campaign cache.
     * @returns GetCampaignCacheEndpoint_Output OK
     * @throws ApiError
     */
    public static getCampaignCacheCampaigns(): CancelablePromise<GetCampaignCacheEndpoint_Output> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/campaign/cache/campaigns',
            errors: {
                400: `Bad Request`,
                401: `Unauthenticated`,
                403: `Forbidden`,
            },
        });
    }
    /**
     * Returns the current state of the in-memory default user score cache.
     * @returns GetUserScoreCacheEndpoint_Output OK
     * @throws ApiError
     */
    public static getCampaignCacheUserScores(): CancelablePromise<GetUserScoreCacheEndpoint_Output> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/campaign/cache/user-scores',
            errors: {
                400: `Bad Request`,
                401: `Unauthenticated`,
                403: `Forbidden`,
            },
        });
    }
}

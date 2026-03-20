/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ChangeBoostEndpoint_Input } from '../models/ChangeBoostEndpoint_Input';
import type { GetBoostStatusEndpoint_Output } from '../models/GetBoostStatusEndpoint_Output';
import type { QueryCampaignsEndpoint_PagedResultOfOutput } from '../models/QueryCampaignsEndpoint_PagedResultOfOutput';
import type { UpdateCampaignEndpoint_Input } from '../models/UpdateCampaignEndpoint_Input';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class CampaignService {
    /**
     * Changes the boost configuration.
     * @returns void
     * @throws ApiError
     */
    public static putCampaignBoost({
        requestBody,
    }: {
        /**
         * The boost configuration to apply.
         */
        requestBody: ChangeBoostEndpoint_Input,
    }): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/campaign/boost',
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
     * Returns the current boost status including active and inactive campaigns.
     * @returns GetBoostStatusEndpoint_Output OK
     * @throws ApiError
     */
    public static getCampaignBoostStatus(): CancelablePromise<GetBoostStatusEndpoint_Output> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/campaign/boost/status',
            errors: {
                400: `Bad Request`,
                401: `Unauthenticated`,
                403: `Forbidden`,
            },
        });
    }
    /**
     * @returns any OK
     * @throws ApiError
     */
    public static getCampaignMonitor(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/campaign/monitor',
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * Pauses the specified campaign.
     * @returns void
     * @throws ApiError
     */
    public static postCampaignPause({
        campaignId,
    }: {
        /**
         * The identifier of the campaign to pause.
         */
        campaignId: string,
    }): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/campaign/{campaignId}/pause',
            path: {
                'campaignId': campaignId,
            },
            errors: {
                400: `Bad Request`,
                401: `Unauthenticated`,
                403: `Forbidden`,
            },
        });
    }
    /**
     * Queries campaigns with optional filtering, sorting, and pagination.
     * @returns QueryCampaignsEndpoint_PagedResultOfOutput OK
     * @throws ApiError
     */
    public static getCampaigns({
        page,
        pageSize,
        sort,
        id,
        name,
        status,
        priority,
        ownerMail,
        createdAt,
    }: {
        /**
         * The 1-based page index.
         */
        page?: number,
        /**
         * The number of items per page.
         */
        pageSize?: number,
        /**
         * Sort fields. Prefix with - for descending order (e.g. -created_at).
         */
        sort?: Array<'name' | '-name' | 'priority' | '-priority' | 'status' | '-status' | 'created_at' | '-created_at'>,
        /**
         * Filter by id.
         */
        id?: {
            eq?: string;
            neq?: string;
            gt?: string;
            gte?: string;
            lt?: string;
            lte?: string;
            contains?: string;
            starts_with?: string;
            ends_with?: string;
            in?: string;
            not_contains?: string;
        },
        /**
         * Filter by name.
         */
        name?: {
            eq?: string;
            neq?: string;
            gt?: string;
            gte?: string;
            lt?: string;
            lte?: string;
            contains?: string;
            starts_with?: string;
            ends_with?: string;
            in?: string;
            not_contains?: string;
        },
        /**
         * Filter by status.
         */
        status?: {
            eq?: string;
            neq?: string;
            gt?: string;
            gte?: string;
            lt?: string;
            lte?: string;
            contains?: string;
            starts_with?: string;
            ends_with?: string;
            in?: string;
            not_contains?: string;
        },
        /**
         * Filter by priority.
         */
        priority?: {
            eq?: string;
            neq?: string;
            gt?: string;
            gte?: string;
            lt?: string;
            lte?: string;
            contains?: string;
            starts_with?: string;
            ends_with?: string;
            in?: string;
            not_contains?: string;
        },
        /**
         * Filter by owner_mail.
         */
        ownerMail?: {
            eq?: string;
            neq?: string;
            gt?: string;
            gte?: string;
            lt?: string;
            lte?: string;
            contains?: string;
            starts_with?: string;
            ends_with?: string;
            in?: string;
            not_contains?: string;
        },
        /**
         * Filter by created_at.
         */
        createdAt?: {
            eq?: string;
            neq?: string;
            gt?: string;
            gte?: string;
            lt?: string;
            lte?: string;
            contains?: string;
            starts_with?: string;
            ends_with?: string;
            in?: string;
            not_contains?: string;
        },
    }): CancelablePromise<QueryCampaignsEndpoint_PagedResultOfOutput> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/campaigns',
            query: {
                'page': page,
                'page_size': pageSize,
                'sort': sort,
                'id': id,
                'name': name,
                'status': status,
                'priority': priority,
                'owner_mail': ownerMail,
                'created_at': createdAt,
            },
            errors: {
                400: `Bad Request`,
                401: `Unauthenticated`,
                403: `Forbidden`,
            },
        });
    }
    /**
     * Resumes the specified campaign.
     * @returns void
     * @throws ApiError
     */
    public static postCampaignResume({
        campaignId,
    }: {
        /**
         * The identifier of the campaign to resume.
         */
        campaignId: string,
    }): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/campaign/{campaignId}/resume',
            path: {
                'campaignId': campaignId,
            },
            errors: {
                400: `Bad Request`,
                401: `Unauthenticated`,
                403: `Forbidden`,
            },
        });
    }
    /**
     * Updates the specified campaign's properties.
     * @returns void
     * @throws ApiError
     */
    public static patchCampaign({
        campaignId,
        requestBody,
    }: {
        /**
         * The identifier of the campaign to update.
         */
        campaignId: string,
        /**
         * The properties to update.
         */
        requestBody: UpdateCampaignEndpoint_Input,
    }): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/campaign/{campaignId}',
            path: {
                'campaignId': campaignId,
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

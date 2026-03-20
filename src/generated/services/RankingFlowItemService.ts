/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateFlowItemEndpoint_Input } from '../models/CreateFlowItemEndpoint_Input';
import type { CreateFlowItemEndpoint_Output } from '../models/CreateFlowItemEndpoint_Output';
import type { GetFlowItemByIdEndpoint_Output } from '../models/GetFlowItemByIdEndpoint_Output';
import type { GetRankingFlowItemResultsEndpoint_Output } from '../models/GetRankingFlowItemResultsEndpoint_Output';
import type { GetRankingFlowItemVoteMatrixEndpoint_Output } from '../models/GetRankingFlowItemVoteMatrixEndpoint_Output';
import type { QueryFlowItemsEndpoint_PagedResultOfOutput } from '../models/QueryFlowItemsEndpoint_PagedResultOfOutput';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class RankingFlowItemService {
    /**
     * Creates a new flow item for the specified flow.
     * @returns CreateFlowItemEndpoint_Output OK
     * @throws ApiError
     */
    public static postFlowRankingItem({
        flowId,
        requestBody,
    }: {
        /**
         * The ID of the flow to create the item in.
         */
        flowId: string,
        /**
         * The flow item creation parameters.
         */
        requestBody: CreateFlowItemEndpoint_Input,
    }): CancelablePromise<CreateFlowItemEndpoint_Output> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/flow/ranking/{flowId}/item',
            path: {
                'flowId': flowId,
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
     * Queries flow items for a flow.
     * @returns QueryFlowItemsEndpoint_PagedResultOfOutput OK
     * @throws ApiError
     */
    public static getFlowRankingItem({
        flowId,
        page,
        pageSize,
        sort,
        state,
        createdAt,
    }: {
        /**
         * The ID of the flow to query items for.
         */
        flowId: string,
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
        sort?: Array<'state' | '-state' | 'created_at' | '-created_at'>,
        /**
         * Filter by state.
         */
        state?: {
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
    }): CancelablePromise<QueryFlowItemsEndpoint_PagedResultOfOutput> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/flow/ranking/{flowId}/item',
            path: {
                'flowId': flowId,
            },
            query: {
                'page': page,
                'page_size': pageSize,
                'sort': sort,
                'state': state,
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
     * Retrieves a flow item by its ID.
     * @returns GetFlowItemByIdEndpoint_Output OK
     * @throws ApiError
     */
    public static getFlowRankingItem1({
        flowItemId,
    }: {
        /**
         * The ID of the flow item to retrieve.
         */
        flowItemId: string,
    }): CancelablePromise<GetFlowItemByIdEndpoint_Output> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/flow/ranking/item/{flowItemId}',
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
    /**
     * Returns ranking results with Elo scores for a completed flow item.
     * Returns 409 Conflict if the flow item is not yet completed or has no associated workflow.
     * @returns GetRankingFlowItemResultsEndpoint_Output OK
     * @throws ApiError
     */
    public static getFlowRankingItemResults({
        flowItemId,
    }: {
        /**
         * The ID of the flow item to get results for.
         */
        flowItemId: string,
    }): CancelablePromise<GetRankingFlowItemResultsEndpoint_Output> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/flow/ranking/item/{flowItemId}/results',
            path: {
                'flowItemId': flowItemId,
            },
            errors: {
                400: `Bad Request`,
                401: `Unauthenticated`,
                403: `Forbidden`,
                409: `Conflict`,
            },
        });
    }
    /**
     * Retrieves the pairwise vote matrix for a completed flow item.
     * Returns 409 Conflict if the flow item is not completed or has no associated workflow.
     * @returns GetRankingFlowItemVoteMatrixEndpoint_Output OK
     * @throws ApiError
     */
    public static getFlowRankingItemVoteMatrix({
        flowItemId,
    }: {
        /**
         * The ID of the flow item to get the vote matrix for.
         */
        flowItemId: string,
    }): CancelablePromise<GetRankingFlowItemVoteMatrixEndpoint_Output> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/flow/ranking/item/{flowItemId}/vote-matrix',
            path: {
                'flowItemId': flowItemId,
            },
            errors: {
                400: `Bad Request`,
                401: `Unauthenticated`,
                403: `Forbidden`,
                409: `Conflict`,
            },
        });
    }
}

/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { GetCompletionTimeHistogramEndpoint_Output } from '../models/GetCompletionTimeHistogramEndpoint_Output';
import type { GetFlowByIdEndpoint_Output } from '../models/GetFlowByIdEndpoint_Output';
import type { GetFlowItemCreationTimeseriesEndpoint_Output } from '../models/GetFlowItemCreationTimeseriesEndpoint_Output';
import type { GetResponseCountHistogramEndpoint_Output } from '../models/GetResponseCountHistogramEndpoint_Output';
import type { GetResponseCountTimeseriesEndpoint_Output } from '../models/GetResponseCountTimeseriesEndpoint_Output';
import type { QueryFlowsEndpoint_PagedResultOfOutput } from '../models/QueryFlowsEndpoint_PagedResultOfOutput';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class FlowService {
    /**
     * Deletes a flow.
     * @returns void
     * @throws ApiError
     */
    public static deleteFlow({
        flowId,
    }: {
        /**
         * The ID of the flow to delete.
         */
        flowId: string,
    }): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/flow/{flowId}',
            path: {
                'flowId': flowId,
            },
            errors: {
                400: `Bad Request`,
                401: `Unauthenticated`,
                403: `Forbidden`,
            },
        });
    }
    /**
     * Retrieves a flow by its ID.
     * @returns GetFlowByIdEndpoint_Output OK
     * @throws ApiError
     */
    public static getFlow({
        flowId,
    }: {
        /**
         * The ID of the flow to retrieve.
         */
        flowId: string,
    }): CancelablePromise<GetFlowByIdEndpoint_Output> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/flow/{flowId}',
            path: {
                'flowId': flowId,
            },
            errors: {
                400: `Bad Request`,
                401: `Unauthenticated`,
                403: `Forbidden`,
            },
        });
    }
    /**
     * Returns the distribution of completion durations (in seconds) per completed flow item.
     * @returns GetCompletionTimeHistogramEndpoint_Output OK
     * @throws ApiError
     */
    public static getFlowRankingCompletionTimeHistogram({
        flowId,
        from,
        to,
        bucketCount,
    }: {
        /**
         * The ID of the flow.
         */
        flowId: string,
        /**
         * Optional start of the date range filter (inclusive).
         */
        from?: string,
        /**
         * Optional end of the date range filter (inclusive).
         */
        to?: string,
        /**
         * Number of histogram buckets (default 10, max 100).
         */
        bucketCount?: number,
    }): CancelablePromise<GetCompletionTimeHistogramEndpoint_Output> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/flow/ranking/{flowId}/completion-time-histogram',
            path: {
                'flowId': flowId,
            },
            query: {
                'from': from,
                'to': to,
                'bucketCount': bucketCount,
            },
            errors: {
                400: `Bad Request`,
                401: `Unauthenticated`,
                403: `Forbidden`,
            },
        });
    }
    /**
     * Returns flow item creation counts bucketed over time.
     * @returns GetFlowItemCreationTimeseriesEndpoint_Output OK
     * @throws ApiError
     */
    public static getFlowRankingFlowItemCreationTimeseries({
        flowId,
        from,
        to,
        datapoints,
    }: {
        /**
         * The ID of the flow.
         */
        flowId: string,
        /**
         * Optional start of the date range filter (inclusive).
         */
        from?: string,
        /**
         * Optional end of the date range filter (exclusive).
         */
        to?: string,
        /**
         * Number of time buckets (default 100, max 1000).
         */
        datapoints?: number,
    }): CancelablePromise<GetFlowItemCreationTimeseriesEndpoint_Output> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/flow/ranking/{flowId}/flow-item-creation-timeseries',
            path: {
                'flowId': flowId,
            },
            query: {
                'from': from,
                'to': to,
                'datapoints': datapoints,
            },
            errors: {
                400: `Bad Request`,
                401: `Unauthenticated`,
                403: `Forbidden`,
            },
        });
    }
    /**
     * Returns the distribution of total votes per completed flow item.
     * @returns GetResponseCountHistogramEndpoint_Output OK
     * @throws ApiError
     */
    public static getFlowRankingResponseCountHistogram({
        flowId,
        from,
        to,
        bucketCount,
    }: {
        /**
         * The ID of the flow.
         */
        flowId: string,
        /**
         * Optional start of the date range filter (inclusive).
         */
        from?: string,
        /**
         * Optional end of the date range filter (inclusive).
         */
        to?: string,
        /**
         * Number of histogram buckets (default 10, max 100).
         */
        bucketCount?: number,
    }): CancelablePromise<GetResponseCountHistogramEndpoint_Output> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/flow/ranking/{flowId}/response-count-histogram',
            path: {
                'flowId': flowId,
            },
            query: {
                'from': from,
                'to': to,
                'bucketCount': bucketCount,
            },
            errors: {
                400: `Bad Request`,
                401: `Unauthenticated`,
                403: `Forbidden`,
            },
        });
    }
    /**
     * Returns average response counts bucketed over time for completed flow items.
     * @returns GetResponseCountTimeseriesEndpoint_Output OK
     * @throws ApiError
     */
    public static getFlowRankingResponseCountTimeseries({
        flowId,
        from,
        to,
        datapoints,
    }: {
        /**
         * The ID of the flow.
         */
        flowId: string,
        /**
         * Optional start of the date range filter (inclusive).
         */
        from?: string,
        /**
         * Optional end of the date range filter (exclusive).
         */
        to?: string,
        /**
         * Number of time buckets (default 100, max 1000).
         */
        datapoints?: number,
    }): CancelablePromise<GetResponseCountTimeseriesEndpoint_Output> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/flow/ranking/{flowId}/response-count-timeseries',
            path: {
                'flowId': flowId,
            },
            query: {
                'from': from,
                'to': to,
                'datapoints': datapoints,
            },
            errors: {
                400: `Bad Request`,
                401: `Unauthenticated`,
                403: `Forbidden`,
            },
        });
    }
    /**
     * Queries flows with filtering and pagination.
     * @returns QueryFlowsEndpoint_PagedResultOfOutput OK
     * @throws ApiError
     */
    public static getFlow1({
        page,
        pageSize,
        sort,
        name,
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
        sort?: Array<'name' | '-name' | 'created_at' | '-created_at'>,
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
    }): CancelablePromise<QueryFlowsEndpoint_PagedResultOfOutput> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/flow',
            query: {
                'page': page,
                'page_size': pageSize,
                'sort': sort,
                'name': name,
                'created_at': createdAt,
            },
            errors: {
                400: `Bad Request`,
                401: `Unauthenticated`,
                403: `Forbidden`,
            },
        });
    }
}

/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { GetCompareAbSummaryResult } from '../models/GetCompareAbSummaryResult';
import type { GetResponsesResult } from '../models/GetResponsesResult';
import type { GetWorkflowByIdResult } from '../models/GetWorkflowByIdResult';
import type { GetWorkflowProgressResult } from '../models/GetWorkflowProgressResult';
import type { PagedResultOfIWorkflowModel } from '../models/PagedResultOfIWorkflowModel';
import type { SortDirection } from '../models/SortDirection';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class WorkflowService {
    /**
     * Queries workflows based on the provided filter, page, and sort criteria.
     * @returns PagedResultOfIWorkflowModel OK
     * @throws ApiError
     */
    public static getWorkflows({
        request,
    }: {
        /**
         * The model containing the filter, page, and sort criteria.
         */
        request?: any,
    }): CancelablePromise<PagedResultOfIWorkflowModel> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/workflows',
            query: {
                'request': request,
            },
        });
    }
    /**
     * Get a workflow by its ID.
     * @returns GetWorkflowByIdResult OK
     * @throws ApiError
     */
    public static getWorkflow({
        workflowId,
    }: {
        /**
         * The ID of the workflow to get.
         */
        workflowId: string,
    }): CancelablePromise<GetWorkflowByIdResult> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/workflow/{workflowId}',
            path: {
                'workflowId': workflowId,
            },
        });
    }
    /**
     * Get the progress of a workflow.
     * @returns GetWorkflowProgressResult OK
     * @throws ApiError
     */
    public static getWorkflowProgress({
        workflowId,
    }: {
        /**
         * The ID of the workflow to get the progress for.
         */
        workflowId: string,
    }): CancelablePromise<GetWorkflowProgressResult> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/workflow/{workflowId}/progress',
            path: {
                'workflowId': workflowId,
            },
        });
    }
    /**
     * Calculates a summary of the results for a simple ranking workflow.
     * The summary includes the number of times an asset at each index was the winner.
     * @returns GetCompareAbSummaryResult OK
     * @throws ApiError
     */
    public static getWorkflowCompareAbSummary({
        workflowId,
        useUserScore = false,
    }: {
        /**
         * The ID of the workflow to get the summary for.
         */
        workflowId: string,
        /**
         * Whether to use the user score to determine the winner.
         */
        useUserScore?: boolean,
    }): CancelablePromise<GetCompareAbSummaryResult> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/workflow/{workflowId}/compare-ab-summary',
            path: {
                'workflowId': workflowId,
            },
            query: {
                'useUserScore': useUserScore,
            },
        });
    }
    /**
     * Gets the limit most recent or oldest responses for a workflow.
     * The responses are not guaranteed to be of any specific rapid.
     * Instead, this endpoint returns all responses to any rapid in the workflow.
     * @returns GetResponsesResult OK
     * @throws ApiError
     */
    public static getWorkflowResponses({
        workflowId,
        limit = 100,
        sort,
    }: {
        /**
         * The ID of the workflow to get the responses for.
         */
        workflowId: string,
        /**
         * The number of responses to get.
         */
        limit?: number,
        /**
         * Whether the oldest or most recent responses should be returned.
         */
        sort?: SortDirection,
    }): CancelablePromise<GetResponsesResult> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/workflow/{workflowId}/responses',
            path: {
                'workflowId': workflowId,
            },
            query: {
                'limit': limit,
                'sort': sort,
            },
        });
    }
    /**
     * Deletes a workflow.
     * @returns any OK
     * @throws ApiError
     */
    public static deleteWorkflowDelete({
        id,
    }: {
        /**
         * The ID of the workflow to delete.
         */
        id?: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/workflow/delete',
            query: {
                'id': id,
            },
        });
    }
}

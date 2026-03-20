/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PagedResultOfGetGroupedRankingWorkflowResultsResult } from '../models/PagedResultOfGetGroupedRankingWorkflowResultsResult';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class GroupedRankingWorkflowService {
    /**
     * Get the result overview for a multi ranking workflow.
     * @returns PagedResultOfGetGroupedRankingWorkflowResultsResult OK
     * @throws ApiError
     */
    public static getWorkflowGroupedRankingResults({
        workflowId,
        model,
    }: {
        /**
         * The ID of the workflow to get the results for.
         */
        workflowId: string,
        /**
         * The model for the request.
         */
        model?: any,
    }): CancelablePromise<PagedResultOfGetGroupedRankingWorkflowResultsResult> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/workflow/grouped-ranking/{workflowId}/results',
            path: {
                'workflowId': workflowId,
            },
            query: {
                'model': model,
            },
        });
    }
}

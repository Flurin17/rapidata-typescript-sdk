/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { GetRankingWorkflowResultsResult } from '../models/GetRankingWorkflowResultsResult';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class RankingWorkflowService {
    /**
     * Get the result overview for a ranking workflow.
     * @returns GetRankingWorkflowResultsResult OK
     * @throws ApiError
     */
    public static getWorkflowCompareResults({
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
    }): CancelablePromise<GetRankingWorkflowResultsResult> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/workflow/compare/{workflowId}/results',
            path: {
                'workflowId': workflowId,
            },
            query: {
                'model': model,
            },
        });
    }
}

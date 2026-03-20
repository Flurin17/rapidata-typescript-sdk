/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PagedResultOfGetWorkflowResultsResult } from '../models/PagedResultOfGetWorkflowResultsResult';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class EvaluationWorkflowService {
    /**
     * Get the results for an evaluation workflow.
     * @returns PagedResultOfGetWorkflowResultsResult OK
     * @throws ApiError
     */
    public static getWorkflowEvaluationResults({
        workflowId,
        model,
    }: {
        /**
         * The ID of the workflow to get the results for.
         */
        workflowId: string,
        /**
         * The body of the request.
         */
        model?: any,
    }): CancelablePromise<PagedResultOfGetWorkflowResultsResult> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/workflow/evaluation/{workflowId}/results',
            path: {
                'workflowId': workflowId,
            },
            query: {
                'model': model,
            },
        });
    }
}

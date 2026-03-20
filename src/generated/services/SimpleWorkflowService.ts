/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PagedResultOfGetWorkflowResultsResult } from '../models/PagedResultOfGetWorkflowResultsResult';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class SimpleWorkflowService {
    /**
     * Get the result overview for a simple workflow.
     * @returns PagedResultOfGetWorkflowResultsResult OK
     * @throws ApiError
     */
    public static getWorkflowSimpleResults({
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
    }): CancelablePromise<PagedResultOfGetWorkflowResultsResult> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/workflow/simple/{workflowId}/results',
            path: {
                'workflowId': workflowId,
            },
            query: {
                'model': model,
            },
        });
    }
}

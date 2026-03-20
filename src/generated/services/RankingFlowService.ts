/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateFlowEndpoint_Input } from '../models/CreateFlowEndpoint_Input';
import type { CreateFlowEndpoint_Output } from '../models/CreateFlowEndpoint_Output';
import type { UpdateConfigEndpoint_Input } from '../models/UpdateConfigEndpoint_Input';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class RankingFlowService {
    /**
     * Creates a new ranking flow.
     * @returns CreateFlowEndpoint_Output OK
     * @throws ApiError
     */
    public static postFlowRanking({
        requestBody,
    }: {
        /**
         * The ranking flow creation parameters.
         */
        requestBody: CreateFlowEndpoint_Input,
    }): CancelablePromise<CreateFlowEndpoint_Output> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/flow/ranking',
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
     * Updates the configuration of a ranking flow.
     * @returns void
     * @throws ApiError
     */
    public static patchFlowRankingConfig({
        flowId,
        requestBody,
    }: {
        /**
         * The ID of the ranking flow to update.
         */
        flowId: string,
        /**
         * The configuration fields to update.
         */
        requestBody: UpdateConfigEndpoint_Input,
    }): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/flow/ranking/{flowId}/config',
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
}

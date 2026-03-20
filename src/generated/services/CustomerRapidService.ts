/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateDemographicRapidModel } from '../models/CreateDemographicRapidModel';
import type { CreateRapidResult } from '../models/CreateRapidResult';
import type { GetPublicResponsesResult } from '../models/GetPublicResponsesResult';
import type { GetResponsesForRapidResult } from '../models/GetResponsesForRapidResult';
import type { PagedResultOfQueryValidationRapidEligibilityResult } from '../models/PagedResultOfQueryValidationRapidEligibilityResult';
import type { PagedResultOfRapidModel } from '../models/PagedResultOfRapidModel';
import type { UpdateValidationRapidModel } from '../models/UpdateValidationRapidModel';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class CustomerRapidService {
    /**
     * Allows querying all rapids that have been flagged.
     * @returns PagedResultOfRapidModel OK
     * @throws ApiError
     */
    public static getRapidsFlagged({
        request,
    }: {
        /**
         * The request to use to filter, sort and page the results
         */
        request?: any,
    }): CancelablePromise<PagedResultOfRapidModel> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/rapids/flagged',
            query: {
                'request': request,
            },
        });
    }
    /**
     * Gets all responses for a given rapid.
     * @returns GetResponsesForRapidResult OK
     * @throws ApiError
     */
    public static getRapidResponses({
        rapidId,
    }: {
        /**
         * The rapid to get the responses for.
         */
        rapidId: string,
    }): CancelablePromise<GetResponsesForRapidResult> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/rapid/{rapidId}/responses',
            path: {
                'rapidId': rapidId,
            },
        });
    }
    /**
     * A public endpoint to query the most recent responses globally
     * @returns GetPublicResponsesResult OK
     * @throws ApiError
     */
    public static getRapidGlobalResponses(): CancelablePromise<GetPublicResponsesResult> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/rapid/global-responses',
        });
    }
    /**
     * Creates a new Demographic Rapid with JSON body.
     * @returns CreateRapidResult OK
     * @throws ApiError
     */
    public static postRapidDemographic({
        requestBody,
    }: {
        /**
         * The model containing the demographic rapid.
         */
        requestBody: CreateDemographicRapidModel,
    }): CancelablePromise<CreateRapidResult> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/rapid/demographic',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Updates the validation information of a Rapid.
     * @returns void
     * @throws ApiError
     */
    public static patchRapidValidation({
        rapidId,
        requestBody,
    }: {
        /**
         * The id of the rapid to update
         */
        rapidId: string,
        /**
         * The body request
         */
        requestBody: UpdateValidationRapidModel,
    }): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/rapid/validation/{rapidId}',
            path: {
                'rapidId': rapidId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Unflags a flagged rapid.
     * This will add the rapid back to the active labeling pool and prevent it from being flagged again.
     * @returns void
     * @throws ApiError
     */
    public static postRapidUnflag({
        rapidId,
    }: {
        /**
         * The id of the rapid to unflag
         */
        rapidId: string,
    }): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/rapid/{rapidId}/unflag',
            path: {
                'rapidId': rapidId,
            },
        });
    }
    /**
     * Deletes a rapid.
     * @returns void
     * @throws ApiError
     */
    public static deleteRapid({
        rapidId,
    }: {
        /**
         * The rapid to be deleted
         */
        rapidId: string,
    }): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/rapid/{rapidId}',
            path: {
                'rapidId': rapidId,
            },
        });
    }
    /**
     * Queries rapids that are potentially eligible for validation set creation.
     * @returns PagedResultOfQueryValidationRapidEligibilityResult OK
     * @throws ApiError
     */
    public static getRapidValidationPotential({
        correlationId,
        minResponses,
        minConfidence,
        targetGroupId,
        request,
    }: {
        correlationId: string,
        minResponses?: number,
        minConfidence?: number,
        targetGroupId?: string,
        request?: any,
    }): CancelablePromise<PagedResultOfQueryValidationRapidEligibilityResult> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/rapid/{correlationId}/validation-potential',
            path: {
                'correlationId': correlationId,
            },
            query: {
                'MinResponses': minResponses,
                'MinConfidence': minConfidence,
                'TargetGroupId': targetGroupId,
                'request': request,
            },
        });
    }
}

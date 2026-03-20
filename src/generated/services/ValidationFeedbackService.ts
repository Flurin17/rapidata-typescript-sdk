/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateValidationFeedbackEndpoint_Input } from '../models/CreateValidationFeedbackEndpoint_Input';
import type { QueryValidationFeedbacksEndpoint_PagedResultOfOutput } from '../models/QueryValidationFeedbacksEndpoint_PagedResultOfOutput';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ValidationFeedbackService {
    /**
     * Submits feedback for a validation rapid outcome.
     * @returns void
     * @throws ApiError
     */
    public static postRapidValidationFeedback({
        rapidId,
        requestBody,
    }: {
        /**
         * The ID of the rapid to provide feedback for.
         */
        rapidId: string,
        /**
         * The feedback input.
         */
        requestBody: CreateValidationFeedbackEndpoint_Input,
    }): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/rapid/{rapidId}/validation-feedback',
            path: {
                'rapidId': rapidId,
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
     * Queries validation feedbacks for a rapid.
     * @returns QueryValidationFeedbacksEndpoint_PagedResultOfOutput OK
     * @throws ApiError
     */
    public static getRapidValidationFeedback({
        rapidId,
        page,
        pageSize,
        sort,
        userId,
        feedback,
        createdAt,
    }: {
        /**
         * The ID of the rapid to query feedbacks for.
         */
        rapidId: string,
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
        sort?: Array<'created_at' | '-created_at'>,
        /**
         * Filter by user_id.
         */
        userId?: {
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
         * Filter by feedback.
         */
        feedback?: {
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
    }): CancelablePromise<QueryValidationFeedbacksEndpoint_PagedResultOfOutput> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/rapid/{rapidId}/validation-feedback',
            path: {
                'rapidId': rapidId,
            },
            query: {
                'page': page,
                'page_size': pageSize,
                'sort': sort,
                'user_id': userId,
                'feedback': feedback,
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

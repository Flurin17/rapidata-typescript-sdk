/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { FeedbackModel } from '../models/FeedbackModel';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class FeedbackService {
    /**
     * Submits feedback about our services.
     * @returns void
     * @throws ApiError
     */
    public static postFeedback({
        requestBody,
    }: {
        /**
         * The body content of the request
         */
        requestBody: FeedbackModel,
    }): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/feedback',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
}

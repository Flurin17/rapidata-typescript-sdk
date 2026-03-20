/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { NewsletterModel } from '../models/NewsletterModel';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class NewsletterService {
    /**
     * Signs a user up to the newsletter.
     * @returns void
     * @throws ApiError
     */
    public static postNewsletterSubscribe({
        requestBody,
    }: {
        /**
         * The model containing the email of a user and recaptcha token.
         */
        requestBody: NewsletterModel,
    }): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/newsletter/subscribe',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Unsubscribes a user from the newsletter.
     * @returns void
     * @throws ApiError
     */
    public static postNewsletterUnsubscribe({
        requestBody,
    }: {
        /**
         * The model containing the email of a user and recaptcha token.
         */
        requestBody: NewsletterModel,
    }): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/newsletter/unsubscribe',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
}

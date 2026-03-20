/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { SendSurveyModel } from '../models/SendSurveyModel';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class SurveyService {
    /**
     * Sends a survey.
     * @returns any OK
     * @throws ApiError
     */
    public static postIdentitySurvey({
        requestBody,
    }: {
        requestBody: SendSurveyModel,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/identity/survey',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
}

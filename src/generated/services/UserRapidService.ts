/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AddUserResponseResult } from '../models/AddUserResponseResult';
import type { AreRapidsActiveResult } from '../models/AreRapidsActiveResult';
import type { InspectReportResult } from '../models/InspectReportResult';
import type { RapidResultModel } from '../models/RapidResultModel';
import type { RapidSkippedModel } from '../models/RapidSkippedModel';
import type { ReportModel } from '../models/ReportModel';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class UserRapidService {
    /**
     * Validates that the rapids associated with the current user are active.
     * @returns AreRapidsActiveResult OK
     * @throws ApiError
     */
    public static getRapidRapidBagIsValid(): CancelablePromise<AreRapidsActiveResult> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/rapid/rapid-bag/is-valid',
        });
    }
    /**
     * Submits a response for a Rapid.
     * @returns AddUserResponseResult OK
     * @throws ApiError
     */
    public static postRapidResponse({
        requestBody,
    }: {
        /**
         * The model containing the user guess.
         */
        requestBody: RapidResultModel,
    }): CancelablePromise<AddUserResponseResult> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/rapid/response',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Skips a Rapid for the user.
     * @returns AddUserResponseResult OK
     * @throws ApiError
     */
    public static postRapidSkip({
        requestBody,
    }: {
        /**
         * The model containing the Rapid to skip.
         */
        requestBody: RapidSkippedModel,
    }): CancelablePromise<AddUserResponseResult> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/rapid/skip',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Used to report an issue with a rapid.
     * @returns void
     * @throws ApiError
     */
    public static postRapidReport({
        rapidId,
        requestBody,
    }: {
        /**
         * The rapid to report.
         */
        rapidId: string,
        /**
         * The body request.
         */
        requestBody: ReportModel,
    }): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/rapid/{rapidId}/report',
            path: {
                'rapidId': rapidId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Inspects a report's dump. Can be used to restore zustand state or anything alike.
     * @returns InspectReportResult OK
     * @throws ApiError
     */
    public static getRapidReport({
        reportId,
    }: {
        /**
         * The report id
         */
        reportId: string,
    }): CancelablePromise<InspectReportResult> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/rapid/report/{reportId}',
            path: {
                'reportId': reportId,
            },
        });
    }
}

/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateSampleModel } from '../models/CreateSampleModel';
import type { GetParticipantByIdResult } from '../models/GetParticipantByIdResult';
import type { PagedResultOfISampleByParticipant } from '../models/PagedResultOfISampleByParticipant';
import type { SubmitParticipantResult } from '../models/SubmitParticipantResult';
import type { UpdateParticipantModel } from '../models/UpdateParticipantModel';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ParticipantService {
    /**
     * Adds a sample to a participant.
     * @returns any OK
     * @throws ApiError
     */
    public static postParticipantSample({
        participantId,
        requestBody,
    }: {
        /**
         * The id of the participant to add the sample to
         */
        participantId: string,
        /**
         * The model for the sample creation
         */
        requestBody: CreateSampleModel,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/participant/{participantId}/sample',
            path: {
                'participantId': participantId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Deletes a participant on a benchmark.
     * @returns void
     * @throws ApiError
     */
    public static deleteParticipant({
        participantId,
    }: {
        participantId: string,
    }): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/participant/{participantId}',
            path: {
                'participantId': participantId,
            },
        });
    }
    /**
     * Gets a participant by it's Id.
     * @returns GetParticipantByIdResult OK
     * @throws ApiError
     */
    public static getParticipant({
        participantId,
    }: {
        participantId: string,
    }): CancelablePromise<GetParticipantByIdResult> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/participant/{participantId}',
            path: {
                'participantId': participantId,
            },
        });
    }
    /**
     * Updates a participant using patch semantics.
     * @returns void
     * @throws ApiError
     */
    public static patchParticipant({
        participantId,
        requestBody,
    }: {
        participantId: string,
        requestBody: UpdateParticipantModel,
    }): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/participant/{participantId}',
            path: {
                'participantId': participantId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Submits a participant to a benchmark.
     * @returns SubmitParticipantResult OK
     * @throws ApiError
     */
    public static postParticipantsSubmit({
        participantId,
    }: {
        participantId: string,
    }): CancelablePromise<SubmitParticipantResult> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/participants/{participantId}/submit',
            path: {
                'participantId': participantId,
            },
        });
    }
    /**
     * Deletes a sample.
     * @returns GetParticipantByIdResult OK
     * @throws ApiError
     */
    public static deleteParticipantSample({
        sampleId,
    }: {
        /**
         * the id of the sample to be deleted.
         */
        sampleId: string,
    }): CancelablePromise<GetParticipantByIdResult> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/participant-sample/{sampleId}',
            path: {
                'sampleId': sampleId,
            },
        });
    }
    /**
     * Queries all samples of a participant.
     * @returns PagedResultOfISampleByParticipant OK
     * @throws ApiError
     */
    public static getParticipantSamples({
        participantId,
        request,
        fillMissing = false,
    }: {
        participantId: string,
        request?: any,
        fillMissing?: boolean,
    }): CancelablePromise<PagedResultOfISampleByParticipant> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/participant/{participantId}/samples',
            path: {
                'participantId': participantId,
            },
            query: {
                'request': request,
                'fillMissing': fillMissing,
            },
        });
    }
    /**
     * This endpoint disables a participant in a benchmark. this means that the participant will no longer actively be matched up against other participants and not collect further results. It will still be visible in the leaderboard.
     * @returns any OK
     * @throws ApiError
     */
    public static postParticipantDisable({
        participantId,
    }: {
        /**
         * The id of the participant to be disabled
         */
        participantId: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/participant/{participantId}/disable',
            path: {
                'participantId': participantId,
            },
        });
    }
}

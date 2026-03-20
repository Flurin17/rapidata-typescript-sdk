/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BoostLeaderboardModel } from '../models/BoostLeaderboardModel';
import type { CreateLeaderboardModel } from '../models/CreateLeaderboardModel';
import type { CreateLeaderboardResult } from '../models/CreateLeaderboardResult';
import type { GetCombinedLeaderboardMatrixEndpoint_Output } from '../models/GetCombinedLeaderboardMatrixEndpoint_Output';
import type { GetCombinedLeaderboardStandingsEndpoint_Output } from '../models/GetCombinedLeaderboardStandingsEndpoint_Output';
import type { GetLeaderboardByIdResult } from '../models/GetLeaderboardByIdResult';
import type { GetStandingByIdResult } from '../models/GetStandingByIdResult';
import type { PagedResultOfLeaderboardsQueryResult } from '../models/PagedResultOfLeaderboardsQueryResult';
import type { PagedResultOfRunsByLeaderboardResult } from '../models/PagedResultOfRunsByLeaderboardResult';
import type { StandingsByLeaderboardResult } from '../models/StandingsByLeaderboardResult';
import type { SubmitParticipantResult } from '../models/SubmitParticipantResult';
import type { UpdateLeaderboardModel } from '../models/UpdateLeaderboardModel';
import type { VoteMatrixResult } from '../models/VoteMatrixResult';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class LeaderboardService {
    /**
     * Returns the combined pairwise vote matrix for multiple leaderboards.
     * @returns GetCombinedLeaderboardMatrixEndpoint_Output OK
     * @throws ApiError
     */
    public static getLeaderboardCombinedMatrix({
        leaderboardIds,
        useWeightedScoring = false,
    }: {
        /**
         * The identifiers of the leaderboards to combine.
         */
        leaderboardIds: Array<string>,
        /**
         * Whether to apply weighted scoring to the matrix values.
         */
        useWeightedScoring?: boolean,
    }): CancelablePromise<GetCombinedLeaderboardMatrixEndpoint_Output> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/leaderboard/combined-matrix',
            query: {
                'leaderboardIds': leaderboardIds,
                'useWeightedScoring': useWeightedScoring,
            },
            errors: {
                400: `Bad Request`,
                401: `Unauthenticated`,
                403: `Forbidden`,
            },
        });
    }
    /**
     * Returns the combined standings for multiple leaderboards.
     * @returns GetCombinedLeaderboardStandingsEndpoint_Output OK
     * @throws ApiError
     */
    public static getLeaderboardCombinedStandings({
        leaderboardIds,
        useWeightedScoring = false,
        includeConfidenceIntervals = false,
    }: {
        /**
         * The identifiers of the leaderboards to combine.
         */
        leaderboardIds: Array<string>,
        /**
         * Whether to apply weighted scoring.
         */
        useWeightedScoring?: boolean,
        /**
         * Whether to include confidence intervals in results.
         */
        includeConfidenceIntervals?: boolean,
    }): CancelablePromise<GetCombinedLeaderboardStandingsEndpoint_Output> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/leaderboard/combined-standings',
            query: {
                'leaderboardIds': leaderboardIds,
                'useWeightedScoring': useWeightedScoring,
                'includeConfidenceIntervals': includeConfidenceIntervals,
            },
            errors: {
                400: `Bad Request`,
                401: `Unauthenticated`,
                403: `Forbidden`,
            },
        });
    }
    /**
     * Returns the pairwise vote matrix for a leaderboard.
     * The matrix is returned in pandas split format.
     * @returns VoteMatrixResult OK
     * @throws ApiError
     */
    public static getLeaderboardMatrix({
        leaderboardId,
        tags,
        useWeightedScoring = false,
    }: {
        /**
         * The identifier of the leaderboard.
         */
        leaderboardId: string,
        /**
         * Optional tags to filter the matrix entries.
         */
        tags?: Array<string>,
        /**
         * Whether to apply weighted scoring to the matrix values.
         */
        useWeightedScoring?: boolean,
    }): CancelablePromise<VoteMatrixResult> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/leaderboard/{leaderboardId}/matrix',
            path: {
                'leaderboardId': leaderboardId,
            },
            query: {
                'tags': tags,
                'useWeightedScoring': useWeightedScoring,
            },
            errors: {
                400: `Bad Request`,
                401: `Unauthenticated`,
                403: `Forbidden`,
            },
        });
    }
    /**
     * Queries all leaderboards for a specific benchmark.
     * @returns PagedResultOfLeaderboardsQueryResult OK
     * @throws ApiError
     */
    public static getLeaderboards({
        request,
    }: {
        /**
         * Query parameters
         */
        request?: any,
    }): CancelablePromise<PagedResultOfLeaderboardsQueryResult> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/leaderboards',
            query: {
                'request': request,
            },
        });
    }
    /**
     * Gets a leaderboard by its ID.
     * @returns GetLeaderboardByIdResult OK
     * @throws ApiError
     */
    public static getLeaderboard({
        leaderboardId,
    }: {
        leaderboardId: string,
    }): CancelablePromise<GetLeaderboardByIdResult> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/leaderboard/{leaderboardId}',
            path: {
                'leaderboardId': leaderboardId,
            },
        });
    }
    /**
     * Updates the response config of a leaderboard.
     * @returns void
     * @throws ApiError
     */
    public static patchLeaderboard({
        leaderboardId,
        requestBody,
    }: {
        leaderboardId: string,
        requestBody: UpdateLeaderboardModel,
    }): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/leaderboard/{leaderboardId}',
            path: {
                'leaderboardId': leaderboardId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Deletes a leaderboard by its ID.
     * @returns void
     * @throws ApiError
     */
    public static deleteLeaderboard({
        leaderboardId,
    }: {
        /**
         * The id of the leaderboard that gets deleted
         */
        leaderboardId: string,
    }): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/leaderboard/{leaderboardId}',
            path: {
                'leaderboardId': leaderboardId,
            },
        });
    }
    /**
     * Creates a new leaderboard with the specified name and criteria.
     * @returns CreateLeaderboardResult OK
     * @throws ApiError
     */
    public static postLeaderboard({
        requestBody,
    }: {
        requestBody: CreateLeaderboardModel,
    }): CancelablePromise<CreateLeaderboardResult> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/leaderboard',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * queries all the participants connected to leaderboard by its ID.
     * @returns StandingsByLeaderboardResult OK
     * @throws ApiError
     */
    public static getLeaderboardStandings({
        leaderboardId,
        tags,
        useWeightedScoring = false,
        includeConfidenceIntervals = false,
    }: {
        /**
         * The id of the leaderboard, which standings should be queried
         */
        leaderboardId: string,
        /**
         * The tags the leaderboard should filter for.
         */
        tags?: Array<string>,
        /**
         * Whether to use weighted scoring based on user scores (defaults to false for backwards compatibility)
         */
        useWeightedScoring?: boolean,
        /**
         * Whether to include the confidence intervals
         */
        includeConfidenceIntervals?: boolean,
    }): CancelablePromise<StandingsByLeaderboardResult> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/leaderboard/{leaderboardId}/standings',
            path: {
                'leaderboardId': leaderboardId,
            },
            query: {
                'tags': tags,
                'useWeightedScoring': useWeightedScoring,
                'includeConfidenceIntervals': includeConfidenceIntervals,
            },
        });
    }
    /**
     * Gets the runs related to a leaderboard
     * @returns PagedResultOfRunsByLeaderboardResult OK
     * @throws ApiError
     */
    public static getLeaderboardRuns({
        leaderboardId,
        request,
    }: {
        leaderboardId: string,
        request?: any,
    }): CancelablePromise<PagedResultOfRunsByLeaderboardResult> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/leaderboard/{leaderboardId}/runs',
            path: {
                'leaderboardId': leaderboardId,
            },
            query: {
                'request': request,
            },
        });
    }
    /**
     * Gets a standing by leaderboardId and participantId.
     * @returns GetStandingByIdResult OK
     * @throws ApiError
     */
    public static getBenchmarkStanding({
        leaderboardId,
        participantId,
    }: {
        leaderboardId: string,
        participantId: string,
    }): CancelablePromise<GetStandingByIdResult> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/benchmark/standing/{leaderboardId}/{participantId}',
            path: {
                'leaderboardId': leaderboardId,
                'participantId': participantId,
            },
        });
    }
    /**
     * Boosts a subset of participants within a leaderboard.
     * @returns SubmitParticipantResult OK
     * @throws ApiError
     */
    public static postLeaderboardBoost({
        leaderboardId,
        requestBody,
    }: {
        /**
         * the leaderboard that should be boosted
         */
        leaderboardId: string,
        requestBody: BoostLeaderboardModel,
    }): CancelablePromise<SubmitParticipantResult> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/leaderboard/{leaderboardId}/boost',
            path: {
                'leaderboardId': leaderboardId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
}

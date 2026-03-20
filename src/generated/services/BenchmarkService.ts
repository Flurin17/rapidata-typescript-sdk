/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateBenchmarkModel } from '../models/CreateBenchmarkModel';
import type { CreateBenchmarkParticipantModel } from '../models/CreateBenchmarkParticipantModel';
import type { CreateBenchmarkParticipantResult } from '../models/CreateBenchmarkParticipantResult';
import type { CreateBenchmarkPromptResult } from '../models/CreateBenchmarkPromptResult';
import type { CreateBenchmarkResult } from '../models/CreateBenchmarkResult';
import type { ForkBenchmarkResult } from '../models/ForkBenchmarkResult';
import type { GetBenchmarkByIdResult } from '../models/GetBenchmarkByIdResult';
import type { GetCombinedBenchmarkMatrixEndpoint_Output } from '../models/GetCombinedBenchmarkMatrixEndpoint_Output';
import type { GetCombinedBenchmarkStandingsEndpoint_Output } from '../models/GetCombinedBenchmarkStandingsEndpoint_Output';
import type { PagedResultOfBenchmarkQueryResult } from '../models/PagedResultOfBenchmarkQueryResult';
import type { PagedResultOfLeaderboardsQueryResult } from '../models/PagedResultOfLeaderboardsQueryResult';
import type { PagedResultOfParticipantByBenchmark } from '../models/PagedResultOfParticipantByBenchmark';
import type { PagedResultOfPromptByBenchmarkResult } from '../models/PagedResultOfPromptByBenchmarkResult';
import type { PagedResultOfSampleByIdentifier } from '../models/PagedResultOfSampleByIdentifier';
import type { StandingsByBenchmarkResult } from '../models/StandingsByBenchmarkResult';
import type { SubmitPromptModel } from '../models/SubmitPromptModel';
import type { TagsByBenchmarkResult } from '../models/TagsByBenchmarkResult';
import type { UpdateBenchmarkModel } from '../models/UpdateBenchmarkModel';
import type { VoteMatrixResult } from '../models/VoteMatrixResult';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class BenchmarkService {
    /**
     * Returns the pairwise vote matrix for a benchmark.
     * The matrix is returned in pandas split format.
     * @returns VoteMatrixResult OK
     * @throws ApiError
     */
    public static getBenchmarkMatrix({
        benchmarkId,
        tags,
        participantIds,
        leaderboardIds,
        useWeightedScoring = false,
    }: {
        /**
         * The identifier of the benchmark.
         */
        benchmarkId: string,
        /**
         * Optional tags to filter the matrix entries.
         */
        tags?: Array<string>,
        /**
         * Optional participant identifiers to include in the matrix.
         */
        participantIds?: Array<string>,
        /**
         * Optional leaderboard identifiers to scope the matrix.
         */
        leaderboardIds?: Array<string>,
        /**
         * Whether to apply weighted scoring to the matrix values.
         */
        useWeightedScoring?: boolean,
    }): CancelablePromise<VoteMatrixResult> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/benchmark/{benchmarkId}/matrix',
            path: {
                'benchmarkId': benchmarkId,
            },
            query: {
                'tags': tags,
                'participantIds': participantIds,
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
     * Returns the combined pairwise vote matrix for multiple benchmarks.
     * @returns GetCombinedBenchmarkMatrixEndpoint_Output OK
     * @throws ApiError
     */
    public static getBenchmarkCombinedMatrix({
        benchmarkIds,
        useWeightedScoring = false,
    }: {
        /**
         * The identifiers of the benchmarks to combine.
         */
        benchmarkIds: Array<string>,
        /**
         * Whether to apply weighted scoring to the matrix values.
         */
        useWeightedScoring?: boolean,
    }): CancelablePromise<GetCombinedBenchmarkMatrixEndpoint_Output> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/benchmark/combined-matrix',
            query: {
                'benchmarkIds': benchmarkIds,
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
     * Returns the combined standings for multiple benchmarks.
     * @returns GetCombinedBenchmarkStandingsEndpoint_Output OK
     * @throws ApiError
     */
    public static getBenchmarkCombinedStandings({
        benchmarkIds,
        useWeightedScoring = false,
        includeConfidenceIntervals = false,
    }: {
        /**
         * The identifiers of the benchmarks to combine.
         */
        benchmarkIds: Array<string>,
        /**
         * Whether to apply weighted scoring.
         */
        useWeightedScoring?: boolean,
        /**
         * Whether to include confidence intervals in results.
         */
        includeConfidenceIntervals?: boolean,
    }): CancelablePromise<GetCombinedBenchmarkStandingsEndpoint_Output> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/benchmark/combined-standings',
            query: {
                'benchmarkIds': benchmarkIds,
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
     * Queries all benchmarks of the user.
     * @returns PagedResultOfBenchmarkQueryResult OK
     * @throws ApiError
     */
    public static getBenchmarks({
        request,
    }: {
        request?: any,
    }): CancelablePromise<PagedResultOfBenchmarkQueryResult> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/benchmarks',
            query: {
                'request': request,
            },
        });
    }
    /**
     * Queries all leaderboards for the current user's benchmarks.
     * @returns PagedResultOfLeaderboardsQueryResult OK
     * @throws ApiError
     */
    public static getBenchmarkLeaderboards({
        benchmarkId,
        request,
    }: {
        /**
         * The Id of the benchmark whoms leaderboards will be returned
         */
        benchmarkId: string,
        /**
         * Query parameters
         */
        request?: any,
    }): CancelablePromise<PagedResultOfLeaderboardsQueryResult> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/benchmark/{benchmarkId}/leaderboards',
            path: {
                'benchmarkId': benchmarkId,
            },
            query: {
                'request': request,
            },
        });
    }
    /**
     * Creates a benchmark
     * @returns CreateBenchmarkResult OK
     * @throws ApiError
     */
    public static postBenchmark({
        requestBody,
    }: {
        requestBody: CreateBenchmarkModel,
    }): CancelablePromise<CreateBenchmarkResult> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/benchmark',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Returns a single benchmark by its ID.
     * @returns GetBenchmarkByIdResult OK
     * @throws ApiError
     */
    public static getBenchmark({
        benchmarkId,
    }: {
        benchmarkId: string,
    }): CancelablePromise<GetBenchmarkByIdResult> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/benchmark/{benchmarkId}',
            path: {
                'benchmarkId': benchmarkId,
            },
        });
    }
    /**
     * Deletes a single benchmark.
     * @returns void
     * @throws ApiError
     */
    public static deleteBenchmark({
        benchmarkId,
    }: {
        benchmarkId: string,
    }): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/benchmark/{benchmarkId}',
            path: {
                'benchmarkId': benchmarkId,
            },
        });
    }
    /**
     * Updates a benchmark using patch semantics.
     * @returns void
     * @throws ApiError
     */
    public static patchBenchmark({
        benchmarkId,
        requestBody,
    }: {
        benchmarkId: string,
        requestBody: UpdateBenchmarkModel,
    }): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/benchmark/{benchmarkId}',
            path: {
                'benchmarkId': benchmarkId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Query all participants within a benchmark
     * @returns PagedResultOfParticipantByBenchmark OK
     * @throws ApiError
     */
    public static getBenchmarkParticipants({
        benchmarkId,
        request,
    }: {
        benchmarkId: string,
        request?: any,
    }): CancelablePromise<PagedResultOfParticipantByBenchmark> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/benchmark/{benchmarkId}/participants',
            path: {
                'benchmarkId': benchmarkId,
            },
            query: {
                'request': request,
            },
        });
    }
    /**
     * Creates a participant in a benchmark.
     * @returns CreateBenchmarkParticipantResult OK
     * @throws ApiError
     */
    public static postBenchmarkParticipants({
        benchmarkId,
        requestBody,
    }: {
        benchmarkId: string,
        requestBody: CreateBenchmarkParticipantModel,
    }): CancelablePromise<CreateBenchmarkParticipantResult> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/benchmark/{benchmarkId}/participants',
            path: {
                'benchmarkId': benchmarkId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Queries all the standings for a benchmark by its ID.
     * @returns StandingsByBenchmarkResult OK
     * @throws ApiError
     */
    public static getBenchmarkStandings({
        benchmarkId,
        tags,
        participantIds,
        leaderboardIds,
        useWeightedScoring = false,
        includeConfidenceIntervals = false,
    }: {
        /**
         * The id of the benchmark, which standings should be queried
         */
        benchmarkId: string,
        /**
         * The tags the benchmark should filter for.
         */
        tags?: Array<string>,
        /**
         * The ids of the participants that should be filtered for. leave empty to not filter
         */
        participantIds?: Array<string>,
        /**
         * The ids of the leaderboards that should be filtered for. leave empty to not filter
         */
        leaderboardIds?: Array<string>,
        /**
         * Whether to use weighted scoring based on user scores (defaults to false for backwards compatibility)
         */
        useWeightedScoring?: boolean,
        /**
         * Whether to include the confidence intervals
         */
        includeConfidenceIntervals?: boolean,
    }): CancelablePromise<StandingsByBenchmarkResult> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/benchmark/{benchmarkId}/standings',
            path: {
                'benchmarkId': benchmarkId,
            },
            query: {
                'tags': tags,
                'participantIds': participantIds,
                'leaderboardIds': leaderboardIds,
                'useWeightedScoring': useWeightedScoring,
                'includeConfidenceIntervals': includeConfidenceIntervals,
            },
        });
    }
    /**
     * Creates a copy of a public benchmark and all of its related entities
     * @returns ForkBenchmarkResult OK
     * @throws ApiError
     */
    public static postBenchmarkFork({
        benchmarkId,
    }: {
        benchmarkId: string,
    }): CancelablePromise<ForkBenchmarkResult> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/benchmark/{benchmarkId}/fork',
            path: {
                'benchmarkId': benchmarkId,
            },
        });
    }
    /**
     * Returns the paged prompts of a benchmark by its ID.
     * @returns PagedResultOfPromptByBenchmarkResult OK
     * @throws ApiError
     */
    public static getBenchmarkPrompts({
        benchmarkId,
        request,
    }: {
        benchmarkId: string,
        request?: any,
    }): CancelablePromise<PagedResultOfPromptByBenchmarkResult> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/benchmark/{benchmarkId}/prompts',
            path: {
                'benchmarkId': benchmarkId,
            },
            query: {
                'request': request,
            },
        });
    }
    /**
     * Returns the paged prompts of a benchmark by its ID.
     * @returns PagedResultOfSampleByIdentifier OK
     * @throws ApiError
     */
    public static getBenchmarkSamples({
        benchmarkId,
        identifier,
        request,
    }: {
        /**
         * The id of the benchmark to query
         */
        benchmarkId: string,
        /**
         * The identifier to filter all samples for
         */
        identifier: string,
        /**
         * additional query settings
         */
        request?: any,
    }): CancelablePromise<PagedResultOfSampleByIdentifier> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/benchmark/{benchmarkId}/samples/{identifier}',
            path: {
                'benchmarkId': benchmarkId,
                'identifier': identifier,
            },
            query: {
                'request': request,
            },
        });
    }
    /**
     * Adds a new prompt to a benchmark.
     * @returns CreateBenchmarkPromptResult OK
     * @throws ApiError
     */
    public static postBenchmarkPrompt({
        benchmarkId,
        requestBody,
    }: {
        /**
         * The benchmark id.
         */
        benchmarkId: string,
        requestBody: SubmitPromptModel,
    }): CancelablePromise<CreateBenchmarkPromptResult> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/benchmark/{benchmarkId}/prompt',
            path: {
                'benchmarkId': benchmarkId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Query all tags within a benchmark
     * @returns TagsByBenchmarkResult OK
     * @throws ApiError
     */
    public static getBenchmarkTags({
        benchmarkId,
    }: {
        /**
         * The id of the benchmark the prompts should be retrieved from
         */
        benchmarkId: string,
    }): CancelablePromise<TagsByBenchmarkResult> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/benchmark/{benchmarkId}/tags',
            path: {
                'benchmarkId': benchmarkId,
            },
        });
    }
}

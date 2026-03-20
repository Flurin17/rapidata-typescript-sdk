/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { FeatureFlagModel } from './FeatureFlagModel';
import type { IUserFilterModel } from './IUserFilterModel';
/**
 * The CreateLeaderboardModel class represents the model for creating a leaderboard.
 */
export type CreateLeaderboardModel = {
    /**
     * If a leaderboard should be added to a preexisting benchmark, the benchmark Id can be provided.
     */
    benchmarkId?: string | null;
    /**
     * If no BenchmarkId is provided a new benchmark will be created. if no name is supplied the benchmark
     * will be called the same as the leaderboard.
     */
    benchmarkName?: string | null;
    /**
     * The name of the leaderboard.
     */
    name: string;
    /**
     * The instruction datapoints will be matched up against.
     */
    instruction: string;
    /**
     * Indicates if the prompt is shown on the rapids.
     */
    showPrompt: boolean;
    /**
     * Whether the prompt asset should be shown on the rapids.
     */
    showPromptAsset?: boolean;
    /**
     * Total amount of responses that get collected per run
     */
    responseBudget?: number;
    /**
     * The minimum amount of responses that need to be collected per comparison.
     */
    minResponses?: number;
    /**
     * If the results should be inversed, meaning people should select the worse model.
     */
    isInversed?: boolean;
    /**
     * The Validation set that should be attached to every run.
     */
    validationSetId?: string | null;
    /**
     * Optional audience ID. When provided, the leaderboard will target users who have
     * graduated from the audience (i.e., users with a score at or above the audience's minimum threshold).
     * Cannot be specified together with Filters.
     */
    audienceId?: string | null;
    /**
     * The filters will be applied on every order that is created by this leaderboard.
     * Cannot be specified together with AudienceId.
     */
    filters?: Array<IUserFilterModel> | null;
    /**
     * Feature flags that will be applied to every order that is created by this leaderboard.
     */
    featureFlags?: Array<FeatureFlagModel> | null;
};


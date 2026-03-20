/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * The model for boosting a leaderboard.
 */
export type BoostLeaderboardModel = {
    /**
     * The participants of the given leaderboard that should be boosted.
     */
    participants: Array<string>;
    /**
     * The amount of responses in total that should be added, shared across all participants.
     */
    totalResponses: number;
};


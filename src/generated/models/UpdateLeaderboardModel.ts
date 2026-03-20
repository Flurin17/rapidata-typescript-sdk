/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * The model used to update a leaderboard.
 */
export type UpdateLeaderboardModel = {
    /**
     * The new name of the leaderboard.
     */
    name?: string | null;
    /**
     * The amount of responses that will be collected when onboarding a new participant.
     */
    responseBudget?: number | null;
    /**
     * The amount of responses that will be collected as a minimum on each matchup.
     */
    minResponses?: number | null;
};


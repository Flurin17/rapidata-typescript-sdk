/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type GetUserScoreCacheEndpoint_Output = {
    /**
     * The total number of cached user scores.
     */
    count: number;
    /**
     * The cached dimension-to-score mappings.
     */
    scores: Record<string, number>;
};


/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Combined leaderboard matrix output in pandas split format.
 */
export type GetCombinedLeaderboardMatrixEndpoint_Output = {
    /**
     * Row participant names.
     */
    index: Array<string>;
    /**
     * Column participant names.
     */
    columns: Array<string>;
    /**
     * NxN matrix where Data[i][j] = wins of Index[i] over Columns[j].
     */
    data: Array<Array<number>>;
};


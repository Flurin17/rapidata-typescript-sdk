/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type GetRankingFlowItemVoteMatrixEndpoint_Output = {
    /**
     * Row labels of the vote matrix.
     */
    index: Array<string>;
    /**
     * Column labels of the vote matrix.
     */
    columns: Array<string>;
    /**
     * The vote counts as a two-dimensional matrix where Data[i][j] is the number of times row i was preferred over column j.
     */
    data: Array<Array<number>>;
};


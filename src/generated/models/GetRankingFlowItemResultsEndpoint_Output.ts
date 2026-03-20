/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { GetRankingFlowItemResultsEndpoint_Output_Datapoint } from './GetRankingFlowItemResultsEndpoint_Output_Datapoint';
export type GetRankingFlowItemResultsEndpoint_Output = {
    /**
     * The ranked datapoints with their Elo scores.
     */
    datapoints: Array<GetRankingFlowItemResultsEndpoint_Output_Datapoint>;
    /**
     * The total number of votes across all datapoints.
     */
    totalVotes: number;
};


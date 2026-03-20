/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { GetRankingWorkflowResultsResult_Datapoint } from './GetRankingWorkflowResultsResult_Datapoint';
export type GetRankingWorkflowResultsResult = {
    totalVotes: number;
    total: number;
    page: number;
    pageSize: number;
    items: Array<GetRankingWorkflowResultsResult_Datapoint>;
    totalPages?: number;
};


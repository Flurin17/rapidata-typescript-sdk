/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { LeaderboardsQueryResult } from './LeaderboardsQueryResult';
export type PagedResultOfLeaderboardsQueryResult = {
    total: number;
    page: number;
    pageSize: number;
    items: Array<LeaderboardsQueryResult>;
    totalPages?: number;
};


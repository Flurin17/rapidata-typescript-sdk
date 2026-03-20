/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { StandingByLeaderboard } from './StandingByLeaderboard';
export type PagedResultOfStandingByLeaderboard = {
    total: number;
    page: number;
    pageSize: number;
    items: Array<StandingByLeaderboard>;
    totalPages?: number;
};


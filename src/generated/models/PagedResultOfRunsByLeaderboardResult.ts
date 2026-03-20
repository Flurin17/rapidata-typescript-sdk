/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { RunsByLeaderboardResult } from './RunsByLeaderboardResult';
export type PagedResultOfRunsByLeaderboardResult = {
    total: number;
    page: number;
    pageSize: number;
    items: Array<RunsByLeaderboardResult>;
    totalPages?: number;
};


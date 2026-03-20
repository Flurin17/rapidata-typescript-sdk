/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ConfidenceInterval } from './ConfidenceInterval';
import type { StandingStatus } from './StandingStatus';
export type StandingByLeaderboard = {
    id: string;
    name: string;
    leaderboardId: string;
    status: StandingStatus;
    score: number;
    wins: number;
    totalMatches: number;
    isDisabled: boolean;
    confidenceInterval?: ConfidenceInterval;
};


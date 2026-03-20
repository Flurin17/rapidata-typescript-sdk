/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ConfidenceInterval } from './ConfidenceInterval';
import type { StandingStatus } from './StandingStatus';
export type StandingByBenchmark = {
    id: string;
    name: string;
    benchmarkId: string;
    status: StandingStatus;
    score: number;
    wins: number;
    totalMatches: number;
    isDisabled: boolean;
    confidenceInterval?: ConfidenceInterval;
};


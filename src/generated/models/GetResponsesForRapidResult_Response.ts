/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { IRapidResult } from './IRapidResult';
export type GetResponsesForRapidResult_Response = {
    id: string;
    userId: string;
    country: string;
    result: IRapidResult;
    userScore: number;
    userScores: Record<string, number>;
    demographicInformation: Record<string, string>;
};


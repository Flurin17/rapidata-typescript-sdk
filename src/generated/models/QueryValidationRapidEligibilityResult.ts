/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { IRapidPayload } from './IRapidPayload';
import type { IValidationTruth } from './IValidationTruth';
export type QueryValidationRapidEligibilityResult = {
    rapidId: string;
    payload: IRapidPayload;
    responseCount: number;
    confidence: number;
    truth: IValidationTruth;
};


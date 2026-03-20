/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { IAssetModel } from './IAssetModel';
import type { IRapidPayload } from './IRapidPayload';
import type { IValidationTruth } from './IValidationTruth';
import type { RapidState } from './RapidState';
/**
 * Output model for the backwards-compatible rapids query.
 */
export type QueryRapidsOutput = {
    id: string;
    type: string;
    asset: IAssetModel;
    payload: IRapidPayload;
    correctValidationCount: number;
    invalidValidationCount: number;
    state: RapidState;
    truth?: IValidationTruth;
    context?: string | null;
    contextAsset?: IAssetModel;
    explanation?: string | null;
    randomCorrectProbability?: number;
    isCommonSense: boolean;
};


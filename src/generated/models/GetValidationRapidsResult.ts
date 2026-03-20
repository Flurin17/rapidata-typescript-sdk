/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { IAssetModel } from './IAssetModel';
import type { IRapidPayload } from './IRapidPayload';
import type { IValidationTruthModel } from './IValidationTruthModel';
import type { RapidState } from './RapidState';
export type GetValidationRapidsResult = {
    id: string;
    type: string;
    asset: IAssetModel;
    truth?: IValidationTruthModel;
    payload: IRapidPayload;
    context?: string | null;
    contextAsset?: IAssetModel;
    correctValidationCount: number;
    invalidValidationCount: number;
    explanation?: string | null;
    randomCorrectProbability?: number;
    state: RapidState;
};


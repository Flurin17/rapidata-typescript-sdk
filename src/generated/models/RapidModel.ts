/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { FeatureFlag } from './FeatureFlag';
import type { IAssetModel } from './IAssetModel';
import type { IRapidPayload } from './IRapidPayload';
import type { IRefereeInfo } from './IRefereeInfo';
import type { IValidationTruth } from './IValidationTruth';
import type { RapidState } from './RapidState';
export type RapidModel = {
    id: string;
    payload: IRapidPayload;
    referee: IRefereeInfo;
    asset: IAssetModel;
    state: RapidState;
    hasResponses: boolean;
    shouldAcceptIncorrect: boolean;
    truth: IValidationTruth;
    explanation: string | null;
    randomCorrectProbability: number;
    key: string | null;
    completedAt: string | null;
    featureFlags: Array<FeatureFlag>;
};


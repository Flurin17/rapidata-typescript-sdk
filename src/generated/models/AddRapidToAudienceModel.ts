/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { FeatureFlagModel } from './FeatureFlagModel';
import type { IAssetInput } from './IAssetInput';
import type { IRapidPayload } from './IRapidPayload';
import type { IValidationTruth } from './IValidationTruth';
/**
 * The model for adding a validation rapid with asset in JSON body.
 */
export type AddRapidToAudienceModel = {
    /**
     * The asset to use for the rapid.
     */
    asset: IAssetInput;
    /**
     * The payload to use for the rapid.
     */
    payload: IRapidPayload;
    /**
     * The ground truth for the rapid.
     */
    truth?: IValidationTruth;
    /**
     * The probability for an answer to be correct when randomly guessing.
     */
    randomCorrectProbability: number;
    /**
     * An explanation for the users if they answer the rapid incorrectly.
     */
    explanation?: string | null;
    /**
     * An optional textual context that provides additional information to the user about the rapid.
     */
    context?: string | null;
    /**
     * An optional asset that provides additional context to the user about the rapid.
     */
    contextAsset?: IAssetInput;
    /**
     * The feature flags to enable for the rapid.
     */
    featureFlags?: Array<FeatureFlagModel> | null;
    /**
     * Whether this rapid should be treated as commonsense validation.
     */
    isCommonSense?: boolean | null;
};


/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { IAssetInput } from './IAssetInput';
import type { IExampleTruth } from './IExampleTruth';
/**
 * Input model for updating an audience example.
 */
export type UpdateAudienceExampleEndpoint_Input = {
    /**
     * The truth for the example.
     */
    truth?: IExampleTruth;
    /**
     * The optional explanation that will be shown to the user when answering wrong.
     */
    explanation?: string | null;
    /**
     * An optional text context that will be shown to the user.
     */
    context?: string | null;
    /**
     * An optional asset that will be used as context to show to the user.
     */
    contextAsset?: IAssetInput;
    /**
     * The probability that if the user answers at random that they'll be correct.
     */
    randomCorrectProbability?: number | null;
    /**
     * Whether this example should be treated as commonsense validation.
     */
    isCommonSense?: boolean | null;
    /**
     * The sort index that controls the serving order of this example.
     */
    sortIndex?: number | null;
};


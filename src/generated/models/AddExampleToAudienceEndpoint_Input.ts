/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { FeatureFlagModel } from './FeatureFlagModel';
import type { IAssetInput } from './IAssetInput';
import type { IExamplePayload } from './IExamplePayload';
import type { IExampleTruth } from './IExampleTruth';
/**
 * Input model for adding an example to an audience.
 */
export type AddExampleToAudienceEndpoint_Input = {
    /**
     * The asset to use for the example.
     */
    asset: IAssetInput;
    /**
     * The payload to use for the example.
     */
    payload: IExamplePayload;
    /**
     * The ground truth for the example.
     */
    truth?: IExampleTruth;
    /**
     * The probability for an answer to be correct when randomly guessing.
     */
    randomCorrectProbability: number;
    /**
     * An explanation for the users if they answer the example incorrectly.
     */
    explanation?: string | null;
    /**
     * An optional textual context that provides additional information to the user.
     */
    context?: string | null;
    /**
     * An optional asset that provides additional context to the user.
     */
    contextAsset?: IAssetInput;
    /**
     * The sort index that controls the serving order of this example within the audience.
     * When null, the next sort index is automatically calculated.
     */
    sortIndex?: number;
    /**
     * The feature flags to enable for the example.
     */
    featureFlags?: Array<FeatureFlagModel> | null;
    /**
     * Whether this example should be treated as commonsense validation.
     * When true, incorrect answers are not accepted and the example affects global score.
     * When null, AI auto-detection will determine if the example is common sense.
     */
    isCommonSense?: boolean | null;
};


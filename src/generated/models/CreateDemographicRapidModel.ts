/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ClassifyPayload } from './ClassifyPayload';
import type { FeatureFlag } from './FeatureFlag';
import type { IAssetInput } from './IAssetInput';
/**
 * The model for creating a demographic rapid.
 */
export type CreateDemographicRapidModel = {
    /**
     * The identifier of the demographic classification.
     */
    key: string;
    /**
     * The payload for the classification.
     */
    payload: ClassifyPayload;
    /**
     * Optional feature flags to apply to the rapid.
     */
    featureFlags?: Array<FeatureFlag> | null;
    /**
     * An optional asset to associate with the rapid.
     */
    asset?: IAssetInput;
    /**
     * An optional text context to show to the user.
     */
    context?: string | null;
    /**
     * An optional asset to use as context to show to the user.
     */
    contextAsset?: IAssetInput;
};


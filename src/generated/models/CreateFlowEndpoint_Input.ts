/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { FeatureFlag } from './FeatureFlag';
export type CreateFlowEndpoint_Input = {
    /**
     * The name of the ranking flow.
     */
    name: string;
    /**
     * The ranking criteria used to compare items.
     */
    criteria: string;
    /**
     * Optional ID of the validation set to use.
     */
    validationSetId?: string | null;
    /**
     * Initial Elo rating for new items. Defaults to 1200.
     */
    startingElo?: number;
    /**
     * K-factor controlling Elo rating sensitivity. Defaults to 40.
     */
    kFactor?: number;
    /**
     * Scaling factor for Elo probability calculation. Defaults to 400.
     */
    scalingFactor?: number;
    /**
     * Maximum number of responses per comparison.
     */
    maxResponses?: number;
    /**
     * Ratio of concurrent serves to max responses. When set, limits serving to avoid over-collection.
     */
    serveToResponseRatio?: number;
    /**
     * Time in seconds a user has to submit an answer after loading the task. When set, overrides the global default.
     */
    serveTimeoutSeconds?: number;
    /**
     * Minimum number of responses per comparison. Defaults to 1.
     */
    minResponses?: number;
    /**
     * Deprecated. Use MaxResponses instead.
     */
    responsesRequired?: number;
    /**
     * Optional feature flags to enable for this flow.
     */
    featureFlags?: Array<FeatureFlag> | null;
};


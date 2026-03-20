/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { FeatureFlag } from './FeatureFlag';
export type UpdateConfigEndpoint_Input = {
    /**
     * The ranking criteria used to compare items.
     */
    criteria?: string | null;
    /**
     * Initial Elo rating for new items.
     */
    startingElo?: number | null;
    /**
     * K-factor controlling Elo rating sensitivity.
     */
    kFactor?: number | null;
    /**
     * Scaling factor for Elo probability calculation.
     */
    scalingFactor?: number | null;
    /**
     * Minimum number of responses per comparison.
     */
    minResponses?: number | null;
    /**
     * Maximum number of responses per comparison.
     */
    maxResponses?: number | null;
    /**
     * Ratio of concurrent serves to max responses. Set to null to remove the limit.
     */
    serveToResponseRatio?: number | null;
    /**
     * Time in seconds a user has to submit an answer after loading the task. Set to null to use the global default.
     */
    serveTimeoutSeconds?: number | null;
    /**
     * Deprecated. Use MaxResponses instead.
     */
    responsesRequired?: number | null;
    /**
     * Feature flags to enable for this flow.
     */
    featureFlags?: Array<FeatureFlag>;
    /**
     * Target average response count per completed item. Set to null to disable PID control.
     */
    targetResponseCount?: number | null;
    /**
     * PID proportional gain.
     */
    pidProportionalGain?: number | null;
    /**
     * PID integral gain.
     */
    pidIntegralGain?: number | null;
    /**
     * PID derivative gain.
     */
    pidDerivativeGain?: number | null;
    /**
     * Minimum sessions per minute the PID can set.
     */
    pidMinSessionsPerMinute?: number | null;
    /**
     * Maximum sessions per minute the PID can set.
     */
    pidMaxSessionsPerMinute?: number | null;
    /**
     * How PID output maps to campaign rate. Total: direct rate. PerBatch: multiplied by active batch count. PerBatchTimeWeighted: multiplied by time-weighted batch count.
     */
    pidBatchMode?: 'Total' | 'PerBatch' | 'PerBatchTimeWeighted';
};


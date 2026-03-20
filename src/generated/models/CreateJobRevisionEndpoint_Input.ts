/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { FeatureFlag } from './FeatureFlag';
import type { IOrderWorkflowModel } from './IOrderWorkflowModel';
import type { IRefereeModel } from './IRefereeModel';
/**
 * The input for the create job revision endpoint.
 */
export type CreateJobRevisionEndpoint_Input = {
    /**
     * The workflow configuration. If not provided, inherits from the previous revision.
     * Must be provided together with Referee if either is specified.
     */
    workflow?: IOrderWorkflowModel;
    /**
     * The referee configuration. If not provided, inherits from the previous revision.
     * Must be provided together with Workflow if either is specified.
     */
    referee?: IRefereeModel;
    /**
     * The dataset id. If not provided, inherits from the previous revision.
     */
    datasetId?: string | null;
    /**
     * The feature flags. If not provided, inherits from the previous revision.
     */
    featureFlags?: Array<FeatureFlag>;
    /**
     * The aggregator type. If not provided, inherits from the previous revision.
     */
    aggregatorType?: 'NonCommittal' | 'MajorityVote' | 'SimpleMatchup' | 'LocateCluster' | 'Classification' | 'Locate' | 'BoundingBox' | 'Line' | 'Transcription' | 'SinglePointLocate' | 'FreeText' | 'Scrub' | 'Ranking' | 'MultiRanking';
};


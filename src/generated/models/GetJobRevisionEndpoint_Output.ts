/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AggregatorType } from './AggregatorType';
import type { FeatureFlag } from './FeatureFlag';
import type { IOrderWorkflowModel } from './IOrderWorkflowModel';
import type { IRefereeModel } from './IRefereeModel';
import type { JobDefinitionRevisionState } from './JobDefinitionRevisionState';
/**
 * The result when a job revision has been retrieved.
 */
export type GetJobRevisionEndpoint_Output = {
    /**
     * The job definition id.
     */
    definitionId: string;
    /**
     * The revision number.
     */
    revisionNumber: number;
    state: JobDefinitionRevisionState;
    /**
     * The pipeline id.
     */
    pipelineId: string;
    /**
     * The dataset id.
     */
    datasetId: string;
    aggregatorType?: AggregatorType;
    /**
     * The workflow configuration. Can be used directly to create a new revision.
     */
    workflow: IOrderWorkflowModel;
    /**
     * The referee configuration. Can be used directly to create a new revision.
     */
    referee: IRefereeModel;
    /**
     * The feature flags.
     */
    featureFlags: Array<FeatureFlag>;
    /**
     * The creation timestamp.
     */
    createdAt: string;
    /**
     * The id of the user who created the revision.
     */
    createdById: string;
    /**
     * The email of the user who created the revision.
     */
    createdByMail: string;
};


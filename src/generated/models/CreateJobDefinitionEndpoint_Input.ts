/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AggregatorType } from './AggregatorType';
import type { FeatureFlag } from './FeatureFlag';
import type { IOrderWorkflowModel } from './IOrderWorkflowModel';
import type { IRefereeModel } from './IRefereeModel';
/**
 * The input for the create job definition endpoint.
 */
export type CreateJobDefinitionEndpoint_Input = {
    /**
     * The name of the definition.
     */
    definitionName: string;
    /**
     * The workflow configuration.
     */
    workflow: IOrderWorkflowModel;
    /**
     * The referee configuration.
     */
    referee: IRefereeModel;
    /**
     * The dataset id.
     */
    datasetId: string;
    /**
     * The feature flags.
     */
    featureFlags?: Array<FeatureFlag>;
    aggregatorType?: AggregatorType;
};


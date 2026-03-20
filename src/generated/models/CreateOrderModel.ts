/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AggregatorType } from './AggregatorType';
import type { FeatureFlagModel } from './FeatureFlagModel';
import type { IOrderWorkflowModel } from './IOrderWorkflowModel';
import type { IRefereeModel } from './IRefereeModel';
import type { ISelection } from './ISelection';
import type { IUserFilterModel } from './IUserFilterModel';
import type { RetrievalMode } from './RetrievalMode';
import type { StickyConfig } from './StickyConfig';
import type { StickyState } from './StickyState';
/**
 * This model is used to create a simple order
 */
export type CreateOrderModel = {
    /**
     * The name is used as an identifier for an order and can be freely chosen.
     */
    orderName: string;
    /**
     * The workflow helps to determine the tasks that need to be completed by the users.
     */
    workflow: IOrderWorkflowModel;
    /**
     * The referee is used to determine how many votes will be collected.
     */
    referee: IRefereeModel;
    aggregator?: AggregatorType;
    /**
     * The feature flags are used to enable or disable certain features.
     */
    featureFlags?: Array<FeatureFlagModel> | null;
    /**
     * The priority is used to prioritize over other orders.
     */
    priority?: number;
    stickyState?: StickyState;
    /**
     * Configuration for sticky campaign behavior. Takes precedence over StickyState if both are provided.
     */
    stickyConfig?: StickyConfig;
    /**
     * The user score dimensions are used to determine the score of the responses from the user.
     */
    userScoreDimensions?: Array<string> | null;
    /**
     * The demographic keys are used to determine which demographics to store on the responses from the user.
     */
    demographicKeys?: Array<string> | null;
    /**
     * The user filters are used to restrict the order to only collect votes from a specific demographic.
     */
    userFilters?: Array<IUserFilterModel> | null;
    /**
     * The validation set id can be changed to point to a specific validation set. if not provided a sane default will be
     * used.
     */
    validationSetId?: string | null;
    /**
     * The selections are used to determine which tasks are shown to a user.
     */
    selections?: Array<ISelection> | null;
    retrievalMode?: RetrievalMode;
    /**
     * The maximum number of times a user is allowed to see the same rapid.
     */
    maxIterations?: number;
    /**
     * Optional ID of the order that must complete before this order starts processing.
     */
    precedingOrderId?: string | null;
};


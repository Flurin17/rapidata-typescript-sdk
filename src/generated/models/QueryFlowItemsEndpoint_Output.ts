/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { FlowItemState } from './FlowItemState';
export type QueryFlowItemsEndpoint_Output = {
    /**
     * The unique identifier of the flow item.
     */
    id: string;
    /**
     * The ID of the dataset used by this flow item.
     */
    datasetId: string;
    /**
     * The ID of the workflow created for this flow item.
     */
    workflowId?: string | null;
    state: FlowItemState;
    /**
     * Optional context associated with this flow item.
     */
    context?: string | null;
    /**
     * The failure message if the flow item failed.
     */
    failureMessage?: string | null;
    /**
     * The timestamp when the flow item was created.
     */
    createdAt: string;
    /**
     * The timestamp when the flow item started processing.
     */
    startedAt?: string | null;
    /**
     * The timestamp when the flow item completed.
     */
    completedAt?: string | null;
    /**
     * The timestamp when the flow item failed.
     */
    failedAt?: string | null;
};


/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type CreateFlowItemEndpoint_Input = {
    /**
     * The ID of the dataset to use for this flow item.
     */
    datasetId: string;
    /**
     * Optional context to provide additional ranking guidance.
     */
    context?: string | null;
    /**
     * Optional time-to-live in seconds before the flow item expires.
     */
    timeToLiveInSeconds?: number;
    /**
     * Optional drain duration in seconds. When set, rapids are paused this many seconds before TTL expiry to allow in-flight responses to complete.
     */
    drainDurationInSeconds?: number;
};


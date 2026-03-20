/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type GetOrderByIdEndpoint_Output = {
    /**
     * The name of the order.
     */
    orderName: string;
    /**
     * The email of the customer who placed the order.
     */
    customerMail: string;
    /**
     * The date the order was placed.
     */
    orderDate: string;
    /**
     * The current state of the order.
     */
    state: string;
    /**
     * The ID of the pipeline associated with the order.
     */
    pipelineId: string;
    /**
     * Whether the order is locked.
     */
    isLocked: boolean;
    /**
     * Whether the order is publicly visible.
     */
    isPublic: boolean;
    /**
     * The failure message if the order failed.
     */
    failureMessage?: string | null;
};


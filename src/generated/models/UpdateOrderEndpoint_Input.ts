/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type UpdateOrderEndpoint_Input = {
    /**
     * The new name of the order, if specified.
     */
    name?: string | null;
    /**
     * The ID of the order that must complete before this order starts processing.
     * Set to null to clear an existing preceding order.
     */
    precedingOrderId?: string | null;
};


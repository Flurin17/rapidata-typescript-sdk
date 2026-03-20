/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { OrderState } from './OrderState';
export type QueryOrdersEndpoint_Output = {
    /**
     * The unique identifier of the order.
     */
    id: string;
    /**
     * The ID of the pipeline associated with the order.
     */
    pipelineId: string;
    /**
     * The date the order was placed.
     */
    orderDate: string | null;
    /**
     * The email of the customer who placed the order.
     */
    customerMail: string;
    state: OrderState;
    /**
     * The name of the order.
     */
    orderName: string;
    /**
     * Whether the order is publicly visible.
     */
    isPublic: boolean;
    /**
     * The failure message if the order failed.
     */
    failureMessage?: string | null;
};


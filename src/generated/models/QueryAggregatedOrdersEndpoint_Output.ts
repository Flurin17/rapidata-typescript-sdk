/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type QueryAggregatedOrdersEndpoint_Output = {
    /**
     * The total number of orders for this customer.
     */
    amount: number;
    /**
     * The number of orders placed in the last 7 days.
     */
    last7Days: number;
    /**
     * The date of the most recent order.
     */
    lastOrderDate: string;
    /**
     * The name of the most recent order.
     */
    lastOrderName: string;
    /**
     * The ID of the most recent order.
     */
    lastOrderId: string;
    /**
     * The customer's email address.
     */
    customerMail: string;
};


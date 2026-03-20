/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { FlowType } from './FlowType';
export type QueryFlowsEndpoint_Output = {
    /**
     * The unique identifier of the flow.
     */
    id: string;
    /**
     * The name of the flow.
     */
    name: string;
    type: FlowType;
    /**
     * The ID of the customer who owns the flow.
     */
    ownerId: string;
    /**
     * The email of the customer who owns the flow.
     */
    ownerMail: string;
    /**
     * The timestamp when the flow was created.
     */
    createdAt: string;
};


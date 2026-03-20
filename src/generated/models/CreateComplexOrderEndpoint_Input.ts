/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { IPipelineModel } from './IPipelineModel';
export type CreateComplexOrderEndpoint_Input = {
    /**
     * The name of the order.
     */
    orderName: string;
    /**
     * The pipeline configuration to use.
     */
    pipeline: IPipelineModel;
    /**
     * Whether the order is a demo.
     */
    isDemo?: boolean;
    /**
     * Optional ID of the order that must complete before this order starts processing.
     */
    precedingOrderId?: string | null;
};


/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { QueryCustomersEndpoint_Output } from './QueryCustomersEndpoint_Output';
export type QueryCustomersEndpoint_PagedResultOfOutput = {
    total: number;
    page: number;
    pageSize: number;
    items: Array<QueryCustomersEndpoint_Output>;
    totalPages?: number;
};


/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { FilterOperator } from './FilterOperator';
import type { LogicOperator } from './LogicOperator';
export type Filter = {
    field?: string | null;
    value?: any;
    operator?: FilterOperator;
    logic?: LogicOperator;
    filters?: Array<Filter>;
};


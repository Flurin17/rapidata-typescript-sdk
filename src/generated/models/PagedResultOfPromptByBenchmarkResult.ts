/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PromptByBenchmarkResult } from './PromptByBenchmarkResult';
export type PagedResultOfPromptByBenchmarkResult = {
    total: number;
    page: number;
    pageSize: number;
    items: Array<PromptByBenchmarkResult>;
    totalPages?: number;
};


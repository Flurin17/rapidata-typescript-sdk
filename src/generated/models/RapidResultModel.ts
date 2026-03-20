/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { IRapidResult } from './IRapidResult';
/**
 * The model for a Rapid result.
 */
export type RapidResultModel = {
    /**
     * The index of the session when the result was submitted.
     */
    sessionIndex: number;
    /**
     * The guess that was submitted.
     */
    result: IRapidResult;
};


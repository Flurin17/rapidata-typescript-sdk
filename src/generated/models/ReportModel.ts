/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { RapidIssue } from './RapidIssue';
/**
 * The model for reporting an issue with a rapid.
 */
export type ReportModel = {
    issue: RapidIssue;
    /**
     * An optional message typed by the user.
     */
    message?: string | null;
    /**
     * A dump, that the frontend defines and can read again.
     */
    dump?: string | null;
    /**
     * An optional identifier where the report originated from.
     */
    source?: string | null;
};


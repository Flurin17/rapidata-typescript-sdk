/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PageInfo } from './PageInfo';
import type { RapidState } from './RapidState';
import type { SortCriterion } from './SortCriterion';
/**
 * Model for getting the overview of a simple workflow result.
 */
export type GetEvaluationWorkflowResultsModel = {
    /**
     * The size of the page and the page number to display.
     */
    page?: PageInfo;
    /**
     * An optional list of states to filter the rapids by.
     */
    states?: Array<RapidState> | null;
    /**
     * A list of criteria to sort the results by.
     */
    sortCriteria?: Array<SortCriterion> | null;
};


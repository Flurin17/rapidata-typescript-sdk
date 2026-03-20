/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PageInfo } from './PageInfo';
import type { SortCriterion } from './SortCriterion';
/**
 * Model for getting the overview of a ranking workflow result.
 */
export type GetRankingWorkflowResultsModel = {
    /**
     * The size of the page and the page number to display.
     */
    page?: PageInfo;
    /**
     * A list of criteria to sort the results by.
     */
    sortCriteria?: Array<SortCriterion> | null;
};


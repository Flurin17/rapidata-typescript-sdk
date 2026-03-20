/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BoostModeModel } from './BoostModeModel';
import type { BoostStatusModel } from './BoostStatusModel';
export type GetBoostStatusEndpoint_Output = {
    status: BoostStatusModel;
    mode: BoostModeModel;
    /**
     * The list of active campaign identifiers.
     */
    activeCampaigns: Array<string>;
    /**
     * The list of inactive campaign identifiers.
     */
    inactiveCampaigns: Array<string>;
    /**
     * The list of unknown campaign identifiers.
     */
    unknownCampaigns: Array<number>;
};


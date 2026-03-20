/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { GetCampaignCacheEndpoint_CampaignEntry } from './GetCampaignCacheEndpoint_CampaignEntry';
export type GetCampaignCacheEndpoint_Output = {
    /**
     * The total number of cached campaigns.
     */
    count: number;
    /**
     * The list of cached campaign summaries.
     */
    campaigns: Array<GetCampaignCacheEndpoint_CampaignEntry>;
};


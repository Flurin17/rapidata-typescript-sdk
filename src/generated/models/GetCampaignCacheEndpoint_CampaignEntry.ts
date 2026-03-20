/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CampaignStatus } from './CampaignStatus';
export type GetCampaignCacheEndpoint_CampaignEntry = {
    id: string;
    name: string;
    status: CampaignStatus;
    priority: number;
    filterCount: number;
    selectionCount: number;
    userScoreDimensionCount: number;
    featureFlagCount: number;
    rateLimitCount: number;
    isPreviewEnabled: boolean;
    isSimpleBoostingLocked: boolean;
};


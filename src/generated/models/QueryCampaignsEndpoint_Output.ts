/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BoostingProfile } from './BoostingProfile';
import type { CampaignStatus } from './CampaignStatus';
export type QueryCampaignsEndpoint_Output = {
    /**
     * The unique identifier of the campaign.
     */
    id: string;
    /**
     * The name of the campaign.
     */
    name: string;
    status: CampaignStatus;
    /**
     * The priority level of the campaign.
     */
    priority: number;
    /**
     * The boosting profile configuration.
     */
    boostingProfile: BoostingProfile;
    /**
     * Whether the campaign requires a booster.
     */
    requiresBooster: boolean;
    /**
     * The email of the campaign owner.
     */
    ownerMail: string;
    /**
     * The timestamp when the campaign was created.
     */
    createdAt: string;
};


/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { FeatureFlag } from './FeatureFlag';
import type { ICampaignFilter } from './ICampaignFilter';
export type GetLeaderboardByIdResult = {
    id: string;
    orderId?: string | null;
    name: string;
    instruction: string;
    showPrompt: boolean;
    showPromptAsset: boolean;
    isInversed: boolean;
    responseBudget: number;
    minResponses: number;
    validationSetId?: string | null;
    filters: Array<ICampaignFilter>;
    featureFlags: Array<FeatureFlag>;
};


/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DistillingRetrievalMode } from './DistillingRetrievalMode';
import type { ExistingAssetInput } from './ExistingAssetInput';
import type { IAudienceFilter } from './IAudienceFilter';
/**
 * The body request to create an audience.
 */
export type CreateAudienceRequest = {
    /**
     * The name to give the newly created audience.
     */
    name: string;
    /**
     * An optional markdown-supported description of the audience's purpose.
     */
    description?: string | null;
    /**
     * The filters to apply to any orders created for this audience.
     * A filter can be used to restrict the audience to a specific subset of users.
     */
    filters?: Array<IAudienceFilter> | null;
    /**
     * The score used to determine whether a user graduates from the distilling campaign.
     */
    graduationScore?: number;
    /**
     * Score below which a graduated user is demoted back to distilling.
     * Must be less than or equal to GraduationScore. Defaults to null (uses GraduationScore).
     */
    demotionScore?: number;
    /**
     * The minimum number of users required for an audience to be activated.
     */
    minimumSizeForActivation?: number;
    /**
     * An optional logo image for the audience. Must be an existing image asset.
     */
    logo?: ExistingAssetInput;
    /**
     * Maximum responses before user exits the distilling campaign.
     * Defaults to 10. Set to null to disable this exit condition.
     */
    maxDistillingResponses?: number;
    /**
     * Minimum responses before the drop score check applies.
     * Users need at least this many responses before they can be kicked out for low score.
     * Defaults to 3. Set to null to apply drop score check from the first response.
     */
    dropMinResponses?: number;
    /**
     * Score floor - users below this score exit the distilling campaign
     * (only after completing DropMinResponses).
     * Defaults to 0.2. Set to null to disable this exit condition.
     */
    dropScore?: number;
    /**
     * Use instead.
     */
    minimumUserScore?: number;
    /**
     * Use instead.
     */
    minDistillingScoreFloor?: number;
    /**
     * Use instead.
     */
    minDistillingResponses?: number;
    /**
     * Whether the distilling campaign should be sticky (users stay until filters don't match).
     * Defaults to true (Temporary sticky).
     */
    isDistillingCampaignSticky?: boolean;
    /**
     * Maximum sessions (rapid retrievals) before user exits the distilling campaign.
     * Defaults to null (disabled). Set to a value to enable session-based exit condition.
     */
    maxDistillingSessions?: number;
    /**
     * Number of days of inactivity before a distilling user is dropped.
     * Defaults to null (disabled).
     */
    inactivityDropDays?: number;
    /**
     * Minimum submission rate (responses / sessions) before a user is dropped.
     * Defaults to null (disabled).
     */
    minSubmissionRate?: number;
    /**
     * Minimum number of sessions before the submission rate check applies.
     * Defaults to null (applies from first session).
     */
    minSessionsForSubmissionRate?: number;
    /**
     * Minimum submission rate for graduated users. If null, MinSubmissionRate applies to graduated users.
     * Set a lower value to be more lenient with graduated users.
     */
    minSubmissionRateGraduated?: number;
    distillingRetrievalMode?: DistillingRetrievalMode;
    /**
     * Minimum distilling users before disabling global boost.
     * Defaults to 200. Admin-only override.
     */
    minDistillingForGlobalBoost?: number;
    /**
     * Minimum graduated users before disabling distilling boost.
     * Defaults to 100. Admin-only override.
     */
    minGraduatedForDistillingBoost?: number;
};


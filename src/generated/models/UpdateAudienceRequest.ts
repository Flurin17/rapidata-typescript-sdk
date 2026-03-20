/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ExistingAssetInput } from './ExistingAssetInput';
import type { IAudienceFilter } from './IAudienceFilter';
/**
 * The body request to update an audience.
 */
export type UpdateAudienceRequest = {
    /**
     * The new name to give to this audience.
     */
    name?: string | null;
    /**
     * The new description for the audience. Supports markdown. Set to null to remove.
     */
    description?: string | null;
    /**
     * The new filters to apply to any orders created for this audience.
     * A filter can be used to restrict the audience to a specific subset of users.
     */
    filters?: Array<IAudienceFilter>;
    /**
     * The new logo image for the audience. Must be an existing image asset.
     * Set to null to remove the logo.
     */
    logo?: ExistingAssetInput;
    /**
     * Minimum graduated users before disabling distilling boost.
     * When graduated count is below this, external distilling audience ID is added to campaign boosting.
     */
    minGraduatedForDistillingBoost?: number | null;
    /**
     * Minimum distilling users before disabling global boost.
     * When distilling count is below this, GlobalBoostLevel is set above zero.
     */
    minDistillingForGlobalBoost?: number | null;
    /**
     * The score used to determine whether a user graduates from the distilling campaign.
     */
    graduationScore?: number | null;
    /**
     * Score below which a graduated user is demoted back to distilling.
     * Must be less than or equal to GraduationScore. Set to null to use GraduationScore.
     */
    demotionScore?: number | null;
    /**
     * Maximum responses before user exits the distilling campaign.
     * Set to null to disable this exit condition.
     */
    maxDistillingResponses?: number | null;
    /**
     * Minimum responses before the drop score check applies.
     * Users need at least this many responses before they can be kicked out for low score.
     * Set to null to apply drop score check from the first response.
     */
    dropMinResponses?: number | null;
    /**
     * Score floor - users below this score exit the distilling campaign
     * (only after completing DropMinResponses).
     * Set to null to disable this exit condition.
     */
    dropScore?: number | null;
    /**
     * Maximum sessions (rapid retrievals) before user exits the distilling campaign.
     * Set to a value to enable session-based exit condition.
     */
    maxDistillingSessions?: number | null;
    /**
     * Number of days of inactivity before a distilling user is dropped.
     * Set to null to disable this exit condition.
     */
    inactivityDropDays?: number | null;
    /**
     * Minimum submission rate (responses / sessions) before a user is dropped.
     * Set to null to disable this exit condition.
     */
    minSubmissionRate?: number | null;
    /**
     * Minimum number of sessions before the submission rate check applies.
     * Set to null to apply from the first session.
     */
    minSessionsForSubmissionRate?: number | null;
    /**
     * Minimum submission rate for graduated users. If null, MinSubmissionRate applies to graduated users.
     * Set a lower value to be more lenient with graduated users.
     */
    minSubmissionRateGraduated?: number | null;
    /**
     * The retrieval mode used by the distilling campaign to select rapids for users.
     */
    distillingRetrievalMode?: 'Random' | 'Shuffled' | 'Sequential';
    /**
     * Use instead.
     */
    minimumUserScore?: number | null;
    /**
     * Use instead.
     */
    minDistillingScoreFloor?: number | null;
    /**
     * Use instead.
     */
    minDistillingResponses?: number | null;
};


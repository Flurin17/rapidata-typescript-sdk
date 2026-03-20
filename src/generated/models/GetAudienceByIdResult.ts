/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AudienceStatus } from './AudienceStatus';
import type { BoostLevel } from './BoostLevel';
import type { DistillingRetrievalMode } from './DistillingRetrievalMode';
import type { IAudienceFilter } from './IAudienceFilter';
export type GetAudienceByIdResult = {
    id: string;
    name: string;
    description?: string | null;
    status: AudienceStatus;
    qualifiedUserCount: number;
    filters: Array<IAudienceFilter>;
    logo?: string | null;
    createdAt: string;
    ownerMail: string;
    isPublic: boolean;
    isDistilling: boolean;
    distillingCampaignId: string;
    minGraduatedForDistillingBoost?: number;
    minDistillingForGlobalBoost?: number;
    graduationScore: number;
    demotionScore?: number;
    maxDistillingResponses?: number;
    dropMinResponses?: number;
    dropScore?: number;
    maxDistillingSessions?: number;
    inactivityDropDays?: number;
    minSubmissionRate?: number;
    minSessionsForSubmissionRate?: number;
    minSubmissionRateGraduated?: number;
    distillingRetrievalMode: DistillingRetrievalMode;
    minimumUserScore?: number;
    minDistillingScoreFloor?: number;
    minDistillingResponses?: number;
    boostLevel: BoostLevel;
    randomAdmissionProbability?: number;
    health?: number;
    graduated?: number;
    dropped?: number;
};


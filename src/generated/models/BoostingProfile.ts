/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AudienceBoost } from './AudienceBoost';
export type BoostingProfile = {
    globalBoostLevel?: number;
    languageBoosts?: Array<string>;
    kayzenAudienceIds?: Array<number>;
    prospectBlacklist?: Array<number>;
    distillingBoosts?: Array<AudienceBoost>;
    labelingBoosts?: Array<AudienceBoost>;
};


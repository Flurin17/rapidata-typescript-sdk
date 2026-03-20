/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AudienceStatus } from './AudienceStatus';
import type { IAudienceFilter } from './IAudienceFilter';
export type QueryAudiencesResult = {
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
    randomAdmissionProbability?: number;
    health?: number;
    graduated?: number;
    dropped?: number;
};


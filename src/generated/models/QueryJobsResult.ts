/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AudienceJobState } from './AudienceJobState';
export type QueryJobsResult = {
    jobId: string;
    name: string;
    definitionId: string;
    audienceId: string;
    revisionNumber: number;
    pipelineId: string;
    status: AudienceJobState;
    createdAt: string;
};


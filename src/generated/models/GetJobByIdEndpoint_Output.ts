/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * The result when a job has been retrieved.
 */
export type GetJobByIdEndpoint_Output = {
    /**
     * The job id.
     */
    jobId: string;
    /**
     * The job name.
     */
    name: string;
    /**
     * The job definition id.
     */
    definitionId: string;
    /**
     * The audience id.
     */
    audienceId: string;
    /**
     * The revision number.
     */
    revisionNumber: number;
    /**
     * The pipeline id.
     */
    pipelineId: string;
    /**
     * The job status.
     */
    status: string;
    /**
     * The timestamp when the job was completed.
     */
    completedAt?: string | null;
    /**
     * The file name of the result.
     */
    resultFileName?: string | null;
    /**
     * The timestamp when the job failed.
     */
    failedAt?: string | null;
    /**
     * The failure message.
     */
    failureMessage?: string | null;
    /**
     * The creation timestamp.
     */
    createdAt: string;
    /**
     * The owner id.
     */
    ownerId: string;
    /**
     * The owner email.
     */
    ownerMail: string;
};


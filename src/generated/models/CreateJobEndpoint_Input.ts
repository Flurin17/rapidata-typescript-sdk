/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * The input for the create job endpoint.
 */
export type CreateJobEndpoint_Input = {
    /**
     * The id of the job definition to use.
     */
    jobDefinitionId: string;
    /**
     * The id of the audience to target.
     */
    audienceId: string;
    /**
     * The revision number to use. If not specified, the latest revision will be used.
     */
    revisionNumber?: number;
    /**
     * The name of the job. If not specified, defaults to "{definition name}:{revision number}".
     */
    name?: string | null;
    /**
     * The priority of the job. Higher values mean higher priority. Default is 50.
     */
    priority?: number;
};


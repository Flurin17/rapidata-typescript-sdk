/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateJobDefinitionEndpoint_Input } from '../models/CreateJobDefinitionEndpoint_Input';
import type { CreateJobDefinitionEndpoint_Output } from '../models/CreateJobDefinitionEndpoint_Output';
import type { CreateJobEndpoint_Input } from '../models/CreateJobEndpoint_Input';
import type { CreateJobEndpoint_Output } from '../models/CreateJobEndpoint_Output';
import type { CreateJobRevisionEndpoint_Input } from '../models/CreateJobRevisionEndpoint_Input';
import type { CreateJobRevisionEndpoint_Output } from '../models/CreateJobRevisionEndpoint_Output';
import type { GetJobByIdEndpoint_Output } from '../models/GetJobByIdEndpoint_Output';
import type { GetJobDefinitionByIdEndpoint_Output } from '../models/GetJobDefinitionByIdEndpoint_Output';
import type { GetJobRevisionEndpoint_Output } from '../models/GetJobRevisionEndpoint_Output';
import type { PagedResultOfQueryJobDefinitionsResult } from '../models/PagedResultOfQueryJobDefinitionsResult';
import type { PagedResultOfQueryJobRevisionsResult } from '../models/PagedResultOfQueryJobRevisionsResult';
import type { PagedResultOfQueryJobsResult } from '../models/PagedResultOfQueryJobsResult';
import type { UpdateJobDefinitionEndpoint_Input } from '../models/UpdateJobDefinitionEndpoint_Input';
import type { UpdateJobEndpoint_Input } from '../models/UpdateJobEndpoint_Input';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class JobService {
    /**
     * Creates a new job definition.
     * A preview pipeline is automatically created and returned in the response.
     * @returns CreateJobDefinitionEndpoint_Output OK
     * @throws ApiError
     */
    public static postJobDefinition({
        requestBody,
    }: {
        /**
         * The job definition parameters.
         */
        requestBody: CreateJobDefinitionEndpoint_Input,
    }): CancelablePromise<CreateJobDefinitionEndpoint_Output> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/job/definition',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
                401: `Unauthenticated`,
                403: `Forbidden`,
            },
        });
    }
    /**
     * Creates a new job from a job definition and audience.
     * If the audience is not already recruiting, recruiting is started automatically.
     * The RecruitingStarted field indicates whether this happened.
     * @returns CreateJobEndpoint_Output OK
     * @throws ApiError
     */
    public static postJob({
        requestBody,
    }: {
        /**
         * The job creation parameters.
         */
        requestBody: CreateJobEndpoint_Input,
    }): CancelablePromise<CreateJobEndpoint_Output> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/job',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
                401: `Unauthenticated`,
                403: `Forbidden`,
            },
        });
    }
    /**
     * Creates a new revision for an existing job definition.
     * Unspecified fields are inherited from the previous revision. Workflow and Referee must be
     * provided together if either is specified.
     * @returns CreateJobRevisionEndpoint_Output OK
     * @throws ApiError
     */
    public static postJobDefinitionRevision({
        definitionId,
        requestBody,
    }: {
        /**
         * The id of the job definition to create a revision for.
         */
        definitionId: string,
        /**
         * The revision parameters.
         */
        requestBody: CreateJobRevisionEndpoint_Input,
    }): CancelablePromise<CreateJobRevisionEndpoint_Output> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/job/definition/{definitionId}/revision',
            path: {
                'definitionId': definitionId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
                401: `Unauthenticated`,
                403: `Forbidden`,
            },
        });
    }
    /**
     * Gets the latest revision for a job definition.
     * @returns GetJobRevisionEndpoint_Output OK
     * @throws ApiError
     */
    public static getJobDefinitionRevision({
        definitionId,
    }: {
        /**
         * The id of the job definition.
         */
        definitionId: string,
    }): CancelablePromise<GetJobRevisionEndpoint_Output> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/job/definition/{definitionId}/revision',
            path: {
                'definitionId': definitionId,
            },
            errors: {
                400: `Bad Request`,
                401: `Unauthenticated`,
                403: `Forbidden`,
            },
        });
    }
    /**
     * Deletes a job definition and all its revisions.
     * @returns void
     * @throws ApiError
     */
    public static deleteJobDefinition({
        definitionId,
    }: {
        /**
         * The id of the job definition to delete.
         */
        definitionId: string,
    }): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/job/definition/{definitionId}',
            path: {
                'definitionId': definitionId,
            },
            errors: {
                400: `Bad Request`,
                401: `Unauthenticated`,
                403: `Forbidden`,
            },
        });
    }
    /**
     * Gets a job definition by its id.
     * @returns GetJobDefinitionByIdEndpoint_Output OK
     * @throws ApiError
     */
    public static getJobDefinition({
        definitionId,
    }: {
        /**
         * The id of the job definition to retrieve.
         */
        definitionId: string,
    }): CancelablePromise<GetJobDefinitionByIdEndpoint_Output> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/job/definition/{definitionId}',
            path: {
                'definitionId': definitionId,
            },
            errors: {
                400: `Bad Request`,
                401: `Unauthenticated`,
                403: `Forbidden`,
            },
        });
    }
    /**
     * Updates a job definition.
     * @returns void
     * @throws ApiError
     */
    public static patchJobDefinition({
        definitionId,
        requestBody,
    }: {
        /**
         * The id of the job definition to update.
         */
        definitionId: string,
        /**
         * The fields to update.
         */
        requestBody: UpdateJobDefinitionEndpoint_Input,
    }): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/job/definition/{definitionId}',
            path: {
                'definitionId': definitionId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
                401: `Unauthenticated`,
                403: `Forbidden`,
            },
        });
    }
    /**
     * Deletes a job.
     * @returns void
     * @throws ApiError
     */
    public static deleteJob({
        jobId,
    }: {
        /**
         * The id of the job to delete.
         */
        jobId: string,
    }): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/job/{jobId}',
            path: {
                'jobId': jobId,
            },
            errors: {
                400: `Bad Request`,
                401: `Unauthenticated`,
                403: `Forbidden`,
            },
        });
    }
    /**
     * Gets a job by its id.
     * @returns GetJobByIdEndpoint_Output OK
     * @throws ApiError
     */
    public static getJob({
        jobId,
    }: {
        /**
         * The id of the job to retrieve.
         */
        jobId: string,
    }): CancelablePromise<GetJobByIdEndpoint_Output> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/job/{jobId}',
            path: {
                'jobId': jobId,
            },
            errors: {
                400: `Bad Request`,
                401: `Unauthenticated`,
                403: `Forbidden`,
            },
        });
    }
    /**
     * Updates a job.
     * @returns void
     * @throws ApiError
     */
    public static patchJob({
        jobId,
        requestBody,
    }: {
        /**
         * The id of the job to update.
         */
        jobId: string,
        /**
         * The fields to update.
         */
        requestBody: UpdateJobEndpoint_Input,
    }): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/job/{jobId}',
            path: {
                'jobId': jobId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
                401: `Unauthenticated`,
                403: `Forbidden`,
            },
        });
    }
    /**
     * Downloads the results of a job as a file attachment.
     * @returns binary OK
     * @throws ApiError
     */
    public static getJobDownloadResults({
        jobId,
    }: {
        /**
         * The id of the job to download results for.
         */
        jobId: string,
    }): CancelablePromise<Blob> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/job/{jobId}/download-results',
            path: {
                'jobId': jobId,
            },
            errors: {
                401: `Unauthenticated`,
                403: `Forbidden`,
            },
        });
    }
    /**
     * Gets the results of a job as a JSON string.
     * For file download, use the download-results endpoint instead.
     * @returns string OK
     * @throws ApiError
     */
    public static getJobResults({
        jobId,
    }: {
        /**
         * The id of the job to get results for.
         */
        jobId: string,
    }): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/job/{jobId}/results',
            path: {
                'jobId': jobId,
            },
            errors: {
                401: `Unauthenticated`,
                403: `Forbidden`,
            },
        });
    }
    /**
     * Gets a specific revision for a job definition.
     * @returns GetJobRevisionEndpoint_Output OK
     * @throws ApiError
     */
    public static getJobDefinitionRevision1({
        definitionId,
        revisionNumber,
    }: {
        /**
         * The id of the job definition.
         */
        definitionId: string,
        /**
         * The revision number to retrieve.
         */
        revisionNumber: number,
    }): CancelablePromise<GetJobRevisionEndpoint_Output> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/job/definition/{definitionId}/revision/{revisionNumber}',
            path: {
                'definitionId': definitionId,
                'revisionNumber': revisionNumber,
            },
            errors: {
                400: `Bad Request`,
                401: `Unauthenticated`,
                403: `Forbidden`,
            },
        });
    }
    /**
     * Queries job definitions based on filter, page, and sort criteria.
     * @returns PagedResultOfQueryJobDefinitionsResult OK
     * @throws ApiError
     */
    public static getJobDefinitions({
        request,
    }: {
        /**
         * The parameters for filtering, paging, and sorting
         */
        request?: any,
    }): CancelablePromise<PagedResultOfQueryJobDefinitionsResult> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/job/definitions',
            query: {
                'request': request,
            },
        });
    }
    /**
     * Queries job revisions for a specific definition based on filter, page, and sort criteria.
     * @returns PagedResultOfQueryJobRevisionsResult OK
     * @throws ApiError
     */
    public static getJobDefinitionRevisions({
        definitionId,
        request,
    }: {
        /**
         * The id of the job definition
         */
        definitionId: string,
        /**
         * The parameters for filtering, paging, and sorting
         */
        request?: any,
    }): CancelablePromise<PagedResultOfQueryJobRevisionsResult> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/job/definition/{definitionId}/revisions',
            path: {
                'definitionId': definitionId,
            },
            query: {
                'request': request,
            },
        });
    }
    /**
     * Queries jobs based on filter, page, and sort criteria.
     * @returns PagedResultOfQueryJobsResult OK
     * @throws ApiError
     */
    public static getJobs({
        request,
    }: {
        /**
         * The parameters for filtering, paging, and sorting
         */
        request?: any,
    }): CancelablePromise<PagedResultOfQueryJobsResult> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/jobs',
            query: {
                'request': request,
            },
        });
    }
}

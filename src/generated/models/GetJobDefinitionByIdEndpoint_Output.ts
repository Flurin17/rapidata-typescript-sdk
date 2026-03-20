/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DefinitionType } from './DefinitionType';
/**
 * The result when a job definition has been retrieved.
 */
export type GetJobDefinitionByIdEndpoint_Output = {
    /**
     * The job definition id.
     */
    definitionId: string;
    /**
     * The name of the job definition.
     */
    name: string;
    definitionType: DefinitionType;
    /**
     * The creation timestamp.
     */
    createdAt: string;
};


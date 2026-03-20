/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { IAssetInput } from './IAssetInput';
export type CreateDatasetGroupEndpoint_Input = {
    /**
     * The name of the group.
     */
    group: string;
    /**
     * The optional text context for the group.
     */
    context?: string | null;
    /**
     * The optional asset context for the group.
     */
    contextAsset?: IAssetInput;
};


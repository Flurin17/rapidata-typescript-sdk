/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { IAssetInput } from './IAssetInput';
/**
 * The body request for creating a new datapoint
 */
export type CreateDatapointModel = {
    /**
     * The asset within the datapoint
     */
    asset: IAssetInput;
    /**
     * An additional context to show the users when solving the rapid.
     */
    context?: string | null;
    /**
     * ContextAsset
     */
    contextAsset?: IAssetInput;
    /**
     * The sort index represents the order of the datapoint in the dataset
     */
    sortIndex?: number;
    /**
     * The group a datapoint belongs to.
     */
    group?: string | null;
    /**
     * For audio or video assets, an optional transcription of the content.
     */
    transcription?: string | null;
    /**
     * Private metadata for internal tracking. Not displayed to users.
     */
    privateMetadata?: Record<string, string> | null;
};


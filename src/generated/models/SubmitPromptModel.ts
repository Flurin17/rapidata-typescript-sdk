/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { IAssetInput } from './IAssetInput';
/**
 * The model user for submitting a prompt to a benchmark.
 */
export type SubmitPromptModel = {
    /**
     * An identifier associated to the prompt
     */
    identifier: string;
    /**
     * The prompt
     */
    prompt?: string | null;
    /**
     * PromptAsset
     */
    promptAsset?: IAssetInput;
    /**
     * The tags of a given prompt
     */
    tags?: Array<string> | null;
};


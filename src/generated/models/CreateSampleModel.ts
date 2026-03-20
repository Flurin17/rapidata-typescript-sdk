/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { IAssetInput } from './IAssetInput';
/**
 * The model used to create a sample to a participant.
 */
export type CreateSampleModel = {
    /**
     * The identifier used to correlate samples of different participants.
     */
    identifier: string;
    /**
     * The asset input for the sample.
     */
    asset: IAssetInput;
};


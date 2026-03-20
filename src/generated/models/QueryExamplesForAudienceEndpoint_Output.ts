/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { IAssetModel } from './IAssetModel';
import type { IExamplePayload } from './IExamplePayload';
import type { IExampleTruth } from './IExampleTruth';
export type QueryExamplesForAudienceEndpoint_Output = {
    /**
     * The unique identifier of the example.
     */
    id: string;
    /**
     * The ID of the rapid associated with this example.
     */
    rapidId?: string | null;
    /**
     * The asset associated with this example.
     */
    asset: IAssetModel;
    /**
     * The payload of the example.
     */
    payload: IExamplePayload;
    /**
     * The number of correct responses.
     */
    correctCount: number;
    /**
     * The number of incorrect responses.
     */
    incorrectCount: number;
    /**
     * The truth value of the example.
     */
    truth?: IExampleTruth;
    /**
     * The context text for the example.
     */
    context?: string | null;
    /**
     * The context asset for the example.
     */
    contextAsset?: IAssetModel;
    /**
     * The explanation for the example.
     */
    explanation?: string | null;
    /**
     * The probability of a random correct answer.
     */
    randomCorrectProbability?: number;
    /**
     * Whether this example is common sense.
     */
    isCommonSense?: boolean | null;
    /**
     * The sort index that controls serving order.
     */
    sortIndex?: number;
};


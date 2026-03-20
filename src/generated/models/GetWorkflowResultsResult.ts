/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { GetWorkflowResultsResult_Response } from './GetWorkflowResultsResult_Response';
import type { IAssetModel } from './IAssetModel';
import type { IRapidPayload } from './IRapidPayload';
import type { RapidState } from './RapidState';
export type GetWorkflowResultsResult = {
    rapidId: string;
    payload: IRapidPayload;
    asset: IAssetModel;
    responses: Array<GetWorkflowResultsResult_Response>;
    state: RapidState;
    context?: string | null;
    contextAsset?: IAssetModel;
    decisiveness?: number;
};


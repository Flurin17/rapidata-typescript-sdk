/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { GetResponsesForRapidResult_Response } from './GetResponsesForRapidResult_Response';
import type { IAssetModel } from './IAssetModel';
import type { RapidState } from './RapidState';
export type GetResponsesForRapidResult = {
    rapidId: string;
    asset: IAssetModel;
    responses: Array<GetResponsesForRapidResult_Response>;
    state: RapidState;
};


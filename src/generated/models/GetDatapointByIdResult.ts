/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DatapointState } from './DatapointState';
import type { IAssetModel } from './IAssetModel';
export type GetDatapointByIdResult = {
    id: string;
    datasetId: string;
    state: DatapointState;
    sortIndex: number;
    asset: IAssetModel;
    createdAt: string;
};


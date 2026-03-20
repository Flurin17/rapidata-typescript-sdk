/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { IAssetModel } from './IAssetModel';
export type GetSampleByIdResult = {
    id: string;
    identifier: string;
    participantId: string;
    participantName: string;
    asset: IAssetModel;
    prompt?: string | null;
    promptAsset?: IAssetModel;
    tags: Array<string>;
    createdAt?: string;
    ownerId?: string;
    ownerMail: string;
};


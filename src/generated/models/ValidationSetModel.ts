/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AssetType } from './AssetType';
import type { PromptType } from './PromptType';
import type { RapidModality } from './RapidModality';
export type ValidationSetModel = {
    id: string;
    name: string;
    assetType: AssetType;
    modality: RapidModality;
    promptType: PromptType;
    dimensions?: Array<string> | null;
    isPublic: boolean;
    ownerId: string;
    ownerMail: string;
    createdAt: string;
};


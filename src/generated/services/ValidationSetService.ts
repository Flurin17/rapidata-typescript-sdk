/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AddValidationRapidModel } from '../models/AddValidationRapidModel';
import type { AssetType } from '../models/AssetType';
import type { CreateEmptyValidationSetResult } from '../models/CreateEmptyValidationSetResult';
import type { CreateValidationSetModel } from '../models/CreateValidationSetModel';
import type { FileStreamResult } from '../models/FileStreamResult';
import type { GetAvailableValidationSetsResult } from '../models/GetAvailableValidationSetsResult';
import type { GetRecommendedValidationSetResult } from '../models/GetRecommendedValidationSetResult';
import type { GetValidationSetByIdResult } from '../models/GetValidationSetByIdResult';
import type { PagedResultOfGetValidationRapidsResult } from '../models/PagedResultOfGetValidationRapidsResult';
import type { PagedResultOfValidationSetModel } from '../models/PagedResultOfValidationSetModel';
import type { PromptType } from '../models/PromptType';
import type { RapidModality } from '../models/RapidModality';
import type { UpdateValidationSetModel } from '../models/UpdateValidationSetModel';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ValidationSetService {
    /**
     * Queries available validation sets based on the provided filter, paging and sorting criteria.
     * @returns PagedResultOfValidationSetModel OK
     * @throws ApiError
     */
    public static getValidationSets({
        model,
    }: {
        /**
         * The model containing the query parameters.
         */
        model?: any,
    }): CancelablePromise<PagedResultOfValidationSetModel> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/validation-sets',
            query: {
                'model': model,
            },
        });
    }
    /**
     * Gets a validation set that is available to the user and best matches the provided parameters.
     * This is not a hard filter, instead it is used to find validation sets that have similar characteristics to the provided instruction.
     * @returns GetRecommendedValidationSetResult OK
     * @throws ApiError
     */
    public static getValidationSetRecommended({
        assetType,
        modality,
        promptType,
        instruction,
    }: {
        /**
         * The types of assets that the validation set should contain.
         * An asset type can be an image, video, audio, text, or any combination of these.
         *
         * This parameter is a flag, meaning that it can be null or contain multiple values.
         * If multiple values are provided, a validation set will be chosen that contains at least one of the specified asset types.
         */
        assetType?: AssetType,
        /**
         * The rapid modalities that the validation set should contain.
         * The modality is the type of rapid such as classify, compare, locate, etc.
         *
         * This parameter is a flag, meaning that it can be null or contain multiple values.
         * If multiple values are provided, a validation set will be chosen that contains at least one of the specified modalities.
         */
        modality?: RapidModality,
        /**
         * The prompt types that the validation set should contain.
         * A prompt type is the additional information that is presented to the user when solving a rapid.
         * For example, a prompt type can be either text or an asset if the context is an image or video.
         *
         * This parameter is a flag, meaning that it can be null or contain multiple values.
         * If multiple values are provided, a validation set will be chosen that contains at least one of the specified prompt types.
         */
        promptType?: PromptType,
        /**
         * An instruction that can be used to filter for validation sets that have similar instructions.
         * An instruction is a text that is presented to the user when solving a rapid that explains how to solve the rapid.
         */
        instruction?: string,
    }): CancelablePromise<GetRecommendedValidationSetResult> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/validation-set/recommended',
            query: {
                'assetType': assetType,
                'modality': modality,
                'promptType': promptType,
                'instruction': instruction,
            },
            errors: {
                404: `Not Found`,
            },
        });
    }
    /**
     * Gets a validation set by the id.
     * @returns void
     * @throws ApiError
     */
    public static deleteValidationSet({
        validationSetId,
    }: {
        /**
         * The id of the validation set to get.
         */
        validationSetId: string,
    }): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/validation-set/{validationSetId}',
            path: {
                'validationSetId': validationSetId,
            },
        });
    }
    /**
     * Gets a validation set by the id.
     * @returns GetValidationSetByIdResult OK
     * @throws ApiError
     */
    public static getValidationSet({
        validationSetId,
    }: {
        /**
         * The id of the validation set to get.
         */
        validationSetId: string,
    }): CancelablePromise<GetValidationSetByIdResult> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/validation-set/{validationSetId}',
            path: {
                'validationSetId': validationSetId,
            },
        });
    }
    /**
     * Updates different characteristics of a validation set.
     * @returns void
     * @throws ApiError
     */
    public static patchValidationSet({
        validationSetId,
        requestBody,
    }: {
        /**
         * The Id of the validation set to update the dimensions for.
         */
        validationSetId: string,
        /**
         * The body request for updating the shouldAlert property.
         */
        requestBody: UpdateValidationSetModel,
    }): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/validation-set/{validationSetId}',
            path: {
                'validationSetId': validationSetId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Gets the available validation sets for the current user.
     * @returns GetAvailableValidationSetsResult OK
     * @throws ApiError
     */
    public static getValidationSetsAvailable(): CancelablePromise<GetAvailableValidationSetsResult> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/validation-sets/available',
        });
    }
    /**
     * Creates a new empty validation set.
     * @returns CreateEmptyValidationSetResult OK
     * @throws ApiError
     */
    public static postValidationSet({
        requestBody,
    }: {
        /**
         * The body request for creating a new validation set.
         */
        requestBody: CreateValidationSetModel,
    }): CancelablePromise<CreateEmptyValidationSetResult> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/validation-set',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Queries the validation rapids for a specific validation set.
     * @returns PagedResultOfGetValidationRapidsResult OK
     * @throws ApiError
     */
    public static getValidationSetRapids({
        validationSetId,
        model,
    }: {
        /**
         * The validation set to query.
         */
        validationSetId: string,
        /**
         * The request formatted as a JSON in the query parameters.
         */
        model?: any,
    }): CancelablePromise<PagedResultOfGetValidationRapidsResult> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/validation-set/{validationSetId}/rapids',
            path: {
                'validationSetId': validationSetId,
            },
            query: {
                'model': model,
            },
        });
    }
    /**
     * Adds a new validation rapid to the validation set using JSON body.
     * @returns void
     * @throws ApiError
     */
    public static postValidationSetRapid({
        validationSetId,
        requestBody,
    }: {
        /**
         * The validation set to add a rapid to.
         */
        validationSetId: string,
        /**
         * The validation rapid data including asset, payload, and metadata.
         */
        requestBody: AddValidationRapidModel,
    }): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/validation-set/{validationSetId}/rapid',
            path: {
                'validationSetId': validationSetId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Updates the visibility of a validation set.
     * Public validation sets are used to automatically add a validation set to an order if no validation set is specified.
     * @returns void
     * @throws ApiError
     */
    public static patchValidationSetVisibility({
        validationSetId,
        isPublic,
    }: {
        /**
         * The id of the validation set to update the visibility for.
         */
        validationSetId: string,
        /**
         * Whether the validation set should be public or private.
         */
        isPublic?: boolean,
    }): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/validation-set/{validationSetId}/visibility',
            path: {
                'validationSetId': validationSetId,
            },
            query: {
                'isPublic': isPublic,
            },
        });
    }
    /**
     * Exports all rapids of a validation-set to a file.
     * @returns FileStreamResult OK
     * @throws ApiError
     */
    public static getValidationSetExport({
        validationSetId,
    }: {
        validationSetId: string,
    }): CancelablePromise<FileStreamResult> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/validation-set/{validationSetId}/export',
            path: {
                'validationSetId': validationSetId,
            },
        });
    }
}

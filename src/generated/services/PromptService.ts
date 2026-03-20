/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { UpdatePromptTagsModel } from '../models/UpdatePromptTagsModel';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class PromptService {
    /**
     * Updates the tags associated with a prompt.
     * @returns void
     * @throws ApiError
     */
    public static putBenchmarkPromptTags({
        promptId,
        requestBody,
    }: {
        promptId: string,
        requestBody: UpdatePromptTagsModel,
    }): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/benchmark-prompt/{promptId}/tags',
            path: {
                'promptId': promptId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
}

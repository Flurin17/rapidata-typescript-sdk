/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type CreateBatchUploadEndpoint_Input = {
    /**
     * The URLs to download and process.
     */
    urls: Array<string>;
    /**
     * Optional client-supplied identifier to group related batch uploads.
     */
    correlationId?: string | null;
};


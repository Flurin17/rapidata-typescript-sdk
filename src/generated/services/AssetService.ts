/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CompressionLibrary } from '../models/CompressionLibrary';
import type { GetFileMetadataResult } from '../models/GetFileMetadataResult';
import type { IFormFile } from '../models/IFormFile';
import type { UploadFileResult } from '../models/UploadFileResult';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AssetService {
    /**
     * Compresses an uploaded image and returns the WebP result.
     * Compression metrics are returned in response headers: X-Original-Size, X-Compressed-Size,
     * X-Processing-Time-Ms, X-Original-Dimensions, X-Output-Dimensions.
     * @returns binary OK
     * @throws ApiError
     */
    public static postAssetCompress({
        formData,
        library,
        quality = 85,
        maxdim = 800,
    }: {
        /**
         * The image file to compress.
         */
        formData: {
            file: IFormFile;
        },
        /**
         * The compression library to use.
         */
        library?: CompressionLibrary,
        /**
         * The compression quality from 1 to 100.
         */
        quality?: number,
        /**
         * The maximum dimension (width or height) of the output image.
         */
        maxdim?: number,
    }): CancelablePromise<Blob> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/asset/compress',
            query: {
                'library': library,
                'quality': quality,
                'maxdim': maxdim,
            },
            formData: formData,
            mediaType: 'multipart/form-data',
            errors: {
                400: `Bad Request`,
                401: `Unauthenticated`,
                403: `Forbidden`,
            },
        });
    }
    /**
     * Uploads a single asset to S3 and returns the asset details.
     * This endpoint allows uploading a single file to S3 storage with the asset creator.
     * The uploaded asset will be stored using the configured S3 settings and a unique filename will be generated.
     * @returns UploadFileResult OK
     * @throws ApiError
     */
    public static postAssetFile({
        formData,
    }: {
        /**
         * The file to upload to S3.
         */
        formData: {
            file?: IFormFile;
        },
    }): CancelablePromise<UploadFileResult> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/asset/file',
            formData: formData,
            mediaType: 'multipart/form-data',
        });
    }
    /**
     * Uploads a single asset to S3 and returns the asset details.
     * This endpoint allows uploading a single file to S3 storage with the asset creator.
     * The uploaded asset will be stored using the configured S3 settings and a unique filename will be generated.
     * @returns UploadFileResult OK
     * @throws ApiError
     */
    public static postAssetUrl({
        url,
    }: {
        /**
         * The url of the file to upload to S3.
         */
        url?: string,
    }): CancelablePromise<UploadFileResult> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/asset/url',
            query: {
                'url': url,
            },
        });
    }
    /**
     * Gets the metadata for an asset by file name.
     * This endpoint retrieves metadata information for an asset stored in S3.
     * The metadata includes details such as content type, size, creation date, and custom metadata fields.
     * @returns GetFileMetadataResult OK
     * @throws ApiError
     */
    public static getAssetMetadata({
        fileName,
    }: {
        /**
         * The name of the file to retrieve metadata for.
         */
        fileName: string,
    }): CancelablePromise<GetFileMetadataResult> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/asset/{fileName}/metadata',
            path: {
                'fileName': fileName,
            },
            errors: {
                404: `Not Found`,
            },
        });
    }
}

/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateBridgeTokenResult } from '../models/CreateBridgeTokenResult';
import type { GoogleOneTapLoginModel } from '../models/GoogleOneTapLoginModel';
import type { NotAvailableYetResult } from '../models/NotAvailableYetResult';
import type { ReadBridgeTokenKeysResult } from '../models/ReadBridgeTokenKeysResult';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class IdentityService {
    /**
     * Creates a pair of read and write keys for a client.
     * The write key is used to store the authentication result.
     * The read key is used to retrieve the authentication result.
     * @returns CreateBridgeTokenResult OK
     * @throws ApiError
     */
    public static postIdentityBridgeToken({
        clientId,
    }: {
        /**
         * The client ID to create the keys for.
         */
        clientId?: string,
    }): CancelablePromise<CreateBridgeTokenResult> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/identity/bridge-token',
            query: {
                'clientId': clientId,
            },
        });
    }
    /**
     * Tries to read the bridge token keys for a given read key.
     * The read key is used to retrieve the authentication result written by the write key.
     * @returns ReadBridgeTokenKeysResult OK
     * @returns NotAvailableYetResult Accepted
     * @throws ApiError
     */
    public static getIdentityBridgeToken({
        readKey,
    }: {
        /**
         * The read key to read the bridge token keys for.
         */
        readKey?: string,
    }): CancelablePromise<ReadBridgeTokenKeysResult | NotAvailableYetResult> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/identity/bridge-token',
            query: {
                'readKey': readKey,
            },
        });
    }
    /**
     * Sets the referrer for the current customer.
     * @returns void
     * @throws ApiError
     */
    public static postIdentityReferrer({
        referrer,
    }: {
        referrer?: string,
    }): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/identity/referrer',
            query: {
                'referrer': referrer,
            },
        });
    }
    /**
     * Signs in a user using a token received from Google One Tap.
     * @returns void
     * @throws ApiError
     */
    public static postIdentityGoogleOneTap({
        requestBody,
    }: {
        /**
         * The body of the request containing the id token.
         */
        requestBody: GoogleOneTapLoginModel,
    }): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/identity/google-one-tap',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
}

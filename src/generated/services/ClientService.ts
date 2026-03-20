/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ClientModel } from '../models/ClientModel';
import type { CreateClientModel } from '../models/CreateClientModel';
import type { CreateCustomerClientResult } from '../models/CreateCustomerClientResult';
import type { DynamicClientRegistrationRequest } from '../models/DynamicClientRegistrationRequest';
import type { PagedResultOfClientsQueryResult } from '../models/PagedResultOfClientsQueryResult';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ClientService {
    /**
     * Queries the clients for the current customer.
     * A client allows a customer to authenticate with the APIs without using their own credentials.
     * This is useful for creating service accounts or other automated processes,
     * as when using the Rapidata Python SDK.
     * @returns PagedResultOfClientsQueryResult OK
     * @throws ApiError
     */
    public static getClients({
        request,
    }: {
        request?: any,
    }): CancelablePromise<PagedResultOfClientsQueryResult> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/clients',
            query: {
                'request': request,
            },
        });
    }
    /**
     * Gets a specific client by its ID.
     * @returns ClientModel OK
     * @throws ApiError
     */
    public static getClient({
        clientId,
    }: {
        /**
         * The ID of the client to retrieve.
         */
        clientId: string,
    }): CancelablePromise<ClientModel> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/client/{clientId}',
            path: {
                'clientId': clientId,
            },
        });
    }
    /**
     * Deletes a customers' client.
     * @returns void
     * @throws ApiError
     */
    public static deleteClient({
        clientId,
    }: {
        /**
         * The id of the client to delete.
         */
        clientId: string,
    }): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/client/{clientId}',
            path: {
                'clientId': clientId,
            },
        });
    }
    /**
     * Creates a new client for the current customer.
     * @returns CreateCustomerClientResult OK
     * @throws ApiError
     */
    public static postClient({
        requestBody,
    }: {
        /**
         * The model for creating a new client.
         */
        requestBody: CreateClientModel,
    }): CancelablePromise<CreateCustomerClientResult> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/client',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Registers a new client dynamically.
     * The implementation of this method follows the OpenID Connect Dynamic Client Registration.
     * @returns ClientModel Created
     * @throws ApiError
     */
    public static postClientRegister({
        requestBody,
    }: {
        requestBody: DynamicClientRegistrationRequest,
    }): CancelablePromise<ClientModel> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/client/register',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
}

/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { QueryCustomersEndpoint_PagedResultOfOutput } from '../models/QueryCustomersEndpoint_PagedResultOfOutput';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class CustomerService {
    /**
     * Queries customers with filtering and pagination.
     * Results are scoped to customers that belong to the caller's organization.
     * @returns QueryCustomersEndpoint_PagedResultOfOutput OK
     * @throws ApiError
     */
    public static getCustomers({
        page,
        pageSize,
        sort,
        id,
        email,
        organizationName,
        organizationId,
    }: {
        /**
         * The 1-based page index.
         */
        page?: number,
        /**
         * The number of items per page.
         */
        pageSize?: number,
        /**
         * Sort fields. Prefix with - for descending order (e.g. -created_at).
         */
        sort?: Array<'email' | '-email' | 'organization_name' | '-organization_name'>,
        /**
         * Filter by id.
         */
        id?: {
            eq?: string;
            neq?: string;
            gt?: string;
            gte?: string;
            lt?: string;
            lte?: string;
            contains?: string;
            starts_with?: string;
            ends_with?: string;
            in?: string;
            not_contains?: string;
        },
        /**
         * Filter by email.
         */
        email?: {
            eq?: string;
            neq?: string;
            gt?: string;
            gte?: string;
            lt?: string;
            lte?: string;
            contains?: string;
            starts_with?: string;
            ends_with?: string;
            in?: string;
            not_contains?: string;
        },
        /**
         * Filter by organization_name.
         */
        organizationName?: {
            eq?: string;
            neq?: string;
            gt?: string;
            gte?: string;
            lt?: string;
            lte?: string;
            contains?: string;
            starts_with?: string;
            ends_with?: string;
            in?: string;
            not_contains?: string;
        },
        /**
         * Filter by organization_id.
         */
        organizationId?: {
            eq?: string;
            neq?: string;
            gt?: string;
            gte?: string;
            lt?: string;
            lte?: string;
            contains?: string;
            starts_with?: string;
            ends_with?: string;
            in?: string;
            not_contains?: string;
        },
    }): CancelablePromise<QueryCustomersEndpoint_PagedResultOfOutput> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/customers',
            query: {
                'page': page,
                'page_size': pageSize,
                'sort': sort,
                'id': id,
                'email': email,
                'organization_name': organizationName,
                'organization_id': organizationId,
            },
            errors: {
                400: `Bad Request`,
                401: `Unauthenticated`,
                403: `Forbidden`,
            },
        });
    }
}

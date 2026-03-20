/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CloneOrderEndpoint_Input } from '../models/CloneOrderEndpoint_Input';
import type { CloneOrderEndpoint_Output } from '../models/CloneOrderEndpoint_Output';
import type { CreateComplexOrderEndpoint_Input } from '../models/CreateComplexOrderEndpoint_Input';
import type { CreateComplexOrderEndpoint_Output } from '../models/CreateComplexOrderEndpoint_Output';
import type { CreateOrderEndpoint_Output } from '../models/CreateOrderEndpoint_Output';
import type { CreateOrderModel } from '../models/CreateOrderModel';
import type { CreateUnsupportedOrderEndpoint_Input } from '../models/CreateUnsupportedOrderEndpoint_Input';
import type { GetOrderByIdEndpoint_Output } from '../models/GetOrderByIdEndpoint_Output';
import type { GetPublicOrdersEndpoint_Output } from '../models/GetPublicOrdersEndpoint_Output';
import type { PreviewOrderEndpoint_Input } from '../models/PreviewOrderEndpoint_Input';
import type { QueryAggregatedOrdersEndpoint_PagedResultOfOutput } from '../models/QueryAggregatedOrdersEndpoint_PagedResultOfOutput';
import type { QueryOrdersEndpoint_PagedResultOfOutput } from '../models/QueryOrdersEndpoint_PagedResultOfOutput';
import type { SubmitOrderEndpoint_Input } from '../models/SubmitOrderEndpoint_Input';
import type { UnlockOrderEndpoint_Output } from '../models/UnlockOrderEndpoint_Output';
import type { UpdateOrderEndpoint_Input } from '../models/UpdateOrderEndpoint_Input';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class OrderService {
    /**
     * Approves a submitted order so the pipeline can start processing it.
     * @returns void
     * @throws ApiError
     */
    public static postOrderApprove({
        orderId,
    }: {
        /**
         * The ID of the order to approve.
         */
        orderId: string,
    }): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/order/{orderId}/approve',
            path: {
                'orderId': orderId,
            },
            errors: {
                400: `Bad Request`,
                401: `Unauthenticated`,
                403: `Forbidden`,
            },
        });
    }
    /**
     * Clones an existing public order.
     * The order to clone must be marked as public.
     * @returns CloneOrderEndpoint_Output OK
     * @throws ApiError
     */
    public static postOrderClone({
        orderId,
        requestBody,
    }: {
        /**
         * The ID of the order to clone.
         */
        orderId: string,
        /**
         * The clone order details.
         */
        requestBody: CloneOrderEndpoint_Input,
    }): CancelablePromise<CloneOrderEndpoint_Output> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/order/{orderId}/clone',
            path: {
                'orderId': orderId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
                401: `Unauthenticated`,
                403: `Forbidden`,
            },
        });
    }
    /**
     * Creates a new order with a custom pipeline configuration.
     * @returns CreateComplexOrderEndpoint_Output OK
     * @throws ApiError
     */
    public static postOrderComplex({
        requestBody,
    }: {
        /**
         * The complex order creation details.
         */
        requestBody: CreateComplexOrderEndpoint_Input,
    }): CancelablePromise<CreateComplexOrderEndpoint_Output> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/order/complex',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
                401: `Unauthenticated`,
                403: `Forbidden`,
            },
        });
    }
    /**
     * Creates a new order with the given configuration.
     * Once created, use the returned dataset ID to fill the dataset with datapoints,
     * then submit the order for processing.
     * @returns CreateOrderEndpoint_Output OK
     * @throws ApiError
     */
    public static postOrder({
        requestBody,
    }: {
        /**
         * The order creation configuration.
         */
        requestBody: CreateOrderModel,
    }): CancelablePromise<CreateOrderEndpoint_Output> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/order',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
                401: `Unauthenticated`,
                403: `Forbidden`,
            },
        });
    }
    /**
     * Creates a notification for an unsupported order type.
     * @returns void
     * @throws ApiError
     */
    public static postOrderUnsupported({
        requestBody,
    }: {
        /**
         * The unsupported order details.
         */
        requestBody: CreateUnsupportedOrderEndpoint_Input,
    }): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/order/unsupported',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
                401: `Unauthenticated`,
                403: `Forbidden`,
            },
        });
    }
    /**
     * Deletes an order and its associated resources.
     * @returns void
     * @throws ApiError
     */
    public static deleteOrder({
        orderId,
    }: {
        /**
         * The ID of the order to delete.
         */
        orderId: string,
    }): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/order/{orderId}',
            path: {
                'orderId': orderId,
            },
            errors: {
                400: `Bad Request`,
                401: `Unauthenticated`,
                403: `Forbidden`,
            },
        });
    }
    /**
     * Retrieves the details of a specific order.
     * @returns GetOrderByIdEndpoint_Output OK
     * @throws ApiError
     */
    public static getOrder({
        orderId,
    }: {
        /**
         * The ID of the order.
         */
        orderId: string,
    }): CancelablePromise<GetOrderByIdEndpoint_Output> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/order/{orderId}',
            path: {
                'orderId': orderId,
            },
            errors: {
                400: `Bad Request`,
                401: `Unauthenticated`,
                403: `Forbidden`,
            },
        });
    }
    /**
     * Updates the name or preceding order of an order.
     * @returns void
     * @throws ApiError
     */
    public static patchOrder({
        orderId,
        requestBody,
    }: {
        /**
         * The ID of the order to update.
         */
        orderId: string,
        /**
         * The properties to update.
         */
        requestBody: UpdateOrderEndpoint_Input,
    }): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/order/{orderId}',
            path: {
                'orderId': orderId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
                401: `Unauthenticated`,
                403: `Forbidden`,
            },
        });
    }
    /**
     * Aggregates the results of an order and returns them as a file attachment.
     * @returns binary OK
     * @throws ApiError
     */
    public static getOrderDownloadResults({
        orderId,
    }: {
        /**
         * The ID of the order.
         */
        orderId: string,
    }): CancelablePromise<Blob> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/order/{orderId}/download-results',
            path: {
                'orderId': orderId,
            },
            errors: {
                401: `Unauthenticated`,
                403: `Forbidden`,
            },
        });
    }
    /**
     * Aggregates the results of an order and returns them as a JSON string.
     * For file download, use the download-results endpoint instead.
     * @returns string OK
     * @throws ApiError
     */
    public static getOrderResults({
        orderId,
    }: {
        /**
         * The ID of the order.
         */
        orderId: string,
    }): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/order/{orderId}/results',
            path: {
                'orderId': orderId,
            },
            errors: {
                401: `Unauthenticated`,
                403: `Forbidden`,
            },
        });
    }
    /**
     * Retrieves all publicly available orders.
     * @returns GetPublicOrdersEndpoint_Output OK
     * @throws ApiError
     */
    public static getOrdersPublic(): CancelablePromise<GetPublicOrdersEndpoint_Output> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/orders/public',
            errors: {
                400: `Bad Request`,
                401: `Unauthenticated`,
                403: `Forbidden`,
            },
        });
    }
    /**
     * Marks or unmarks an order as a demo.
     * @returns void
     * @throws ApiError
     */
    public static patchOrderDemo({
        orderId,
        isDemo = true,
    }: {
        /**
         * The ID of the order.
         */
        orderId: string,
        /**
         * Whether to mark or unmark the order as a demo.
         */
        isDemo?: boolean,
    }): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/order/{orderId}/demo',
            path: {
                'orderId': orderId,
            },
            query: {
                'isDemo': isDemo,
            },
            errors: {
                400: `Bad Request`,
                401: `Unauthenticated`,
                403: `Forbidden`,
            },
        });
    }
    /**
     * Pauses an order, stopping all campaigns from processing.
     * @returns void
     * @throws ApiError
     */
    public static postOrderPause({
        orderId,
    }: {
        /**
         * The ID of the order to pause.
         */
        orderId: string,
    }): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/order/{orderId}/pause',
            path: {
                'orderId': orderId,
            },
            errors: {
                400: `Bad Request`,
                401: `Unauthenticated`,
                403: `Forbidden`,
            },
        });
    }
    /**
     * Starts preview mode for an order so labelers' experience can be inspected.
     * @returns void
     * @throws ApiError
     */
    public static postOrderPreview({
        orderId,
        requestBody,
    }: {
        /**
         * The ID of the order to preview.
         */
        orderId: string,
        /**
         * Optional preview configuration.
         */
        requestBody?: PreviewOrderEndpoint_Input,
    }): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/order/{orderId}/preview',
            path: {
                'orderId': orderId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
                401: `Unauthenticated`,
                403: `Forbidden`,
            },
        });
    }
    /**
     * Retrieves orders aggregated by customer with total amounts and most recent order information.
     * @returns QueryAggregatedOrdersEndpoint_PagedResultOfOutput OK
     * @throws ApiError
     */
    public static getOrdersAggregatedOverview({
        page,
        pageSize,
        sort,
        customerMail,
        lastOrderDate,
        lastOrderName,
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
        sort?: Array<'amount' | '-amount' | 'last7_days' | '-last7_days' | 'last_order_date' | '-last_order_date' | 'customer_mail' | '-customer_mail'>,
        /**
         * Filter by customer_mail.
         */
        customerMail?: {
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
         * Filter by last_order_date.
         */
        lastOrderDate?: {
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
         * Filter by last_order_name.
         */
        lastOrderName?: {
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
    }): CancelablePromise<QueryAggregatedOrdersEndpoint_PagedResultOfOutput> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/orders/aggregated-overview',
            query: {
                'page': page,
                'page_size': pageSize,
                'sort': sort,
                'customer_mail': customerMail,
                'last_order_date': lastOrderDate,
                'last_order_name': lastOrderName,
            },
            errors: {
                400: `Bad Request`,
                401: `Unauthenticated`,
                403: `Forbidden`,
            },
        });
    }
    /**
     * @returns QueryOrdersEndpoint_PagedResultOfOutput OK
     * @throws ApiError
     */
    public static getOrders({
        page,
        pageSize,
        sort,
        orderName,
        state,
        orderDate,
        customerMail,
        isPublic,
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
        sort?: Array<'order_name' | '-order_name' | 'order_date' | '-order_date' | 'state' | '-state'>,
        /**
         * Filter by order_name.
         */
        orderName?: {
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
         * Filter by state.
         */
        state?: {
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
         * Filter by order_date.
         */
        orderDate?: {
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
         * Filter by customer_mail.
         */
        customerMail?: {
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
         * Filter by is_public.
         */
        isPublic?: {
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
    }): CancelablePromise<QueryOrdersEndpoint_PagedResultOfOutput> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/orders',
            query: {
                'page': page,
                'page_size': pageSize,
                'sort': sort,
                'order_name': orderName,
                'state': state,
                'order_date': orderDate,
                'customer_mail': customerMail,
                'is_public': isPublic,
            },
            errors: {
                400: `Bad Request`,
                401: `Unauthenticated`,
                403: `Forbidden`,
            },
        });
    }
    /**
     * Resumes a paused order, restarting all campaigns.
     * @returns void
     * @throws ApiError
     */
    public static postOrderResume({
        orderId,
    }: {
        /**
         * The ID of the order to resume.
         */
        orderId: string,
    }): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/order/{orderId}/resume',
            path: {
                'orderId': orderId,
            },
            errors: {
                400: `Bad Request`,
                401: `Unauthenticated`,
                403: `Forbidden`,
            },
        });
    }
    /**
     * Retries processing of a failed order.
     * @returns void
     * @throws ApiError
     */
    public static postOrderRetry({
        orderId,
    }: {
        /**
         * The ID of the order to retry.
         */
        orderId: string,
    }): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/order/{orderId}/retry',
            path: {
                'orderId': orderId,
            },
            errors: {
                400: `Bad Request`,
                401: `Unauthenticated`,
                403: `Forbidden`,
            },
        });
    }
    /**
     * Marks or unmarks an order as public.
     * @returns void
     * @throws ApiError
     */
    public static patchOrderShare({
        orderId,
        isPublic = true,
    }: {
        /**
         * The ID of the order.
         */
        orderId: string,
        /**
         * Whether to mark or unmark the order as public.
         */
        isPublic?: boolean,
    }): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/order/{orderId}/share',
            path: {
                'orderId': orderId,
            },
            query: {
                'isPublic': isPublic,
            },
            errors: {
                400: `Bad Request`,
                401: `Unauthenticated`,
                403: `Forbidden`,
            },
        });
    }
    /**
     * Submits an order for processing.
     * Once submitted, the order will be locked and no further changes can be made.
     * @returns void
     * @throws ApiError
     */
    public static postOrderSubmit({
        orderId,
        requestBody,
    }: {
        /**
         * The ID of the order to submit.
         */
        orderId: string,
        /**
         * Optional submission configuration.
         */
        requestBody?: SubmitOrderEndpoint_Input,
    }): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/order/{orderId}/submit',
            path: {
                'orderId': orderId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
                401: `Unauthenticated`,
                403: `Forbidden`,
            },
        });
    }
    /**
     * Unlocks a cloned order so it can be modified.
     * Unlocking clones the entire dataset and its datapoints.
     * @returns UnlockOrderEndpoint_Output OK
     * @throws ApiError
     */
    public static postOrderUnlock({
        orderId,
    }: {
        /**
         * The ID of the order to unlock.
         */
        orderId: string,
    }): CancelablePromise<UnlockOrderEndpoint_Output> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/order/{orderId}/unlock',
            path: {
                'orderId': orderId,
            },
            errors: {
                400: `Bad Request`,
                401: `Unauthenticated`,
                403: `Forbidden`,
            },
        });
    }
}

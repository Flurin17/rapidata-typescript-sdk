/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { JsonWebKeySet } from './JsonWebKeySet';
/**
 * The response containing the id and secret of a dynamically registered client.
 * Additionally, it contains all registered metadata for the client.
 */
export type ClientModel = {
    client_id: string;
    client_secret: string | null;
    client_id_issued_at: number;
    client_secret_expires_at: number;
    redirect_uris: Array<Array<string>> | null;
    grant_types: Array<Array<string>> | null;
    response_types: Array<Array<string>> | null;
    client_name: string | null;
    client_uri: string | null;
    logo_uri: string | null;
    /**
     * String containing a space-separated list of scope values
     * that the client can use when requesting access tokens.
     */
    scope: string | null;
    /**
     * Array of strings representing ways to contact people responsible for this client,
     * typically email addresses.
     */
    contacts: Array<string> | null;
    tos_uri: string | null;
    policy_uri: string | null;
    jwks_uri: string | null;
    jwks: JsonWebKeySet;
};


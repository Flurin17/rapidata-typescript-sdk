/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { JsonWebKeySet } from './JsonWebKeySet';
/**
 * The request body for dynamic client registration.
 */
export type DynamicClientRegistrationRequest = {
    redirect_uris?: Array<string> | null;
    grant_types?: Array<string> | null;
    response_types?: Array<string> | null;
    client_id?: string | null;
    client_name?: string | null;
    client_uri?: string | null;
    logo_uri?: string | null;
    /**
     * String containing a space-separated list of scope values
     * that the client can use when requesting access tokens.
     */
    scope?: string | null;
    /**
     * Array of strings representing ways to contact people responsible for this client,
     * typically email addresses.
     */
    contacts?: Array<string> | null;
    tos_uri?: string | null;
    policy_uri?: string | null;
    jwks_uri?: string | null;
    /**
     * Client's JSON Web Key Set [RFC7517] document value, which contains the client's public keys.
     */
    jwks?: JsonWebKeySet;
};


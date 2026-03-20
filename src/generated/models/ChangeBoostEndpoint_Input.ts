/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type ChangeBoostEndpoint_Input = {
    /**
     * Whether the manual overwrite should be applied.
     */
    isManual: boolean;
    /**
     * Whether the boost is active. Deprecated in favor of Level.
     */
    isActive?: boolean;
    /**
     * The boost level. Takes precedence over IsActive when set.
     */
    level?: number;
};


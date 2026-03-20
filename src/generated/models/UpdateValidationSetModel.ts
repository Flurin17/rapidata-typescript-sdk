/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Allows for specific updates to a validation set without needing to provide all properties.
 */
export type UpdateValidationSetModel = {
    /**
     * The name of the validation set
     */
    name?: string | null;
    /**
     * The dimensions of the validation set
     */
    dimensions?: Array<string>;
    /**
     * If the user should be alerted or not
     */
    shouldAlert?: boolean | null;
    /**
     * If the validation set is public
     */
    isPublic?: boolean | null;
    /**
     * If the flag on validation rapids should be overruled
     */
    isFlagOverruled?: boolean | null;
};


/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * The model for submitting feedback.
 */
export type FeedbackModel = {
    /**
     * The feedback
     */
    feedback: string;
    /**
     * The email of the user submitting the feedback
     */
    email?: string | null;
    /**
     * The recaptcha token of the user submitting the feedback
     */
    token?: string | null;
};


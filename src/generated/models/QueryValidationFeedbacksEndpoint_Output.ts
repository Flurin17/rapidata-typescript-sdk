/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type QueryValidationFeedbacksEndpoint_Output = {
    /**
     * The unique identifier of the feedback.
     */
    id: string;
    /**
     * The ID of the user who submitted the feedback.
     */
    userId: string;
    /**
     * The session ID of the user who submitted the feedback.
     */
    sessionId: string;
    /**
     * The feedback text.
     */
    feedback: string;
    /**
     * The timestamp when the feedback was created.
     */
    createdAt: string;
};


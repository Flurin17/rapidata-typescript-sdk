/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Model for subscribing and unsubscribing to the newsletter.
 */
export type NewsletterModel = {
    /**
     * The email of the user to subscribe or unsubscribe.
     */
    email: string;
    /**
     * The recaptcha token to verify the user is not a bot.
     */
    token: string;
};


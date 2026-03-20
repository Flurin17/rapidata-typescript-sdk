/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { IValidationTruth } from './IValidationTruth';
import type { TranslatedString } from './TranslatedString';
export type AddUserResponseResult = {
    isAccepted: boolean;
    validationTruth?: IValidationTruth;
    explanation?: TranslatedString;
    userScore: number;
};


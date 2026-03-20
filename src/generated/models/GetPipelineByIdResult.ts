/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { FeatureFlag } from './FeatureFlag';
import type { IArtifactModel } from './IArtifactModel';
export type GetPipelineByIdResult = {
    artifacts: Record<string, IArtifactModel>;
    featureFlags: Array<FeatureFlag>;
};


import { describe, expect, it } from "vitest";

import * as sdk from "../src/index";

describe("public export surface", () => {
  it("keeps the parity symbols exported at the package root", () => {
    const expectedExports = [
      "RapidataClient",
      "RapidataApiClient",
      "RapidataAudience",
      "RapidataAudienceManager",
      "RapidataOrderManager",
      "RapidataOrder",
      "RapidataJob",
      "RapidataJobDefinition",
      "RapidataJobManager",
      "ValidationSetManager",
      "RapidataValidationSet",
      "Box",
      "RapidataResults",
      "DemographicSelection",
      "LabelingSelection",
      "EffortSelection",
      "RapidataRetrievalMode",
      "ValidationSelection",
      "ConditionalValidationSelection",
      "CappedSelection",
      "ShufflingSelection",
      "RapidataSettings",
      "TranslationBehaviourOptions",
      "AlertOnFastResponseSetting",
      "AlertOnFastResponse",
      "TranslationBehaviourSetting",
      "TranslationBehaviour",
      "FreeTextMinimumCharactersSetting",
      "FreeTextMinimumCharacters",
      "NoShuffleSetting",
      "NoShuffle",
      "PlayVideoUntilTheEndSetting",
      "PlayVideoUntilTheEnd",
      "MuteVideoSetting",
      "MuteVideo",
      "MarkdownSetting",
      "Markdown",
      "CustomSetting",
      "AllowNeitherBothSetting",
      "AllowNeitherBoth",
      "SwapContextInstructionSetting",
      "SwapContextInstruction",
      "CountryFilter",
      "LanguageFilter",
      "NotFilter",
      "OrFilter",
      "AndFilter",
      "UserScoreFilter",
      "CampaignFilter",
      "AgeFilter",
      "GenderFilter",
      "CustomFilter",
      "AgeGroup",
      "Gender",
      "DeviceFilter",
      "DeviceType",
      "Datapoint",
      "FailedUploadException",
      "FailedUpload",
      "rapidataConfig",
      "logger",
      "managedPrint",
      "types",
    ];

    for (const exportName of expectedExports) {
      expect(sdk).toHaveProperty(exportName);
    }

    expect(sdk.types).toHaveProperty("OrderService");
    expect(sdk.types).toHaveProperty("OpenAPI");
  });
});

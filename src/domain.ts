import { writeFile } from "node:fs/promises";
import path from "node:path";
import type {
  FeatureFlag,
  FeatureFlagModel,
  IAudienceFilter,
  IAssetInput,
  IOrderWorkflowModel,
  IRapidPayload,
  IRefereeModel,
  ISelection,
  IUserFilterModel,
  IValidationTruthModel,
} from "./generated";
import { logger } from "./config";

export type DataType = "text" | "media";
export type JsonObject = Record<string, unknown>;

const IMAGE_EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp", ".gif", ".bmp", ".tif", ".tiff", ".avif"];
const VIDEO_EXTENSIONS = [".mp4", ".mov", ".avi", ".mkv", ".webm", ".m4v"];
const AUDIO_EXTENSIONS = [".mp3", ".wav", ".aac", ".m4a", ".ogg", ".flac"];

function extensionForAsset(asset: string) {
  try {
    const url = new URL(asset);
    return path.extname(url.pathname).toLowerCase();
  } catch {
    return path.extname(asset).toLowerCase();
  }
}

function assertCondition(condition: unknown, message: string): asserts condition {
  if (!condition) {
    throw new Error(message);
  }
}

export enum AgeGroup {
  Age0To17 = "0-17",
  Age18To29 = "18-29",
  Age30To39 = "30-39",
  Age40To49 = "40-49",
  Age50To64 = "50-64",
  Age65Plus = "65+",
}

export enum Gender {
  Male = "Male",
  Female = "Female",
  Other = "Other",
}

export enum DeviceType {
  Unknown = "Unknown",
  Phone = "Phone",
  Tablet = "Tablet",
}

export enum TranslationBehaviourOptions {
  BOTH = "both",
  ONLY_ORIGINAL = "only original",
  ONLY_TRANSLATED = "only translated",
}

export enum RapidataRetrievalMode {
  Shuffled = "Shuffled",
  Sequential = "Sequential",
  Random = "Random",
}

export class Datapoint {
  readonly asset: string | string[];

  readonly dataType: DataType;

  readonly context?: string;

  readonly mediaContext?: string;

  readonly sentence?: string;

  readonly privateMetadata?: Record<string, string>;

  readonly group?: string;

  constructor(options: {
    asset: string | string[];
    dataType: DataType;
    context?: string;
    mediaContext?: string;
    sentence?: string;
    privateMetadata?: Record<string, string>;
    group?: string;
  }) {
    if (options.context === "") {
      throw new Error("context cannot be an empty string. If not needed, set it to undefined.");
    }

    if (options.mediaContext === "") {
      throw new Error("mediaContext cannot be an empty string. If not needed, set it to undefined.");
    }

    if (options.sentence && options.sentence.trim().split(/\s+/).length <= 1) {
      throw new Error("sentence must contain at least two words.");
    }

    if (options.sentence && options.context) {
      throw new Error("Both sentence and context cannot be provided at the same time.");
    }

    this.asset = options.asset;
    this.dataType = options.dataType;
    this.context = options.context;
    this.mediaContext = options.mediaContext;
    this.sentence = options.sentence;
    this.privateMetadata = options.privateMetadata;
    this.group = options.group;
  }

  getAssetType() {
    if (this.dataType === "text") {
      return "Text";
    }

    const sample = Array.isArray(this.asset) ? this.asset[0] : this.asset;
    if (!sample) {
      return "None";
    }
    const extension = extensionForAsset(sample);
    if (IMAGE_EXTENSIONS.includes(extension)) {
      return "Image";
    }

    if (VIDEO_EXTENSIONS.includes(extension)) {
      return "Video";
    }

    if (AUDIO_EXTENSIONS.includes(extension)) {
      return "Audio";
    }

    logger.debug("Could not infer asset type for %s", sample);
    return "None";
  }

  getPromptTypes() {
    const promptTypes: string[] = [];
    if (this.context) {
      promptTypes.push("Text");
    }

    if (this.mediaContext) {
      promptTypes.push("Asset");
    }

    return promptTypes.length > 0 ? promptTypes : ["None"];
  }
}

export class Box {
  readonly xMin: number;

  readonly yMin: number;

  readonly xMax: number;

  readonly yMax: number;

  constructor(xMin: number, yMin: number, xMax: number, yMax: number) {
    for (const coordinate of [xMin, yMin, xMax, yMax]) {
      if (coordinate < 0 || coordinate > 1) {
        throw new Error("Box coordinates must be between 0 and 1.");
      }
    }

    if (xMin >= xMax) {
      throw new Error("xMin must be less than xMax.");
    }

    if (yMin >= yMax) {
      throw new Error("yMin must be less than yMax.");
    }

    this.xMin = xMin;
    this.yMin = yMin;
    this.xMax = xMax;
    this.yMax = yMax;
  }

  toModel() {
    return {
      xMin: this.xMin * 100,
      yMin: this.yMin * 100,
      xMax: this.xMax * 100,
      yMax: this.yMax * 100,
    };
  }
}

export class RapidataResults {
  constructor(readonly data: Record<string, unknown>) {}

  toPandas(splitDetails = false): Array<Record<string, unknown>> {
    const results = Array.isArray(this.data.results) ? this.data.results : [];
    if (!splitDetails) {
      return results.map((item) => this.flatten(item as Record<string, unknown>));
    }

    return results.flatMap((item) => {
      const result = item as Record<string, unknown>;
      const detailedResults = Array.isArray(result.detailedResults)
        ? result.detailedResults as Array<Record<string, unknown>>
        : [];
      const base = Object.fromEntries(
        Object.entries(result).filter(([key]) => key !== "detailedResults"),
      );
      return detailedResults.map((detail) => ({
        ...this.flatten(base),
        ...this.flatten(detail),
      }));
    });
  }

  async toJson(filePath = "./results.json") {
    await writeFile(filePath, `${JSON.stringify(this.data, null, 2)}\n`);
  }

  private flatten(input: Record<string, unknown>, prefix = ""): Record<string, unknown> {
    return Object.entries(input).reduce<Record<string, unknown>>((accumulator, [key, value]) => {
      const nestedKey = prefix ? `${prefix}_${key}` : key;
      if (value && typeof value === "object" && !Array.isArray(value)) {
        Object.assign(accumulator, this.flatten(value as Record<string, unknown>, nestedKey));
      } else {
        accumulator[nestedKey] = value;
      }
      return accumulator;
    }, {});
  }
}

export abstract class RapidataSetting {
  constructor(
    readonly key: string,
    readonly value: unknown,
  ) {}

  toFeatureFlag(): FeatureFlag {
    return {
      key: this.key,
      value: String(this.value),
    };
  }

  toFeatureFlagModel(): FeatureFlagModel {
    return {
      key: this.key,
      value: String(this.value),
    };
  }
}

export class AlertOnFastResponseSetting extends RapidataSetting {
  constructor(threshold: number) {
    if (!Number.isInteger(threshold)) {
      throw new Error("The alert threshold must be an integer.");
    }

    if (threshold > 25_000 || threshold < 0) {
      throw new Error("The alert threshold must be between 0 and 25000 milliseconds.");
    }

    super("alert_on_fast_response", threshold);
  }
}

export class AlertOnFastResponse extends AlertOnFastResponseSetting {}

export class TranslationBehaviourSetting extends RapidataSetting {
  constructor(value: TranslationBehaviourOptions) {
    super("translation_behaviour", value);
  }
}

export class TranslationBehaviour extends TranslationBehaviourSetting {}

export class FreeTextMinimumCharactersSetting extends RapidataSetting {
  constructor(value: number) {
    if (!Number.isInteger(value) || value < 1) {
      throw new Error("The minimum number of characters must be an integer greater than or equal to 1.");
    }

    super("free_text_minimum_characters", value);
  }
}

export class FreeTextMinimumCharacters extends FreeTextMinimumCharactersSetting {}

export class NoShuffleSetting extends RapidataSetting {
  constructor(value = true) {
    super("no_shuffle", value);
  }
}

export class NoShuffle extends NoShuffleSetting {}

export class PlayVideoUntilTheEndSetting extends RapidataSetting {
  constructor(additionalTime = 0) {
    if (additionalTime < -25_000 || additionalTime > 25_000) {
      throw new Error("The additional time must be between -25000 and 25000.");
    }

    super("alert_on_fast_response_add_media_duration", additionalTime);
  }
}

export class PlayVideoUntilTheEnd extends PlayVideoUntilTheEndSetting {}

export class MuteVideoSetting extends RapidataSetting {
  constructor(value = true) {
    super("mute_video_asset", value);
  }
}

export class MuteVideo extends MuteVideoSetting {}

export class MarkdownSetting extends RapidataSetting {
  constructor(value = true) {
    super("use_text_asset_markdown", value);
  }
}

export class Markdown extends MarkdownSetting {}

export class AllowNeitherBothSetting extends RapidataSetting {
  constructor(value = true) {
    super("compare_unsure", value);
  }
}

export class AllowNeitherBoth extends AllowNeitherBothSetting {}

export class SwapContextInstructionSetting extends RapidataSetting {
  constructor(value = true) {
    super("swap_question_and_prompt", value);
  }
}

export class SwapContextInstruction extends SwapContextInstructionSetting {}

export class CustomSetting extends RapidataSetting {
  constructor(key: string, value: string) {
    super(key, value);
  }
}

export class RapidataSettings {
  static readonly AlertOnFastResponse = AlertOnFastResponseSetting;
  static readonly TranslationBehaviour = TranslationBehaviourSetting;
  static readonly FreeTextMinimumCharacters = FreeTextMinimumCharactersSetting;
  static readonly NoShuffle = NoShuffleSetting;
  static readonly PlayVideoUntilTheEnd = PlayVideoUntilTheEndSetting;
  static readonly AllowNeitherBoth = AllowNeitherBothSetting;
  static readonly SwapContextInstruction = SwapContextInstructionSetting;
  static readonly MuteVideo = MuteVideoSetting;
  static readonly Markdown = MarkdownSetting;
}

export abstract class RapidataFilter {
  abstract toModel(): IUserFilterModel;

  toAudienceModel(): IAudienceFilter {
    throw new Error("This filter is not supported for audiences.");
  }

  and(other: RapidataFilter) {
    return new AndFilter([this, other]);
  }

  or(other: RapidataFilter) {
    return new OrFilter([this, other]);
  }

  not() {
    return new NotFilter(this);
  }
}

export class CountryFilter extends RapidataFilter {
  readonly countryCodes: string[];

  constructor(countryCodes: string[]) {
    super();
    this.countryCodes = countryCodes.map((code) => {
      if (code.length !== 2) {
        throw new Error(`Country codes must be length 2. Invalid code: "${code}".`);
      }

      return code.toUpperCase();
    });
  }

  toModel(): IUserFilterModel {
    return { _t: "CountryFilter", countries: this.countryCodes } as IUserFilterModel;
  }

  toAudienceModel(): IAudienceFilter {
    return { _t: "CountryFilter", countries: this.countryCodes } as IAudienceFilter;
  }
}

export class LanguageFilter extends RapidataFilter {
  readonly languageCodes: string[];

  constructor(languageCodes: string[]) {
    super();
    this.languageCodes = languageCodes.map((code) => {
      if (code.length !== 2) {
        throw new Error(`Language codes must be length 2. Invalid code: "${code}".`);
      }

      return code.toLowerCase();
    });
  }

  toModel(): IUserFilterModel {
    return { _t: "LanguageFilter", languages: this.languageCodes } as IUserFilterModel;
  }

  toAudienceModel(): IAudienceFilter {
    return { _t: "LanguageFilter", languages: this.languageCodes } as IAudienceFilter;
  }
}

export class AgeFilter extends RapidataFilter {
  constructor(readonly ageGroups: AgeGroup[]) {
    super();
  }

  toModel(): IUserFilterModel {
    return {
      _t: "AgeFilter",
      ageGroups: this.ageGroups,
    } as IUserFilterModel;
  }
}

export class GenderFilter extends RapidataFilter {
  constructor(readonly genders: Gender[]) {
    super();
  }

  toModel(): IUserFilterModel {
    return {
      _t: "GenderFilter",
      genders: this.genders,
    } as IUserFilterModel;
  }
}

export class DeviceFilter extends RapidataFilter {
  constructor(readonly deviceTypes: DeviceType[]) {
    super();
  }

  toModel(): IUserFilterModel {
    return {
      _t: "DeviceFilter",
      deviceTypes: this.deviceTypes,
    } as IUserFilterModel;
  }
}

export class UserScoreFilter extends RapidataFilter {
  constructor(
    readonly lowerBound = 0,
    readonly upperBound = 1,
    readonly dimension?: string,
  ) {
    super();
    if (lowerBound < 0 || lowerBound > 1 || upperBound < 0 || upperBound > 1) {
      throw new Error("Bounds must be between 0 and 1.");
    }

    if (lowerBound >= upperBound) {
      throw new Error("lowerBound must be less than upperBound.");
    }
  }

  toModel(): IUserFilterModel {
    return {
      _t: "UserScoreFilter",
      lowerbound: this.lowerBound,
      upperbound: this.upperBound,
      dimension: this.dimension,
    } as IUserFilterModel;
  }
}

export class CampaignFilter extends RapidataFilter {
  constructor(readonly campaignIds: string[]) {
    super();
  }

  toModel(): IUserFilterModel {
    return {
      _t: "CampaignFilter",
      campaignIds: this.campaignIds,
    } as IUserFilterModel;
  }
}

export class CustomFilter extends RapidataFilter {
  constructor(
    readonly identifier: string,
    readonly values: string[],
  ) {
    super();
  }

  toModel(): IUserFilterModel {
    return {
      _t: "CustomFilter",
      identifier: this.identifier,
      values: this.values,
    } as IUserFilterModel;
  }
}

export class NotFilter extends RapidataFilter {
  constructor(readonly filter: RapidataFilter) {
    super();
  }

  toModel(): IUserFilterModel {
    return {
      _t: "NotFilter",
      filter: this.filter.toModel(),
    } as IUserFilterModel;
  }

  toAudienceModel(): IAudienceFilter {
    return {
      _t: "NotFilter",
      filter: this.filter.toAudienceModel(),
    } as IAudienceFilter;
  }
}

export class AndFilter extends RapidataFilter {
  constructor(readonly filters: RapidataFilter[]) {
    super();
  }

  toModel(): IUserFilterModel {
    return {
      _t: "AndFilter",
      filters: this.filters.map((filter) => filter.toModel()),
    } as IUserFilterModel;
  }

  toAudienceModel(): IAudienceFilter {
    return {
      _t: "AndFilter",
      filters: this.filters.map((filter) => filter.toAudienceModel()),
    } as IAudienceFilter;
  }
}

export class OrFilter extends RapidataFilter {
  constructor(readonly filters: RapidataFilter[]) {
    super();
  }

  toModel(): IUserFilterModel {
    return {
      _t: "OrFilter",
      filters: this.filters.map((filter) => filter.toModel()),
    } as IUserFilterModel;
  }

  toAudienceModel(): IAudienceFilter {
    return {
      _t: "OrFilter",
      filters: this.filters.map((filter) => filter.toAudienceModel()),
    } as IAudienceFilter;
  }
}

export class RapidataFilters {
  static readonly Country = CountryFilter;
  static readonly Language = LanguageFilter;
  static readonly UserScore = UserScoreFilter;
  static readonly Campaign = CampaignFilter;
  static readonly Age = AgeFilter;
  static readonly Gender = GenderFilter;
  static readonly Custom = CustomFilter;
  static readonly Device = DeviceFilter;
  static readonly Not = NotFilter;
  static readonly Or = OrFilter;
  static readonly And = AndFilter;
}

export abstract class RapidataSelection {
  abstract toModel(): ISelection;
}

export class LabelingSelection extends RapidataSelection {
  constructor(
    readonly amount: number,
    readonly retrievalMode: RapidataRetrievalMode = RapidataRetrievalMode.Shuffled,
    readonly maxIterations?: number,
  ) {
    super();
  }

  toModel(): ISelection {
    return {
      _t: "LabelingSelection",
      amount: this.amount,
      retrievalMode: this.retrievalMode,
      maxIterations: this.maxIterations,
    } as ISelection;
  }
}

export class ValidationSelection extends RapidataSelection {
  constructor(
    readonly validationSetId: string,
    readonly amount = 1,
  ) {
    super();
  }

  toModel(): ISelection {
    return {
      _t: "ValidationSelection",
      validationSetId: this.validationSetId,
      amount: this.amount,
    } as ISelection;
  }
}

export class ConditionalValidationSelection extends RapidataSelection {
  constructor(
    readonly validationSetId: string,
    readonly thresholds: number[],
    readonly chances: number[],
    readonly rapidCounts: number[],
    readonly dimensions?: string[],
  ) {
    super();
    assertCondition(
      thresholds.length === chances.length && thresholds.length === rapidCounts.length,
      "thresholds, chances and rapidCounts must have equal length.",
    );
  }

  toModel(): ISelection {
    return {
      _t: "ConditionalValidationSelection",
      validationSetId: this.validationSetId,
      validationChances: this.thresholds.map((threshold, index) => ({
        userScoreThreshold: threshold,
        chance: this.chances[index],
        rapidCount: this.rapidCounts[index],
      })),
      dimensions: this.dimensions,
    } as ISelection;
  }
}

export class DemographicSelection extends RapidataSelection {
  constructor(
    readonly keys: string[],
    readonly maxRapids: number,
  ) {
    super();
  }

  toModel(): ISelection {
    return {
      _t: "DemographicSelection",
      keys: this.keys,
      maxRapids: this.maxRapids,
    } as ISelection;
  }
}

export class CappedSelection extends RapidataSelection {
  constructor(
    readonly selections: RapidataSelection[],
    readonly maxRapids: number,
  ) {
    super();
  }

  toModel(): ISelection {
    return {
      _t: "CappedSelection",
      selections: this.selections.map((selection) => selection.toModel()),
      maxRapids: this.maxRapids,
    } as ISelection;
  }
}

export class ShufflingSelection extends RapidataSelection {
  constructor(readonly selections: RapidataSelection[]) {
    super();
  }

  toModel(): ISelection {
    return {
      _t: "ShufflingSelection",
      selections: this.selections.map((selection) => selection.toModel()),
    } as ISelection;
  }
}

export class EffortSelection extends RapidataSelection {
  constructor(
    readonly effortBudget: number,
    readonly retrievalMode: RapidataRetrievalMode = RapidataRetrievalMode.Shuffled,
    readonly maxIterations?: number,
  ) {
    super();
  }

  toModel(): ISelection {
    return {
      _t: "EffortCappedSelection",
      effortBudget: this.effortBudget,
      retrievalMode: this.retrievalMode,
      maxIterations: this.maxIterations,
    } as ISelection;
  }
}

export class StaticSelection extends RapidataSelection {
  constructor(readonly rapidIds: string[]) {
    super();
  }

  toModel(): ISelection {
    return {
      _t: "StaticSelection",
      rapidIds: this.rapidIds,
    } as ISelection;
  }
}

export class AbTestSelection extends RapidataSelection {
  constructor(
    readonly aSelections: RapidataSelection[],
    readonly bSelections: RapidataSelection[],
  ) {
    super();
  }

  toModel(): ISelection {
    return {
      _t: "AbTestSelection",
      a: this.aSelections.map((selection) => selection.toModel()),
      b: this.bSelections.map((selection) => selection.toModel()),
    } as ISelection;
  }
}

export class RapidataSelections {
  static readonly Labeling = LabelingSelection;
  static readonly Validation = ValidationSelection;
  static readonly ConditionalValidation = ConditionalValidationSelection;
  static readonly Demographic = DemographicSelection;
  static readonly Capped = CappedSelection;
  static readonly Shuffling = ShufflingSelection;
}

abstract class Referee {
  abstract toModel(): IRefereeModel;
}

export class NaiveReferee extends Referee {
  constructor(readonly responses = 10) {
    super();
    if (responses < 1) {
      throw new Error("responses must be greater than 0.");
    }
  }

  toModel(): IRefereeModel {
    return {
      _t: "NaiveReferee",
      totalVotes: this.responses,
    } as IRefereeModel;
  }
}

export class EarlyStoppingReferee extends Referee {
  constructor(
    readonly threshold = 0.999,
    readonly maxResponses = 100,
  ) {
    super();
    if (threshold <= 0 || threshold >= 1) {
      throw new Error("threshold must be between 0 and 1.");
    }

    if (maxResponses < 1) {
      throw new Error("maxResponses must be greater than 0.");
    }
  }

  toModel(): IRefereeModel {
    return {
      _t: "EarlyStoppingReferee",
      threshold: this.threshold,
      maxVotes: this.maxResponses,
    } as IRefereeModel;
  }
}

export class QuorumReferee extends Referee {
  constructor(
    readonly threshold = 3,
    readonly maxVotes = 5,
  ) {
    super();
    if (threshold < 1 || maxVotes < 1 || threshold > maxVotes) {
      throw new Error("threshold must be >= 1, maxVotes must be >= 1, and threshold cannot exceed maxVotes.");
    }
  }

  toModel(): IRefereeModel {
    return {
      _t: "QuorumReferee",
      threshold: this.threshold,
      maxVotes: this.maxVotes,
    } as IRefereeModel;
  }
}

export abstract class Workflow {
  constructor(readonly type: string) {}

  abstract toModel(): IOrderWorkflowModel;

  abstract toPayload(datapoint: Datapoint): IRapidPayload;

  abstract getInstruction(): string;
}

export class ClassifyWorkflow extends Workflow {
  constructor(
    readonly instruction: string,
    readonly answerOptions: string[],
  ) {
    super("SimpleWorkflowConfig");
  }

  toModel(): IOrderWorkflowModel {
    return {
      _t: "SimpleWorkflow",
      blueprint: {
        _t: "ClassifyBlueprint",
        title: this.instruction,
        categories: this.answerOptions.map((option) => ({
          label: option,
          value: option,
        })),
      },
    } as IOrderWorkflowModel;
  }

  toPayload(): IRapidPayload {
    return {
      _t: "ClassifyPayload",
      title: this.instruction,
      categories: this.answerOptions.map((option) => ({
        label: option,
        value: option,
      })),
    } as IRapidPayload;
  }

  getInstruction() {
    return this.instruction;
  }
}

export class CompareWorkflow extends Workflow {
  constructor(
    readonly instruction: string,
    readonly abNames?: string[],
  ) {
    super("CompareWorkflowConfig");
  }

  toModel(): IOrderWorkflowModel {
    return {
      _t: "SimpleWorkflow",
      blueprint: {
        _t: "CompareBlueprint",
        criteria: this.instruction,
        indexIdentifiers: this.abNames,
      },
    } as IOrderWorkflowModel;
  }

  toPayload(): IRapidPayload {
    return {
      _t: "ComparePayload",
      criteria: this.instruction,
    } as IRapidPayload;
  }

  getInstruction() {
    return this.instruction;
  }
}

export class FreeTextWorkflow extends Workflow {
  constructor(
    readonly instruction: string,
    readonly validationSystemPrompt?: string,
  ) {
    super("SimpleWorkflowConfig");
  }

  toModel(): IOrderWorkflowModel {
    return {
      _t: "SimpleWorkflow",
      blueprint: {
        _t: "FreeTextBlueprint",
        question: this.instruction,
        validationSystemPrompt: this.validationSystemPrompt,
      },
    } as IOrderWorkflowModel;
  }

  toPayload(): IRapidPayload {
    return {
      _t: "FreeTextPayload",
      question: this.instruction,
    } as IRapidPayload;
  }

  getInstruction() {
    return this.instruction;
  }
}

export class SelectWordsWorkflow extends Workflow {
  constructor(readonly instruction: string) {
    super("SimpleWorkflowConfig");
  }

  toModel(): IOrderWorkflowModel {
    return {
      _t: "SimpleWorkflow",
      blueprint: {
        _t: "TranscriptionBlueprint",
        title: this.instruction,
      },
    } as IOrderWorkflowModel;
  }

  toPayload(datapoint: Datapoint): IRapidPayload {
    assertCondition(datapoint.sentence, "SelectWordsWorkflow requires a sentence.");
    return {
      _t: "TranscriptionPayload",
      title: this.instruction,
      transcription: datapoint.sentence.split(/\s+/).map((word, index) => ({
        word,
        wordIndex: index,
      })),
    } as IRapidPayload;
  }

  getInstruction() {
    return this.instruction;
  }
}

export class LocateWorkflow extends Workflow {
  constructor(readonly instruction: string) {
    super("SimpleWorkflowConfig");
  }

  toModel(): IOrderWorkflowModel {
    return {
      _t: "SimpleWorkflow",
      blueprint: {
        _t: "LocateBlueprint",
        target: this.instruction,
      },
    } as IOrderWorkflowModel;
  }

  toPayload(): IRapidPayload {
    return {
      _t: "LocatePayload",
      target: this.instruction,
    } as IRapidPayload;
  }

  getInstruction() {
    return this.instruction;
  }
}

export class DrawWorkflow extends Workflow {
  constructor(readonly instruction: string) {
    super("SimpleWorkflowConfig");
  }

  toModel(): IOrderWorkflowModel {
    return {
      _t: "SimpleWorkflow",
      blueprint: {
        _t: "LineBlueprint",
        target: this.instruction,
      },
    } as IOrderWorkflowModel;
  }

  toPayload(): IRapidPayload {
    return {
      _t: "LinePayload",
      target: this.instruction,
    } as IRapidPayload;
  }

  getInstruction() {
    return this.instruction;
  }
}

export class TimestampWorkflow extends Workflow {
  constructor(readonly instruction: string) {
    super("SimpleWorkflowConfig");
  }

  toModel(): IOrderWorkflowModel {
    return {
      _t: "SimpleWorkflow",
      blueprint: {
        _t: "ScrubBlueprint",
        target: this.instruction,
      },
    } as IOrderWorkflowModel;
  }

  toPayload(): IRapidPayload {
    return {
      _t: "ScrubPayload",
      target: this.instruction,
    } as IRapidPayload;
  }

  getInstruction() {
    return this.instruction;
  }
}

export class MultiRankingWorkflow extends Workflow {
  constructor(
    readonly instruction: string,
    readonly comparisonBudgetPerRanking: number,
    readonly randomComparisonsRatio: number,
    readonly eloStart = 1200,
    readonly eloKFactor = 40,
    readonly eloScalingFactor = 400,
    readonly contexts?: Record<string, string>,
    readonly mediaContexts?: Record<string, IAssetInput>,
  ) {
    super("CompareWorkflowConfig");
  }

  toModel(): IOrderWorkflowModel {
    return {
      _t: "GroupedRankingWorkflow",
      criteria: this.instruction,
      pairMakerConfig: {
        _t: "OnlinePairMaker",
        totalComparisonBudget: this.comparisonBudgetPerRanking,
        randomMatchesRatio: this.randomComparisonsRatio,
      },
      eloConfig: {
        startingElo: this.eloStart,
        kFactor: this.eloKFactor,
        scalingFactor: this.eloScalingFactor,
      },
      contexts: this.contexts,
      contextAssets: this.mediaContexts,
    } as IOrderWorkflowModel;
  }

  toPayload(): IRapidPayload {
    return {
      _t: "ComparePayload",
      criteria: this.instruction,
    } as IRapidPayload;
  }

  getInstruction() {
    return this.instruction;
  }
}

export interface ValidationRapid {
  asset: string | string[];
  payload: IRapidPayload;
  dataType: DataType;
  truth?: IValidationTruthModel;
  context?: string;
  mediaContext?: string;
  sentence?: string;
  randomCorrectProbability?: number;
  explanation?: string;
  settings?: RapidataSetting[];
}

export class RapidsManager {
  classificationRapid(options: {
    instruction: string;
    answerOptions: string[];
    datapoint: string;
    truths: string[];
    dataType?: DataType;
    context?: string;
    mediaContext?: string;
    explanation?: string;
  }): ValidationRapid {
    const { instruction, answerOptions, datapoint, truths, dataType = "media", context, mediaContext, explanation } = options;
    truths.forEach((truth) => assertCondition(answerOptions.includes(truth), "Truths must be part of the answer options."));
    return {
      asset: datapoint,
      dataType,
      context,
      mediaContext,
      explanation,
      payload: {
        _t: "ClassifyPayload",
        title: instruction,
        categories: answerOptions.map((option) => ({ label: option, value: option })),
      } as IRapidPayload,
      truth: {
        _t: "AttachCategoryTruth",
        correctCategories: truths,
      } as IValidationTruthModel,
      randomCorrectProbability: truths.length / answerOptions.length,
    };
  }

  compareRapid(options: {
    instruction: string;
    truth: string;
    datapoint: string[];
    dataType?: DataType;
    context?: string;
    mediaContext?: string;
    explanation?: string;
  }): ValidationRapid {
    const { instruction, truth, datapoint, dataType = "media", context, mediaContext, explanation } = options;
    assertCondition(datapoint.length === 2, "Compare rapid requires exactly two datapoints.");
    assertCondition(datapoint.includes(truth), "truth must be one of the datapoints.");
    return {
      asset: datapoint,
      dataType,
      context,
      mediaContext,
      explanation,
      payload: {
        _t: "ComparePayload",
        criteria: instruction,
      } as IRapidPayload,
      truth: {
        _t: "CompareTruth",
        winnerId: truth,
      } as IValidationTruthModel,
      randomCorrectProbability: 0.5,
    };
  }

  selectWordsRapid(options: {
    instruction: string;
    truths: number[];
    datapoint: string;
    sentence: string;
    requiredPrecision?: number;
    requiredCompleteness?: number;
    explanation?: string;
  }): ValidationRapid {
    const {
      instruction,
      truths,
      datapoint,
      sentence,
      requiredPrecision = 1,
      requiredCompleteness = 1,
      explanation,
    } = options;
    const transcription = sentence.split(/\s+/).map((word, index) => ({ word, wordIndex: index }));
    return {
      asset: datapoint,
      dataType: "media",
      sentence,
      explanation,
      payload: {
        _t: "TranscriptionPayload",
        title: instruction,
        transcription,
      } as IRapidPayload,
      truth: {
        _t: "TranscriptionTruth",
        correctWords: truths.map((index) => transcription[index]),
        requiredPrecision,
        requiredCompleteness,
      } as IValidationTruthModel,
      randomCorrectProbability: transcription.length === 0 ? 0 : truths.length / transcription.length,
    };
  }

  locateRapid(options: {
    instruction: string;
    truths: Box[];
    datapoint: string;
    context?: string;
    mediaContext?: string;
    explanation?: string;
  }): ValidationRapid {
    const { instruction, truths, datapoint, context, mediaContext, explanation } = options;
    return {
      asset: datapoint,
      dataType: "media",
      context,
      mediaContext,
      explanation,
      payload: {
        _t: "LocatePayload",
        target: instruction,
      } as IRapidPayload,
      truth: {
        _t: "LocateBoxTruth",
        boundingBoxes: truths.map((truth) => truth.toModel()),
      } as IValidationTruthModel,
      randomCorrectProbability: calculateBoxesCoverage(truths),
    };
  }

  drawRapid(options: {
    instruction: string;
    truths: Box[];
    datapoint: string;
    context?: string;
    mediaContext?: string;
    explanation?: string;
  }): ValidationRapid {
    const { instruction, truths, datapoint, context, mediaContext, explanation } = options;
    const [firstTruth] = truths;
    assertCondition(firstTruth, "Draw rapid requires at least one truth box.");
    return {
      asset: datapoint,
      dataType: "media",
      context,
      mediaContext,
      explanation,
      payload: {
        _t: "LinePayload",
        target: instruction,
      } as IRapidPayload,
      truth: {
        _t: "BoundingBoxTruth",
        xMin: firstTruth.xMin * 100,
        yMin: firstTruth.yMin * 100,
        xMax: firstTruth.xMax * 100,
        yMax: firstTruth.yMax * 100,
      } as IValidationTruthModel,
      randomCorrectProbability: calculateBoxesCoverage(truths),
    };
  }

  timestampRapid(options: {
    instruction: string;
    truths: Array<[number, number]>;
    datapoint: string;
    context?: string;
    mediaContext?: string;
    explanation?: string;
  }): ValidationRapid {
    const { instruction, truths, datapoint, context, mediaContext, explanation } = options;
    truths.forEach(([start, end]) => assertCondition(start <= end, "The start of an interval must be less than or equal to the end."));
    return {
      asset: datapoint,
      dataType: "media",
      context,
      mediaContext,
      explanation,
      payload: {
        _t: "ScrubPayload",
        target: instruction,
      } as IRapidPayload,
      truth: {
        _t: "ScrubTruth",
        validRanges: truths.map(([start, end]) => ({ start, end })),
      } as IValidationTruthModel,
      randomCorrectProbability: 0.5,
    };
  }
}

export function mapDatapoints(options: {
  datapoints: Array<string | string[]>;
  contexts?: string[];
  mediaContexts?: string[];
  sentences?: string[];
  privateMetadata?: Array<Record<string, string>>;
  groups?: string[];
  dataType?: DataType;
  multiAsset?: boolean;
}) {
  const {
    datapoints,
    contexts,
    mediaContexts,
    sentences,
    privateMetadata,
    groups,
    dataType = "media",
    multiAsset = false,
  } = options;

  if (multiAsset && datapoints.some((datapoint) => !Array.isArray(datapoint))) {
    throw new Error("Datapoints must be a list of lists of strings for multi-asset workflows.");
  }

  if (!multiAsset && datapoints.some((datapoint) => Array.isArray(datapoint))) {
    throw new Error("Datapoints must be a list of strings.");
  }

  const lengths = [contexts, mediaContexts, sentences, privateMetadata, groups]
    .map((value) => Array.isArray(value) ? value.length : undefined)
    .filter((value): value is number => value !== undefined);
  lengths.forEach((length) => assertCondition(length === datapoints.length, "All per-datapoint lists must match datapoint count."));

  if (groups && (new Set(groups).size !== groups.length)) {
    throw new Error("groups must contain unique values.");
  }

  return datapoints.map((asset, index) => new Datapoint({
    asset,
    dataType,
    context: contexts?.[index],
    mediaContext: mediaContexts?.[index],
    sentence: sentences?.[index],
    privateMetadata: privateMetadata?.[index],
    group: groups?.[index],
  }));
}

export function createTextInput(assets: string | string[]): IAssetInput {
  if (Array.isArray(assets)) {
    return {
      _t: "MultiAssetInput",
      assets: assets.map((asset) => ({
        _t: "TextAssetInput",
        text: asset,
      })),
    } as IAssetInput;
  }

  return {
    _t: "TextAssetInput",
    text: assets,
  } as IAssetInput;
}

export function createExistingAssetInput(uploadedNames: string | string[]): IAssetInput {
  if (Array.isArray(uploadedNames)) {
    return {
      _t: "MultiAssetInput",
      assets: uploadedNames.map((name) => ({
        _t: "ExistingAssetInput",
        name,
      })),
    } as IAssetInput;
  }

  return {
    _t: "ExistingAssetInput",
    name: uploadedNames,
  } as IAssetInput;
}

function calculateBoxesCoverage(boxes: Box[]) {
  if (boxes.length === 0) {
    return 0;
  }

  const events = boxes.flatMap((box, index) => [
    [box.xMin, "start", index] as const,
    [box.xMax, "end", index] as const,
  ]).sort((left, right) => left[0] - right[0]);

  let totalArea = 0;
  let previousX = 0;
  const activeBoxes = new Set<number>();

  for (const [x, event, boxIndex] of events) {
    if (activeBoxes.size > 0 && x > previousX) {
      const yIntervals = [...activeBoxes]
        .map((index) => [boxes[index]!.yMin, boxes[index]!.yMax] as const)
        .sort((left, right) => left[0] - right[0]);
      const merged: Array<[number, number]> = [];
      for (const [start, end] of yIntervals) {
        const last = merged.at(-1);
        if (last && start <= last[1]) {
          last[1] = Math.max(last[1], end);
        } else {
          merged.push([start, end]);
        }
      }
      totalArea += (x - previousX) * merged.reduce((sum, [start, end]) => sum + (end - start), 0);
    }

    if (event === "start") {
      activeBoxes.add(boxIndex);
    } else {
      activeBoxes.delete(boxIndex);
    }
    previousX = x;
  }

  return totalArea;
}

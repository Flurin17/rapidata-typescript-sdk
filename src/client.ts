import { execFileSync } from "node:child_process";
import { randomUUID } from "node:crypto";
import { existsSync } from "node:fs";
import { chmod, mkdir, readFile, writeFile } from "node:fs/promises";
import { hostname, homedir } from "node:os";
import path from "node:path";
import { setTimeout as sleep } from "node:timers/promises";
import { context as otelContext, propagation } from "@opentelemetry/api";
import openBrowser from "open";
import { logger, managedPrint, rapidataConfig, tracer } from "./config";
import {
  ClassifyWorkflow,
  CompareWorkflow,
  createExistingAssetInput,
  createTextInput,
  Datapoint,
  DrawWorkflow,
  EarlyStoppingReferee,
  type DataType,
  FreeTextWorkflow,
  LocateWorkflow,
  mapDatapoints,
  MultiRankingWorkflow,
  NaiveReferee,
  QuorumReferee,
  RapidataResults,
  RapidsManager,
  SelectWordsWorkflow,
  TimestampWorkflow,
} from "./domain";
import type {
  Box,
  RapidataFilter,
  RapidataSelection,
  RapidataSetting,
  ValidationRapid,
  Workflow,
} from "./domain";
import { FailedUpload, FailedUploadException, RapidataError } from "./errors";
import * as Generated from "./generated";
import { SDK_VERSION } from "./version";

const DEFAULT_ENVIRONMENT = "rapidata.ai";
const DEFAULT_OAUTH_SCOPE = "openid roles email";
const BRIDGE_OAUTH_SCOPE = "openid profile email roles";
const DEFAULT_POLL_TIMEOUT_MS = 300_000;
const DEFAULT_POLL_INTERVAL_MS = 1_000;
const LATEST_RELEASE_REPOSITORY = "flurinlaim/rapidata-typescript-sdk";

type StoredCredentialRecord = {
  display_name: string;
  client_id: string;
  client_secret: string;
  endpoint: string;
  created_at: string;
  last_used: string;
};

type StoredCredentialsFile = Record<string, StoredCredentialRecord[]>;

export interface RapidataToken {
  accessToken?: string;
  access_token?: string;
  tokenType?: string;
  token_type?: string;
  refreshToken?: string | null;
  refresh_token?: string | null;
  expiresIn?: number;
  expires_in?: number;
  expiresAt?: number;
  expires_at?: number;
  scope?: string | null;
  obtainedAt?: number;
}

export interface RapidataApiClientOptions {
  clientId?: string;
  clientSecret?: string;
  environment?: string;
  oauthScope?: string;
  certPath?: string;
  token?: RapidataToken;
  leeway?: number;
}

export interface RapidataClientOptions extends RapidataApiClientOptions {}

type NormalizedToken = {
  accessToken: string;
  tokenType?: string;
  refreshToken?: string | null;
  scope?: string | null;
  expiresAt?: number;
};

type ClientCredentials = {
  clientId: string;
  clientSecret: string;
  source: "explicit" | "stored";
};

type MaybeArtifactIds = {
  workflowId?: string;
  campaignId?: string;
  datasetId?: string;
};

type LoadedPipelineArtifactIds = MaybeArtifactIds & {
  pipelineId?: string;
};

type CreateOrderBaseOptions = {
  name: string;
  workflow: Workflow;
  datapoints: Datapoint[];
  responsesPerDatapoint: number;
  validationSetId?: string;
  confidenceThreshold?: number;
  quorumThreshold?: number;
  filters?: RapidataFilter[];
  settings?: RapidataSetting[];
  selections?: RapidataSelection[];
};

let generatedClientLock: Promise<void> = Promise.resolve();

function withGeneratedClientLock<T>(callback: () => Promise<T>) {
  const current = generatedClientLock.then(callback, callback);
  generatedClientLock = current.then(
    () => undefined,
    () => undefined,
  );
  return current;
}

function compareVersions(left: string, right: string) {
  const leftParts = left.split(/[+-]/)[0]?.split(".").map((part) => Number.parseInt(part, 10) || 0) ?? [0];
  const rightParts = right.split(/[+-]/)[0]?.split(".").map((part) => Number.parseInt(part, 10) || 0) ?? [0];
  const length = Math.max(leftParts.length, rightParts.length);
  for (let index = 0; index < length; index += 1) {
    const leftPart = leftParts[index] ?? 0;
    const rightPart = rightParts[index] ?? 0;
    if (leftPart !== rightPart) {
      return leftPart - rightPart;
    }
  }
  return 0;
}

function normalizeEnvironment(environment: string) {
  return environment.replace(/^https?:\/\//, "").replace(/\/+$/, "");
}

function extractErrorMessage(body: unknown, fallback: string) {
  if (!body || typeof body !== "object") {
    return fallback;
  }

  const bodyRecord = body as Record<string, unknown>;
  const message =
    bodyRecord.detail ??
    bodyRecord.title ??
    bodyRecord.message ??
    bodyRecord.error_description ??
    bodyRecord.error;

  return typeof message === "string" && message.trim() ? message : fallback;
}

function normalizeError(error: unknown): RapidataError {
  if (error instanceof RapidataError) {
    return error;
  }

  if (error instanceof Generated.ApiError) {
    return new RapidataError(
      extractErrorMessage(error.body, `${error.status} ${error.statusText}`),
      {
        statusCode: error.status,
        details: error.body,
        originalError: error,
      },
    );
  }

  if (error instanceof Error) {
    return new RapidataError(error.message, { originalError: error });
  }

  return new RapidataError(String(error), { originalError: error });
}

function isUrlLike(value: string) {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

function maybeDate(value?: string | null) {
  return value ? new Date(value) : undefined;
}

function normalizeToken(input?: RapidataToken): NormalizedToken | undefined {
  if (!input) {
    return undefined;
  }

  const accessToken = input.accessToken ?? input.access_token;
  if (!accessToken) {
    return undefined;
  }

  const expiresAtRaw = input.expiresAt ?? input.expires_at;
  const expiresIn = input.expiresIn ?? input.expires_in;
  const obtainedAt = input.obtainedAt ?? Date.now();

  let expiresAt = expiresAtRaw;
  if (expiresAt !== undefined && expiresAt < 1_000_000_000_000) {
    expiresAt *= 1_000;
  }

  if (expiresAt === undefined && expiresIn !== undefined) {
    expiresAt = obtainedAt + expiresIn * 1_000;
  }

  return {
    accessToken,
    tokenType: input.tokenType ?? input.token_type,
    refreshToken: input.refreshToken ?? input.refresh_token,
    scope: input.scope,
    expiresAt,
  };
}

function isTokenExpired(token: NormalizedToken, leewaySeconds: number) {
  return token.expiresAt !== undefined && Date.now() >= token.expiresAt - leewaySeconds * 1_000;
}

function getCredentialsFilePath() {
  return path.join(homedir(), ".config", "rapidata", "credentials.json");
}

function resolveLocalCertificate(environment: string, certPath?: string) {
  if (certPath) {
    return certPath;
  }

  if (environment !== "rapidata.dev") {
    return undefined;
  }

  try {
    const caroot = execFileSync("mkcert", ["-CAROOT"], {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
    if (!caroot) {
      return undefined;
    }

    const localCertificate = path.join(caroot, "rootCA.pem");
    return existsSync(localCertificate) ? localCertificate : undefined;
  } catch {
    return undefined;
  }
}

async function blobToJson<T>(blob: Blob) {
  const text = await blob.text();
  return JSON.parse(text) as T;
}

function getArtifactId(value: unknown, key: string) {
  if (!value || typeof value !== "object") {
    return undefined;
  }

  const record = value as Record<string, unknown>;
  const direct = record[key];
  if (typeof direct === "string") {
    return direct;
  }

  const actualInstance = record.actualInstance;
  if (actualInstance && typeof actualInstance === "object") {
    const nested = (actualInstance as Record<string, unknown>)[key];
    if (typeof nested === "string") {
      return nested;
    }
  }

  return undefined;
}

function extractPipelineArtifactIds(pipeline: unknown): MaybeArtifactIds {
  if (!pipeline || typeof pipeline !== "object") {
    return {};
  }

  const artifacts = (pipeline as Record<string, unknown>).artifacts;
  if (!artifacts || typeof artifacts !== "object") {
    return {};
  }

  const artifactEntries = Object.values(artifacts as Record<string, unknown>);
  const workflowId =
    getArtifactId((artifacts as Record<string, unknown>)["workflow-artifact"], "workflowId") ??
    artifactEntries.map((artifact) => getArtifactId(artifact, "workflowId")).find(Boolean);
  const campaignId =
    getArtifactId((artifacts as Record<string, unknown>)["campaign-artifact"], "campaignId") ??
    artifactEntries.map((artifact) => getArtifactId(artifact, "campaignId")).find(Boolean);
  const datasetId =
    getArtifactId((artifacts as Record<string, unknown>)["dataset-artifact"], "datasetId") ??
    artifactEntries.map((artifact) => getArtifactId(artifact, "datasetId")).find(Boolean);

  return { workflowId, campaignId, datasetId };
}

class CredentialManager {
  private readonly configPath = getCredentialsFilePath();

  constructor(
    private readonly authBaseUrl: string,
    private readonly apiBaseUrl: string,
    private readonly certPath: string | undefined,
  ) {}

  async getClientCredentials(oauthScope: string) {
    const credentials = await this.readCredentials();
    const environmentCredentials = credentials[this.authBaseUrl] ?? [];
    const selectedCredential = this.selectCredential(environmentCredentials);
    if (selectedCredential) {
      selectedCredential.last_used = new Date().toISOString();
      await this.writeCredentials(credentials);
      return selectedCredential;
    }

    return this.createNewCredentials(oauthScope);
  }

  async resetCredentials() {
    const credentials = await this.readCredentials();
    if (credentials[this.authBaseUrl]) {
      delete credentials[this.authBaseUrl];
      await this.writeCredentials(credentials);
    }
  }

  private async createNewCredentials(oauthScope: string) {
    const bridgeToken = await this.getBridgeToken();
    const authUrl = `${this.authBaseUrl}/connect/authorize/external?clientId=rapidata-cli&scope=${encodeURIComponent(BRIDGE_OAUTH_SCOPE || oauthScope)}&writeKey=${encodeURIComponent(bridgeToken.writeKey)}`;

    try {
      await openBrowser(authUrl);
    } catch {
      managedPrint(`Please open this URL in your browser: ${authUrl}`);
    }

    const accessToken = await this.pollReadKey(bridgeToken.readKey);
    const displayName = `${hostname()} - TypeScript API Client`;
    const createdClient = await this.createClient(accessToken, displayName);

    const credential: StoredCredentialRecord = {
      display_name: createdClient.displayName,
      client_id: createdClient.clientId,
      client_secret: createdClient.clientSecret,
      endpoint: this.authBaseUrl,
      created_at: new Date().toISOString(),
      last_used: new Date().toISOString(),
    };

    const credentials = await this.readCredentials();
    credentials[this.authBaseUrl] = [...(credentials[this.authBaseUrl] ?? []), credential];
    await this.writeCredentials(credentials);
    return credential;
  }

  private async getBridgeToken() {
    const response = await this.fetchJson<{ readKey: string; writeKey: string }>(
      `${this.authBaseUrl}/identity/bridge-token?clientId=rapidata-cli`,
      { method: "POST" },
    );
    return response;
  }

  private async pollReadKey(readKey: string) {
    const startedAt = Date.now();
    while (Date.now() - startedAt < DEFAULT_POLL_TIMEOUT_MS) {
      const response = await this.fetch(
        `${this.authBaseUrl}/identity/bridge-token?readKey=${encodeURIComponent(readKey)}`,
        { method: "GET" },
      );

      if (response.status === 200) {
        const payload = await response.json() as { accessToken?: string | null };
        if (payload.accessToken) {
          return payload.accessToken;
        }
        throw new RapidataError("Authentication finished without an access token.");
      }

      if (response.status === 202) {
        await sleep(DEFAULT_POLL_INTERVAL_MS);
        continue;
      }

      const body = await this.readUnknownBody(response);
      throw new RapidataError(
        extractErrorMessage(body, `Bridge token polling failed with status ${response.status}.`),
        { statusCode: response.status, details: body },
      );
    }

    throw new RapidataError("Authentication timed out while waiting for the browser login to finish.");
  }

  private async createClient(accessToken: string, displayName: string) {
    const payload = JSON.stringify({ displayName });
    const headers = {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    };

    const attempts = [
      `${this.authBaseUrl}/Client`,
      `${this.apiBaseUrl}/client`,
    ];

    let lastError: RapidataError | undefined;
    for (const url of attempts) {
      const response = await this.fetch(url, {
        method: "POST",
        headers,
        body: payload,
      });
      if (response.ok) {
        const result = await response.json() as { clientId: string; clientSecret: string };
        return {
          clientId: result.clientId,
          clientSecret: result.clientSecret,
          displayName,
        };
      }

      const body = await this.readUnknownBody(response);
      lastError = new RapidataError(
        extractErrorMessage(body, `Failed to create SDK client via ${url}.`),
        { statusCode: response.status, details: body },
      );
    }

    throw lastError ?? new RapidataError("Failed to create SDK client.");
  }

  private selectCredential(credentials: StoredCredentialRecord[]) {
    if (credentials.length === 0) {
      return undefined;
    }

    return [...credentials].sort((left, right) => (
      new Date(right.last_used).getTime() - new Date(left.last_used).getTime()
    ))[0];
  }

  private async readCredentials(): Promise<StoredCredentialsFile> {
    try {
      const raw = await readFile(this.configPath, "utf8");
      const parsed = JSON.parse(raw) as StoredCredentialsFile;
      return parsed && typeof parsed === "object" ? parsed : {};
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === "ENOENT") {
        return {};
      }
      if (error instanceof SyntaxError) {
        return {};
      }
      throw error;
    }
  }

  private async writeCredentials(credentials: StoredCredentialsFile) {
    await mkdir(path.dirname(this.configPath), { recursive: true });
    await writeFile(this.configPath, `${JSON.stringify(credentials, null, 2)}\n`, "utf8");
    await chmod(this.configPath, 0o600);
  }

  private async fetch(url: string, init: RequestInit) {
    const dispatcher = await this.getDispatcher();
    return fetch(url, {
      ...init,
      ...(dispatcher ? { dispatcher } : {}),
    } as RequestInit & { dispatcher?: unknown });
  }

  private async fetchJson<T>(url: string, init: RequestInit) {
    const response = await this.fetch(url, init);
    const body = await this.readUnknownBody(response);
    if (!response.ok) {
      throw new RapidataError(extractErrorMessage(body, `${response.status} ${response.statusText}`), {
        statusCode: response.status,
        details: body,
      });
    }
    return body as T;
  }

  private async readUnknownBody(response: Response) {
    const contentType = response.headers.get("content-type")?.toLowerCase();
    if (contentType?.includes("application/json")) {
      return response.json();
    }
    return response.text();
  }

  private dispatcherPromise?: Promise<unknown>;

  private async getDispatcher() {
    if (!this.certPath) {
      return undefined;
    }

    if (!this.dispatcherPromise) {
      this.dispatcherPromise = (async () => {
        const [{ Agent }, ca] = await Promise.all([
          import("undici"),
          readFile(this.certPath!, "utf8"),
        ]);
        return new Agent({
          connect: { ca },
        });
      })();
    }

    return this.dispatcherPromise;
  }
}

class OAuthTokenProvider {
  private cachedCredential?: StoredCredentialRecord;

  private accessToken?: NormalizedToken;

  constructor(
    private readonly options: {
      authBaseUrl: string;
      oauthScope: string;
      leeway: number;
      certPath?: string;
      token?: RapidataToken;
      clientId?: string;
      clientSecret?: string;
      credentialManager: CredentialManager;
    },
  ) {
    this.accessToken = normalizeToken(options.token);
  }

  async getAccessToken() {
    if (this.accessToken && !isTokenExpired(this.accessToken, this.options.leeway)) {
      return this.accessToken.accessToken;
    }

    if (this.accessToken?.refreshToken) {
      try {
        const refreshed = await this.refreshAccessToken(this.accessToken.refreshToken);
        this.accessToken = refreshed;
        return refreshed.accessToken;
      } catch (error) {
        logger.debug("Refreshing the access token failed: %s", error);
      }
    }

    const credentials = await this.getClientCredentials();
    try {
      const token = await this.requestClientCredentialsToken(credentials.clientId, credentials.clientSecret, this.options.oauthScope);
      this.accessToken = token;
      return token.accessToken;
    } catch (error) {
      const normalized = normalizeError(error);
      const details = normalized.details as Record<string, unknown> | undefined;
      if (
        credentials.source === "stored"
        && (details?.error === "invalid_client" || normalized.message.includes("invalid_client"))
      ) {
        await this.options.credentialManager.resetCredentials();
        this.cachedCredential = undefined;
        const refreshedCredentials = await this.getClientCredentials(true);
        const token = await this.requestClientCredentialsToken(
          refreshedCredentials.clientId,
          refreshedCredentials.clientSecret,
          this.options.oauthScope,
        );
        this.accessToken = token;
        managedPrint("Credentials were reset and re-authenticated successfully.");
        return token.accessToken;
      }

      throw normalized;
    }
  }

  async resetStoredCredentials() {
    await this.options.credentialManager.resetCredentials();
    this.cachedCredential = undefined;
    this.accessToken = normalizeToken(this.options.token);
  }

  private async refreshAccessToken(refreshToken: string) {
    const credentials = await this.getClientCredentials();
    return this.requestToken({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
      client_id: credentials.clientId,
      client_secret: credentials.clientSecret,
    });
  }

  private async requestClientCredentialsToken(clientId: string, clientSecret: string, scope: string) {
    return this.requestToken({
      grant_type: "client_credentials",
      client_id: clientId,
      client_secret: clientSecret,
      scope,
    });
  }

  private async requestToken(body: Record<string, string>) {
    const response = await this.fetch(`${this.options.authBaseUrl}/connect/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
      },
      body: new URLSearchParams(body),
    });

    const payload = await this.readUnknownBody(response);
    if (!response.ok) {
      throw new RapidataError(
        extractErrorMessage(payload, `${response.status} ${response.statusText}`),
        {
          statusCode: response.status,
          details: payload,
        },
      );
    }

    const typedPayload = typeof payload === "string" ? {} : payload;
    const token = normalizeToken({
      access_token: typedPayload.access_token,
      token_type: typedPayload.token_type,
      refresh_token: typedPayload.refresh_token,
      expires_in: typedPayload.expires_in,
      scope: typedPayload.scope,
    });

    if (!token) {
      throw new RapidataError("Token endpoint returned an unusable token.", {
        details: payload,
      });
    }

    return token;
  }

  private async getClientCredentials(forceRefresh = false): Promise<ClientCredentials> {
    if (this.options.clientId && this.options.clientSecret) {
      return {
        clientId: this.options.clientId,
        clientSecret: this.options.clientSecret,
        source: "explicit",
      };
    }

    if (!this.cachedCredential || forceRefresh) {
      this.cachedCredential = await this.options.credentialManager.getClientCredentials(this.options.oauthScope);
    }

    return {
      clientId: this.cachedCredential.client_id,
      clientSecret: this.cachedCredential.client_secret,
      source: "stored",
    };
  }

  private async fetch(url: string, init: RequestInit) {
    const dispatcher = await this.getDispatcher();
    return fetch(url, {
      ...init,
      ...(dispatcher ? { dispatcher } : {}),
    } as RequestInit & { dispatcher?: unknown });
  }

  private async readUnknownBody(response: Response) {
    const contentType = response.headers.get("content-type")?.toLowerCase();
    if (contentType?.includes("application/json")) {
      return response.json() as Promise<Record<string, any>>;
    }
    return response.text();
  }

  private dispatcherPromise?: Promise<unknown>;

  private async getDispatcher() {
    if (!this.options.certPath) {
      return undefined;
    }

    if (!this.dispatcherPromise) {
      this.dispatcherPromise = (async () => {
        const [{ Agent }, ca] = await Promise.all([
          import("undici"),
          readFile(this.options.certPath!, "utf8"),
        ]);
        return new Agent({
          connect: { ca },
        });
      })();
    }

    return this.dispatcherPromise;
  }
}

class AssetUploader {
  private readonly cache = new Map<string, string>();

  constructor(private readonly api: RapidataApiClient) {}

  clearCache() {
    this.cache.clear();
  }

  async createAssetInput(asset: string | string[], dataType: DataType): Promise<Generated.IAssetInput> {
    if (dataType === "text") {
      return createTextInput(asset);
    }

    if (Array.isArray(asset)) {
      const uploaded = await Promise.all(asset.map((item) => this.uploadAsset(item)));
      return createExistingAssetInput(uploaded);
    }

    return createExistingAssetInput(await this.uploadAsset(asset));
  }

  async uploadAsset(asset: string) {
    const cached = this.cache.get(asset);
    if (cached) {
      return cached;
    }

    let uploadedName: string;
    if (isUrlLike(asset)) {
      const response = await this.api.asset.postAssetUrl({ url: asset });
      uploadedName = response.fileName;
    } else if (existsSync(asset)) {
      const fileName = path.basename(asset);
      const file = new File([await readFile(asset)], fileName);
      const response = await this.api.asset.postAssetFile({
        formData: { file },
      });
      uploadedName = response.fileName;
    } else {
      uploadedName = asset;
    }

    this.cache.set(asset, uploadedName);
    return uploadedName;
  }
}

export class RapidataApiClient {
  readonly environment: string;

  readonly apiBaseUrl: string;

  readonly authBaseUrl: string;

  readonly appBaseUrl: string;

  readonly certPath?: string;

  private readonly tokenProvider: OAuthTokenProvider;

  private readonly services = new Map<string, object>();

  private readonly credentialManager: CredentialManager;

  private readonly xClientHeader = `RapidataTypeScriptSDK/${SDK_VERSION}`;

  constructor(options: RapidataApiClientOptions = {}) {
    this.environment = normalizeEnvironment(options.environment ?? DEFAULT_ENVIRONMENT);
    this.apiBaseUrl = `https://api.${this.environment}`;
    this.authBaseUrl = `https://auth.${this.environment}`;
    this.appBaseUrl = `https://app.${this.environment}`;
    this.certPath = resolveLocalCertificate(this.environment, options.certPath);

    this.credentialManager = new CredentialManager(this.authBaseUrl, this.apiBaseUrl, this.certPath);
    this.tokenProvider = new OAuthTokenProvider({
      authBaseUrl: this.authBaseUrl,
      oauthScope: options.oauthScope ?? DEFAULT_OAUTH_SCOPE,
      leeway: options.leeway ?? 60,
      certPath: this.certPath,
      token: options.token,
      clientId: options.clientId,
      clientSecret: options.clientSecret,
      credentialManager: this.credentialManager,
    });
  }

  get asset() {
    return this.getService("asset", Generated.AssetService);
  }

  get audience() {
    return this.getService("audience", Generated.AudienceService);
  }

  get benchmark() {
    return this.getService("benchmark", Generated.BenchmarkService);
  }

  get campaign() {
    return this.getService("campaign", Generated.CampaignService);
  }

  get dataset() {
    return this.getService("dataset", Generated.DatasetService);
  }

  get examples() {
    return this.getService("examples", Generated.ExamplesService);
  }

  get flow() {
    return this.getService("flow", Generated.FlowService);
  }

  get identity() {
    return this.getService("identity", Generated.IdentityService);
  }

  get job() {
    return this.getService("job", Generated.JobService);
  }

  get leaderboard() {
    return this.getService("leaderboard", Generated.LeaderboardService);
  }

  get order() {
    return this.getService("order", Generated.OrderService);
  }

  get pipeline() {
    return this.getService("pipeline", Generated.PipelineService);
  }

  get rapid() {
    return this.getService("rapid", Generated.RapidService);
  }

  get rankingFlow() {
    return this.getService("rankingFlow", Generated.RankingFlowService);
  }

  get rankingFlowItem() {
    return this.getService("rankingFlowItem", Generated.RankingFlowItemService);
  }

  get flowItem() {
    return this.getService("flowItem", Generated.FlowItemService);
  }

  get validation() {
    return this.getService("validation", Generated.ValidationSetService);
  }

  get workflow() {
    return this.getService("workflow", Generated.WorkflowService);
  }

  async getAccessToken() {
    return this.tokenProvider.getAccessToken();
  }

  async getUserInfo() {
    const accessToken = await this.getAccessToken();
    const response = await this.fetch(`${this.authBaseUrl}/connect/userinfo`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/json",
      },
      signal: AbortSignal.timeout(1_000),
    });
    const payload = await this.readUnknownBody(response);
    if (!response.ok) {
      throw new RapidataError(extractErrorMessage(payload, `Failed to fetch userinfo (${response.status}).`), {
        statusCode: response.status,
        details: payload,
      });
    }
    return payload as Record<string, unknown>;
  }

  async resetCredentials() {
    await this.tokenProvider.resetStoredCredentials();
  }

  async fetch(url: string, init: RequestInit = {}) {
    const dispatcher = await this.getDispatcher();
    return fetch(url, {
      ...init,
      ...(dispatcher ? { dispatcher } : {}),
    } as RequestInit & { dispatcher?: unknown });
  }

  private getService(name: string, service: object) {
    const existing = this.services.get(name);
    if (existing) {
      return existing as any;
    }

    const proxy = new Proxy({} as Record<string, unknown>, {
      get: (_, property) => {
        const value = (service as Record<PropertyKey, unknown>)[property];
        if (typeof value !== "function") {
          return value;
        }

        return async (...args: unknown[]) => this.withGeneratedConfiguration(
          `${name}.${String(property)}`,
          async () => value(...args),
        );
      },
    });

    this.services.set(name, proxy);
    return proxy as any;
  }

  private async withGeneratedConfiguration<T>(spanName: string, callback: () => Promise<T>) {
    return withGeneratedClientLock(async () => {
      const previousConfig = {
        ...Generated.OpenAPI,
      };
      const previousFetch = globalThis.fetch;
      const dispatcher = await this.getDispatcher();

      Generated.OpenAPI.BASE = this.apiBaseUrl;
      Generated.OpenAPI.HEADERS = async () => this.getHeaders();
      Generated.OpenAPI.TOKEN = async () => this.getAccessToken();

      if (dispatcher) {
        globalThis.fetch = ((input: Parameters<typeof fetch>[0], init?: Parameters<typeof fetch>[1]) => previousFetch(input, {
          ...init,
          dispatcher,
        } as RequestInit & { dispatcher?: unknown })) as typeof fetch;
      }

      try {
        return await tracer.startActiveSpan(`RapidataApiClient.${spanName}`, callback);
      } catch (error) {
        throw normalizeError(error);
      } finally {
        Generated.OpenAPI.BASE = previousConfig.BASE;
        Generated.OpenAPI.VERSION = previousConfig.VERSION;
        Generated.OpenAPI.WITH_CREDENTIALS = previousConfig.WITH_CREDENTIALS;
        Generated.OpenAPI.CREDENTIALS = previousConfig.CREDENTIALS;
        Generated.OpenAPI.TOKEN = previousConfig.TOKEN;
        Generated.OpenAPI.USERNAME = previousConfig.USERNAME;
        Generated.OpenAPI.PASSWORD = previousConfig.PASSWORD;
        Generated.OpenAPI.HEADERS = previousConfig.HEADERS;
        Generated.OpenAPI.ENCODE_PATH = previousConfig.ENCODE_PATH;
        globalThis.fetch = previousFetch;
      }
    });
  }

  private async getHeaders() {
    const headers: Record<string, string> = {
      "X-Client": this.xClientHeader,
    };

    if (rapidataConfig.logging.enableOtlp) {
      propagation.inject(otelContext.active(), headers);
    }

    return headers;
  }

  private async readUnknownBody(response: Response) {
    const contentType = response.headers.get("content-type")?.toLowerCase();
    if (contentType?.includes("application/json")) {
      return response.json();
    }
    return response.text();
  }

  private dispatcherPromise?: Promise<unknown>;

  private async getDispatcher() {
    if (!this.certPath) {
      return undefined;
    }

    if (!this.dispatcherPromise) {
      this.dispatcherPromise = (async () => {
        const [{ Agent }, ca] = await Promise.all([
          import("undici"),
          readFile(this.certPath!, "utf8"),
        ]);
        return new Agent({
          connect: { ca },
        });
      })();
    }

    return this.dispatcherPromise;
  }
}

type ClientContext = {
  api: RapidataApiClient;
  uploader: AssetUploader;
  ready: Promise<void>;
  appBaseUrl: string;
  apiBaseUrl: string;
};

abstract class BaseEntity {
  constructor(protected readonly context: ClientContext) {}

  protected async openUrl(url: string) {
    try {
      await openBrowser(url);
    } catch {
      managedPrint(`Please open this URL in your browser: ${url}`);
    }
  }
}

export class RapidataOrder extends BaseEntity {
  readonly orderDetailsPage: string;

  createdAt?: Date;

  pipelineId?: string;

  campaignId?: string;

  constructor(
    readonly id: string,
    readonly name: string,
    context: ClientContext,
    options?: {
      createdAt?: Date;
      pipelineId?: string;
      campaignId?: string;
    },
  ) {
    super(context);
    this.createdAt = options?.createdAt;
    this.pipelineId = options?.pipelineId;
    this.campaignId = options?.campaignId;
    this.orderDetailsPage = `${this.context.appBaseUrl}/order/detail/${this.id}`;
  }

  async run(after?: RapidataOrder | string | null) {
    await this.context.ready;
    if (after) {
      await this.context.api.order.patchOrder({
        orderId: this.id,
        requestBody: {
          precedingOrderId: typeof after === "string" ? after : after.id,
        },
      });
    }

    await this.context.api.order.postOrderSubmit({
      orderId: this.id,
      requestBody: {
        ignoreFailedDatapoints: true,
      },
    });

    managedPrint(`Order '${this.name}' is now viewable under: ${this.orderDetailsPage}`);
    return this;
  }

  async pause() {
    await this.context.ready;
    await this.context.api.order.postOrderPause({ orderId: this.id });
  }

  async unpause() {
    await this.context.ready;
    await this.context.api.order.postOrderResume({ orderId: this.id });
  }

  async delete() {
    await this.context.ready;
    await this.context.api.order.deleteOrder({ orderId: this.id });
  }

  async getStatus() {
    await this.context.ready;
    const order = await this.context.api.order.getOrder({ orderId: this.id });
    this.createdAt = maybeDate(order.orderDate);
    this.pipelineId = order.pipelineId;
    return order.state;
  }

  async displayProgressBar(refreshRate = 5) {
    if (refreshRate < 1) {
      throw new Error("refreshRate must be at least 1.");
    }

    while (true) {
      const progress = await this.getWorkflowProgress();
      const status = await this.getStatus();
      managedPrint(`Order '${this.name}': ${progress?.completionPercentage ?? 0}% (${status})`);
      if (!progress || progress.completionPercentage >= 100 || ["Completed", "Failed", "Paused", "ManualReview"].includes(status)) {
        return;
      }
      await sleep(refreshRate * 1_000);
    }
  }

  async getResults(preliminaryResults = false) {
    await this.context.ready;
    const status = await this.getStatus();
    if (preliminaryResults && status !== "Completed") {
      return this.getPreliminaryResults();
    }

    while (!["Completed", "Paused", "ManualReview", "Failed"].includes(await this.getStatus())) {
      await sleep(1_000);
    }

    const resultsBlob = await this.context.api.order.getOrderDownloadResults({ orderId: this.id });
    return new RapidataResults(await blobToJson<Record<string, unknown>>(resultsBlob));
  }

  async view() {
    await this.openUrl(this.orderDetailsPage);
  }

  async preview() {
    await this.context.ready;
    if ((await this.getStatus()) === "Created") {
      await this.context.api.order.postOrderPreview({
        orderId: this.id,
        requestBody: { ignoreFailedDatapoints: true },
      });
    }

    const { campaignId } = await this.loadPipelineArtifactIds();
    const previewUrl = `${this.context.appBaseUrl}/order/detail/${this.id}/preview${campaignId ? `?campaignId=${encodeURIComponent(campaignId)}` : ""}`;
    await this.openUrl(previewUrl);
    return this;
  }

  private async getPreliminaryResults() {
    const { pipelineId } = await this.loadPipelineArtifactIds();
    if (!pipelineId) {
      throw new RapidataError(`Order ${this.id} has no pipeline id yet.`);
    }

    const download = await this.context.api.pipeline.postPipelinePreliminaryDownload({
      pipelineId,
      requestBody: { sendEmail: false },
    });

    for (let attempt = 0; attempt < 60; attempt += 1) {
      const result = await this.context.api.pipeline.getPipelinePreliminaryDownload({
        preliminaryDownloadId: download.downloadId,
      });

      if (result instanceof Blob) {
        return new RapidataResults(await blobToJson<Record<string, unknown>>(result));
      }

      await sleep(1_000);
    }

    throw new RapidataError(`Preliminary results for order ${this.id} are not available yet.`);
  }

  private async getWorkflowProgress() {
    const { workflowId } = await this.loadPipelineArtifactIds();
    if (!workflowId) {
      return undefined;
    }

    try {
      return await this.context.api.workflow.getWorkflowProgress({ workflowId });
    } catch {
      return undefined;
    }
  }

  private async loadPipelineArtifactIds(): Promise<LoadedPipelineArtifactIds> {
    if (this.pipelineId && this.campaignId) {
      return {
        pipelineId: this.pipelineId,
        campaignId: this.campaignId,
      };
    }

    if (!this.pipelineId) {
      const order = await this.context.api.order.getOrder({ orderId: this.id });
      this.pipelineId = order.pipelineId;
      this.createdAt = maybeDate(order.orderDate);
    }

    if (!this.pipelineId) {
      return {};
    }

    const pipeline = await this.context.api.pipeline.getPipeline({ pipelineId: this.pipelineId });
    const ids = extractPipelineArtifactIds(pipeline);
    this.campaignId = ids.campaignId ?? this.campaignId;
    return {
      pipelineId: this.pipelineId,
      ...ids,
    };
  }
}

export class RapidataJobDefinition extends BaseEntity {
  private readonly jobDetailsPage: string;

  constructor(
    readonly id: string,
    readonly name: string,
    context: ClientContext,
  ) {
    super(context);
    this.jobDetailsPage = `${this.context.appBaseUrl}/definitions/${this.id}`;
  }

  async preview() {
    await this.openUrl(this.jobDetailsPage);
    return this;
  }

  async updateDataset(
    datapoints: string[] | string[][],
    dataType: DataType = "media",
    contexts?: string[],
    mediaContexts?: string[],
    sentences?: string[],
    privateMetadata?: Array<Record<string, string>>,
  ) {
    await this.context.ready;
    const datapointModels = mapDatapoints({
      datapoints,
      dataType,
      contexts,
      mediaContexts,
      sentences,
      privateMetadata,
      multiAsset: Array.isArray(datapoints[0]),
    });

    const dataset = await createDatasetWithDatapoints(this.context, `${this.name}_dataset`, datapointModels, {
      jobDefinitionId: this.id,
    });

    await this.context.api.job.postJobDefinitionRevision({
      definitionId: this.id,
      requestBody: {
        datasetId: dataset.id,
      } as Generated.CreateJobRevisionEndpoint_Input,
    });

    return this;
  }
}

export class RapidataJob extends BaseEntity {
  readonly jobDetailsPage: string;

  completedAt?: Date;

  pipelineId?: string;

  constructor(
    readonly id: string,
    readonly name: string,
    readonly audienceId: string,
    context: ClientContext,
    options?: {
      completedAt?: Date;
      pipelineId?: string;
    },
  ) {
    super(context);
    this.completedAt = options?.completedAt;
    this.pipelineId = options?.pipelineId;
    this.jobDetailsPage = `${this.context.appBaseUrl}/audiences/${this.audienceId}/job/${this.id}`;
  }

  async getStatus() {
    await this.context.ready;
    const job = await this.context.api.job.getJob({ jobId: this.id });
    this.completedAt = maybeDate(job.completedAt);
    this.pipelineId = job.pipelineId;
    return job.status;
  }

  async getResults() {
    await this.context.ready;
    while (!["Completed", "Failed"].includes(await this.getStatus())) {
      await sleep(1_000);
    }

    const resultsBlob = await this.context.api.job.getJobDownloadResults({ jobId: this.id });
    return new RapidataResults(await blobToJson<Record<string, unknown>>(resultsBlob));
  }

  async displayProgressBar(refreshRate = 5) {
    if (refreshRate < 1) {
      throw new Error("refreshRate must be at least 1.");
    }

    while (true) {
      const progress = await this.getWorkflowProgress();
      const status = await this.getStatus();
      managedPrint(`Job '${this.name}': ${progress?.completionPercentage ?? 0}% (${status})`);
      if (!progress || progress.completionPercentage >= 100 || ["Completed", "Failed"].includes(status)) {
        return;
      }
      await sleep(refreshRate * 1_000);
    }
  }

  async view() {
    await this.openUrl(this.jobDetailsPage);
  }

  private async getWorkflowProgress() {
    if (!this.pipelineId) {
      const job = await this.context.api.job.getJob({ jobId: this.id });
      this.pipelineId = job.pipelineId;
    }

    if (!this.pipelineId) {
      return undefined;
    }

    try {
      const pipeline = await this.context.api.pipeline.getPipeline({ pipelineId: this.pipelineId });
      const workflowId = extractPipelineArtifactIds(pipeline).workflowId;
      return workflowId
        ? this.context.api.workflow.getWorkflowProgress({ workflowId })
        : undefined;
    } catch {
      return undefined;
    }
  }
}

export class RapidataAudience extends BaseEntity {
  readonly id: string;

  private _name: string;

  private _filters: Generated.IAudienceFilter[];

  constructor(
    id: string,
    name: string,
    filters: Generated.IAudienceFilter[],
    context: ClientContext,
  ) {
    super(context);
    this.id = id;
    this._name = name;
    this._filters = filters;
  }

  get name() {
    return this._name;
  }

  get filters() {
    return this._filters;
  }

  async updateFilters(filters: RapidataFilter[]) {
    await this.context.ready;
    const mapped = filters.map((filter) => filter.toAudienceModel());
    await this.context.api.audience.patchAudience({
      audienceId: this.id,
      requestBody: { filters: mapped },
    });
    this._filters = mapped;
    return this;
  }

  async updateName(name: string) {
    await this.context.ready;
    await this.context.api.audience.patchAudience({
      audienceId: this.id,
      requestBody: { name },
    });
    this._name = name;
    return this;
  }

  async assignJob(jobDefinition: RapidataJobDefinition | string, options?: { name?: string; priority?: number; revisionNumber?: number }) {
    await this.context.ready;
    const result = await this.context.api.job.postJob({
      requestBody: {
        jobDefinitionId: typeof jobDefinition === "string" ? jobDefinition : jobDefinition.id,
        audienceId: this.id,
        name: options?.name ?? null,
        priority: options?.priority,
        revisionNumber: options?.revisionNumber,
      },
    });

    const job = await this.context.api.job.getJob({ jobId: result.jobId });
    return new RapidataJob(job.jobId, job.name, job.audienceId, this.context, {
      completedAt: maybeDate(job.completedAt),
      pipelineId: job.pipelineId,
    });
  }

  async addClassificationExample(
    instruction: string,
    answerOptions: string[],
    datapoint: string,
    truth: string,
    dataType: DataType = "media",
    context?: string,
    mediaContext?: string,
    explanation?: string,
  ) {
    await this.context.ready;
    const asset = await this.context.uploader.createAssetInput(datapoint, dataType);
    const contextAsset = mediaContext ? await this.context.uploader.createAssetInput(mediaContext, "media") : undefined;
    const requestBody = {
      asset,
      payload: {
        _t: "ClassifyExamplePayload",
        title: instruction,
        categories: answerOptions.map((option) => ({ label: option, value: option })),
      },
      truth: {
        _t: "ClassifyExampleTruth",
        correctCategory: truth,
      },
      randomCorrectProbability: answerOptions.length === 0 ? 0 : 1 / answerOptions.length,
      explanation,
      context,
      contextAsset,
    } as AddExampleRequest;
    await this.context.api.examples.postAudienceExample({ audienceId: this.id, requestBody });
    return this;
  }

  async addCompareExample(
    instruction: string,
    truth: string,
    datapoint: string[],
    dataType: DataType = "media",
    context?: string,
    mediaContext?: string,
    explanation?: string,
  ) {
    await this.context.ready;
    const asset = await this.context.uploader.createAssetInput(datapoint, dataType);
    const contextAsset = mediaContext ? await this.context.uploader.createAssetInput(mediaContext, "media") : undefined;
    const requestBody = {
      asset,
      payload: {
        _t: "CompareExamplePayload",
        criteria: instruction,
      },
      truth: {
        _t: "CompareExampleTruth",
        winnerId: truth,
      },
      randomCorrectProbability: datapoint.length === 0 ? 0 : 1 / datapoint.length,
      explanation,
      context,
      contextAsset,
    } as AddExampleRequest;
    await this.context.api.examples.postAudienceExample({ audienceId: this.id, requestBody });
    return this;
  }

  async findJobs(name = "", amount = 10) {
    await this.context.ready;
    const result = await this.context.api.audience.getAudienceJobs({ audienceId: this.id });
    return result.items
      .filter((job: Generated.QueryJobsResult) => job.name.toLowerCase().includes(name.toLowerCase()))
      .slice(0, amount)
      .map((job: Generated.QueryJobsResult) => new RapidataJob(job.jobId, job.name, job.audienceId, this.context, {
        pipelineId: job.pipelineId,
      }));
  }
}

export class RapidataValidationSet extends BaseEntity {
  readonly validationSetDetailsPage: string;

  constructor(
    readonly id: string,
    readonly name: string,
    readonly dimensions: string[],
    context: ClientContext,
  ) {
    super(context);
    this.validationSetDetailsPage = `${this.context.appBaseUrl}/validation-set/detail/${this.id}`;
  }

  async addRapid(rapid: ValidationRapid) {
    await this.context.ready;
    const asset = await this.context.uploader.createAssetInput(rapid.asset, rapid.dataType);
    const contextAsset = rapid.mediaContext
      ? await this.context.uploader.createAssetInput(rapid.mediaContext, "media")
      : undefined;

    await this.context.api.validation.postValidationSetRapid({
      validationSetId: this.id,
      requestBody: {
        asset,
        payload: rapid.payload,
        truth: rapid.truth,
        randomCorrectProbability: rapid.randomCorrectProbability,
        explanation: rapid.explanation,
        context: rapid.context,
        contextAsset,
        featureFlags: rapid.settings?.map((setting) => setting.toFeatureFlagModel()),
      } as Generated.AddValidationRapidModel,
    });
    return this;
  }

  async updateDimensions(dimensions: string[]) {
    await this.context.ready;
    await this.context.api.validation.patchValidationSet({
      validationSetId: this.id,
      requestBody: { dimensions },
    });
    this.dimensions.splice(0, this.dimensions.length, ...dimensions);
    return this;
  }

  async updateShouldAlert(shouldAlert: boolean) {
    await this.context.ready;
    await this.context.api.validation.patchValidationSet({
      validationSetId: this.id,
      requestBody: { shouldAlert },
    });
    return this;
  }

  async updateCanBeFlagged(canBeFlagged: boolean) {
    await this.context.ready;
    await this.context.api.validation.patchValidationSet({
      validationSetId: this.id,
      requestBody: { isFlagOverruled: !canBeFlagged },
    });
    return this;
  }

  async view() {
    await this.openUrl(this.validationSetDetailsPage);
  }

  async delete() {
    await this.context.ready;
    await this.context.api.validation.deleteValidationSet({ validationSetId: this.id });
  }
}

export class RapidataFlowItem extends BaseEntity {
  constructor(
    readonly id: string,
    readonly flowId: string,
    context: ClientContext,
  ) {
    super(context);
  }

  async getResults() {
    await this.context.ready;
    return this.context.api.rankingFlowItem.getFlowRankingItemResults({ flowItemId: this.id });
  }

  async stop() {
    await this.context.ready;
    await this.context.api.flowItem.postFlowItemStop({ flowItemId: this.id });
  }
}

export class RapidataFlow extends BaseEntity {
  constructor(
    readonly id: string,
    readonly name: string,
    context: ClientContext,
  ) {
    super(context);
  }

  async createNewFlowBatch(
    datapoints: string[] | string[][],
    contextText?: string,
    dataType: DataType = "media",
    privateMetadata?: Array<Record<string, string>>,
    acceptFailedUploads = false,
    timeToLive?: number,
  ) {
    await this.context.ready;
    const datapointModels = mapDatapoints({
      datapoints,
      dataType,
      privateMetadata,
      multiAsset: Array.isArray(datapoints[0]),
    });

    const dataset = await createDatasetWithDatapoints(this.context, `${this.name}_dataset`, datapointModels, {
      acceptFailedUploads,
    });

    const result = await this.context.api.rankingFlowItem.postFlowRankingItem({
      flowId: this.id,
      requestBody: {
        datasetId: dataset.id,
        context: contextText,
        timeToLiveInSeconds: timeToLive,
      },
    });

    return new RapidataFlowItem(result.flowItemId, this.id, this.context);
  }

  async getFlowItems() {
    await this.context.ready;
    const result = await this.context.api.rankingFlowItem.getFlowRankingItem({ flowId: this.id });
    return result.items.map((item: Generated.QueryFlowItemsEndpoint_Output) => new RapidataFlowItem(item.id, this.id, this.context));
  }

  async updateConfig(
    instruction?: string,
    startingElo?: number,
    kFactor?: number,
    scalingFactor?: number,
  ) {
    await this.context.ready;
    await this.context.api.rankingFlow.patchFlowRankingConfig({
      flowId: this.id,
      requestBody: {
        criteria: instruction,
        startingElo,
        kFactor,
        scalingFactor,
      } as Generated.UpdateConfigEndpoint_Input,
    });
    return this;
  }

  async delete() {
    await this.context.ready;
    await this.context.api.flow.deleteFlow({ flowId: this.id });
  }
}

export class RapidataOrderManager {
  constructor(private readonly context: ClientContext) {}

  async createClassificationOrder(
    name: string,
    instruction: string,
    answerOptions: string[],
    datapoints: string[],
    dataType: DataType = "media",
    responsesPerDatapoint = 10,
    contexts?: string[],
    mediaContexts?: string[],
    validationSetId?: string,
    confidenceThreshold?: number,
    quorumThreshold?: number,
    filters?: RapidataFilter[],
    settings?: RapidataSetting[],
    selections?: RapidataSelection[],
    privateMetadata?: Array<Record<string, string>>,
  ) {
    const datapointModels = mapDatapoints({
      datapoints,
      dataType,
      contexts,
      mediaContexts,
      privateMetadata,
    });

    return createOrder(this.context, {
      name,
      workflow: new ClassifyWorkflow(instruction, answerOptions),
      datapoints: datapointModels,
      responsesPerDatapoint,
      validationSetId,
      confidenceThreshold,
      quorumThreshold,
      filters,
      settings,
      selections,
    });
  }

  async createCompareOrder(
    name: string,
    instruction: string,
    datapoints: string[][],
    dataType: DataType = "media",
    responsesPerDatapoint = 10,
    contexts?: string[],
    mediaContexts?: string[],
    abNames?: string[],
    validationSetId?: string,
    confidenceThreshold?: number,
    quorumThreshold?: number,
    filters?: RapidataFilter[],
    settings?: RapidataSetting[],
    selections?: RapidataSelection[],
    privateMetadata?: Array<Record<string, string>>,
  ) {
    const datapointModels = mapDatapoints({
      datapoints,
      dataType,
      contexts,
      mediaContexts,
      privateMetadata,
      multiAsset: true,
    });

    return createOrder(this.context, {
      name,
      workflow: new CompareWorkflow(instruction, abNames),
      datapoints: datapointModels,
      responsesPerDatapoint,
      validationSetId,
      confidenceThreshold,
      quorumThreshold,
      filters,
      settings,
      selections,
    });
  }

  async createRankingOrder(
    name: string,
    instruction: string,
    datapoints: string[][],
    comparisonBudgetPerRanking: number,
    responsesPerComparison = 1,
    dataType: DataType = "media",
    randomComparisonsRatio = 0.5,
    contexts?: string[],
    mediaContexts?: string[],
    validationSetId?: string,
    filters?: RapidataFilter[],
    settings?: RapidataSetting[],
    selections?: RapidataSelection[],
  ) {
    if (contexts && contexts.length !== datapoints.length) {
      throw new Error("Number of contexts must match the number of ranking groups.");
    }
    if (mediaContexts && mediaContexts.length !== datapoints.length) {
      throw new Error("Number of mediaContexts must match the number of ranking groups.");
    }

    const rankingDatapoints = datapoints.flatMap((group, groupIndex) => {
      if (group.length < 2) {
        throw new Error("Each ranking group must contain at least two datapoints.");
      }

      if (new Set(group).size !== group.length) {
        throw new Error("Each ranking group must contain unique datapoints.");
      }

      return group.map((asset) => new Datapoint({
        asset,
        dataType,
        context: contexts?.[groupIndex],
        mediaContext: mediaContexts?.[groupIndex],
        group: String(groupIndex),
      }));
    });

    const mediaContextsByGroup = mediaContexts
      ? Object.fromEntries(
        await Promise.all(mediaContexts.map(async (item, index) => [
          String(index),
          await this.context.uploader.createAssetInput(item, "media"),
        ])),
      )
      : undefined;

    return createOrder(this.context, {
      name,
      workflow: new MultiRankingWorkflow(
        instruction,
        comparisonBudgetPerRanking,
        randomComparisonsRatio,
        1200,
        40,
        400,
        contexts ? Object.fromEntries(contexts.map((value, index) => [String(index), value])) : undefined,
        mediaContextsByGroup,
      ),
      datapoints: rankingDatapoints,
      responsesPerDatapoint: responsesPerComparison,
      validationSetId,
      filters,
      settings,
      selections,
    });
  }

  async createFreeTextOrder(
    name: string,
    instruction: string,
    datapoints: string[],
    dataType: DataType = "media",
    responsesPerDatapoint = 10,
    contexts?: string[],
    mediaContexts?: string[],
    filters?: RapidataFilter[],
    settings?: RapidataSetting[],
    selections?: RapidataSelection[],
    privateMetadata?: Array<Record<string, string>>,
  ) {
    const datapointModels = mapDatapoints({
      datapoints,
      dataType,
      contexts,
      mediaContexts,
      privateMetadata,
    });

    return createOrder(this.context, {
      name,
      workflow: new FreeTextWorkflow(instruction),
      datapoints: datapointModels,
      responsesPerDatapoint,
      filters,
      settings,
      selections,
    });
  }

  async createSelectWordsOrder(
    name: string,
    instruction: string,
    datapoints: string[],
    sentences: string[],
    responsesPerDatapoint = 10,
    mediaContexts?: string[],
    validationSetId?: string,
    filters?: RapidataFilter[],
    settings?: RapidataSetting[],
    selections?: RapidataSelection[],
    privateMetadata?: Array<Record<string, string>>,
  ) {
    const datapointModels = mapDatapoints({
      datapoints,
      dataType: "media",
      mediaContexts,
      sentences,
      privateMetadata,
    });

    return createOrder(this.context, {
      name,
      workflow: new SelectWordsWorkflow(instruction),
      datapoints: datapointModels,
      responsesPerDatapoint,
      validationSetId,
      filters,
      settings,
      selections,
    });
  }

  async createLocateOrder(
    name: string,
    instruction: string,
    datapoints: string[],
    responsesPerDatapoint = 10,
    contexts?: string[],
    mediaContexts?: string[],
    validationSetId?: string,
    filters?: RapidataFilter[],
    settings?: RapidataSetting[],
    selections?: RapidataSelection[],
    privateMetadata?: Array<Record<string, string>>,
  ) {
    const datapointModels = mapDatapoints({
      datapoints,
      dataType: "media",
      contexts,
      mediaContexts,
      privateMetadata,
    });

    return createOrder(this.context, {
      name,
      workflow: new LocateWorkflow(instruction),
      datapoints: datapointModels,
      responsesPerDatapoint,
      validationSetId,
      filters,
      settings,
      selections,
    });
  }

  async createDrawOrder(
    name: string,
    instruction: string,
    datapoints: string[],
    responsesPerDatapoint = 10,
    contexts?: string[],
    mediaContexts?: string[],
    validationSetId?: string,
    filters?: RapidataFilter[],
    settings?: RapidataSetting[],
    selections?: RapidataSelection[],
    privateMetadata?: Array<Record<string, string>>,
  ) {
    const datapointModels = mapDatapoints({
      datapoints,
      dataType: "media",
      contexts,
      mediaContexts,
      privateMetadata,
    });

    return createOrder(this.context, {
      name,
      workflow: new DrawWorkflow(instruction),
      datapoints: datapointModels,
      responsesPerDatapoint,
      validationSetId,
      filters,
      settings,
      selections,
    });
  }

  async createTimestampOrder(
    name: string,
    instruction: string,
    datapoints: string[],
    responsesPerDatapoint = 10,
    contexts?: string[],
    mediaContexts?: string[],
    validationSetId?: string,
    filters?: RapidataFilter[],
    settings?: RapidataSetting[],
    selections?: RapidataSelection[],
    privateMetadata?: Array<Record<string, string>>,
  ) {
    const datapointModels = mapDatapoints({
      datapoints,
      dataType: "media",
      contexts,
      mediaContexts,
      privateMetadata,
    });

    return createOrder(this.context, {
      name,
      workflow: new TimestampWorkflow(instruction),
      datapoints: datapointModels,
      responsesPerDatapoint,
      validationSetId,
      filters,
      settings,
      selections,
    });
  }

  async getOrderById(orderId: string) {
    await this.context.ready;
    const order = await this.context.api.order.getOrder({ orderId });
    return new RapidataOrder(orderId, order.orderName, this.context, {
      createdAt: maybeDate(order.orderDate),
      pipelineId: order.pipelineId,
    });
  }

  async findOrders(name = "", amount = 10) {
    await this.context.ready;
    const result = await this.context.api.order.getOrders({
      page: 1,
      pageSize: Math.max(amount, 1),
      orderName: name ? { contains: name } : undefined,
    });

    return result.items.slice(0, amount).map((order: Generated.QueryOrdersEndpoint_Output) => new RapidataOrder(order.id, order.orderName, this.context, {
      createdAt: maybeDate(order.orderDate),
      pipelineId: order.pipelineId,
    }));
  }
}

export class RapidataAudienceManager {
  constructor(private readonly context: ClientContext) {}

  async createAudience(name: string, filters?: RapidataFilter[]) {
    await this.context.ready;
    const requestBody: Generated.CreateAudienceRequest = {
      name,
      filters: filters?.map((filter) => filter.toAudienceModel()),
    };
    const created = await this.context.api.audience.postAudience({ requestBody });
    return new RapidataAudience(created.id, name, requestBody.filters ?? [], this.context);
  }

  async getAudienceById(audienceId: string) {
    await this.context.ready;
    const audience = await this.context.api.audience.getAudience({ audienceId });
    return new RapidataAudience(audience.id, audience.name, audience.filters, this.context);
  }

  async findAudiences(name = "", amount = 10) {
    await this.context.ready;
    const result = await this.context.api.audience.getAudiences({
      request: {
        page: 1,
        pageSize: Math.max(amount, 1),
        filter: name ? { name: { contains: name } } : undefined,
      },
    });

    return result.items.slice(0, amount).map((audience: Generated.QueryAudiencesResult) => new RapidataAudience(
      audience.id,
      audience.name,
      audience.filters,
      this.context,
    ));
  }
}

export class RapidataJobManager {
  constructor(private readonly context: ClientContext) {}

  async createClassificationJobDefinition(
    name: string,
    instruction: string,
    answerOptions: string[],
    datapoints: string[],
    dataType: DataType = "media",
    responsesPerDatapoint = 10,
    contexts?: string[],
    mediaContexts?: string[],
    confidenceThreshold?: number,
    quorumThreshold?: number,
    settings?: RapidataSetting[],
    privateMetadata?: Array<Record<string, string>>,
  ) {
    const mappedDatapoints = mapDatapoints({
      datapoints,
      dataType,
      contexts,
      mediaContexts,
      privateMetadata,
    });

    return createJobDefinition(this.context, {
      name,
      workflow: new ClassifyWorkflow(instruction, answerOptions),
      datapoints: mappedDatapoints,
      responsesPerDatapoint,
      confidenceThreshold,
      quorumThreshold,
      settings,
    });
  }

  async createCompareJobDefinition(
    name: string,
    instruction: string,
    datapoints: string[][],
    dataType: DataType = "media",
    responsesPerDatapoint = 10,
    contexts?: string[],
    mediaContexts?: string[],
    abNames?: string[],
    confidenceThreshold?: number,
    quorumThreshold?: number,
    settings?: RapidataSetting[],
    privateMetadata?: Array<Record<string, string>>,
  ) {
    const mappedDatapoints = mapDatapoints({
      datapoints,
      dataType,
      contexts,
      mediaContexts,
      privateMetadata,
      multiAsset: true,
    });

    return createJobDefinition(this.context, {
      name,
      workflow: new CompareWorkflow(instruction, abNames),
      datapoints: mappedDatapoints,
      responsesPerDatapoint,
      confidenceThreshold,
      quorumThreshold,
      settings,
    });
  }

  async getJobDefinitionById(jobDefinitionId: string) {
    await this.context.ready;
    const definition = await this.context.api.job.getJobDefinition({ definitionId: jobDefinitionId });
    return new RapidataJobDefinition(definition.definitionId, definition.name, this.context);
  }

  async findJobDefinitions(name = "", amount = 10) {
    await this.context.ready;
    const result = await this.context.api.job.getJobDefinitions({
      request: {
        page: 1,
        pageSize: Math.max(amount, 1),
        filter: name ? { name: { contains: name } } : undefined,
      },
    });

    return result.items.slice(0, amount).map((definition: Generated.QueryJobDefinitionsResult) => new RapidataJobDefinition(
      definition.definitionId,
      definition.name,
      this.context,
    ));
  }

  async getJobById(jobId: string) {
    await this.context.ready;
    const job = await this.context.api.job.getJob({ jobId });
    return new RapidataJob(job.jobId, job.name, job.audienceId, this.context, {
      completedAt: maybeDate(job.completedAt),
      pipelineId: job.pipelineId,
    });
  }

  async findJobs(name = "", amount = 10) {
    await this.context.ready;
    const result = await this.context.api.job.getJobs({
      request: {
        page: 1,
        pageSize: Math.max(amount, 1),
        filter: name ? { name: { contains: name } } : undefined,
      },
    });

    return result.items.slice(0, amount).map((job: Generated.QueryJobsResult) => new RapidataJob(
      job.jobId,
      job.name,
      job.audienceId,
      this.context,
      { pipelineId: job.pipelineId },
    ));
  }
}

export class ValidationSetManager {
  readonly rapids = new RapidsManager();

  constructor(private readonly context: ClientContext) {}

  async createClassificationSet(
    name: string,
    instruction: string,
    answerOptions: string[],
    datapoints: string[],
    truths: string[][],
    dataType: DataType = "media",
    contexts?: string[],
    mediaContexts?: string[],
    explanations?: string[],
    dimensions: string[] = [],
  ) {
    const rapids = datapoints.map((datapoint, index) => this.rapids.classificationRapid({
      instruction,
      answerOptions,
      datapoint,
      truths: truths[index] ?? [],
      dataType,
      context: contexts?.[index],
      mediaContext: mediaContexts?.[index],
      explanation: explanations?.[index],
    }));

    return this.createMixedSet(name, rapids, dimensions);
  }

  async createCompareSet(
    name: string,
    instruction: string,
    datapoints: string[][],
    truths: string[],
    dataType: DataType = "media",
    contexts?: string[],
    mediaContexts?: string[],
    explanation?: string,
    dimensions: string[] = [],
  ) {
    const rapids = datapoints.map((datapoint, index) => this.rapids.compareRapid({
      instruction,
      truth: truths[index]!,
      datapoint,
      dataType,
      context: contexts?.[index],
      mediaContext: mediaContexts?.[index],
      explanation,
    }));

    return this.createMixedSet(name, rapids, dimensions);
  }

  async createSelectWordsSet(
    name: string,
    instruction: string,
    truths: number[][],
    datapoints: string[],
    sentences: string[],
    requiredPrecision = 1,
    requiredCompleteness = 1,
    explanation?: string,
    dimensions: string[] = [],
  ) {
    const rapids = datapoints.map((datapoint, index) => this.rapids.selectWordsRapid({
      instruction,
      truths: truths[index] ?? [],
      datapoint,
      sentence: sentences[index]!,
      requiredPrecision,
      requiredCompleteness,
      explanation,
    }));

    return this.createMixedSet(name, rapids, dimensions);
  }

  async createLocateSet(
    name: string,
    instruction: string,
    truths: Box[][],
    datapoints: string[],
    contexts?: string[],
    mediaContexts?: string[],
    explanation?: string,
    dimensions: string[] = [],
  ) {
    const rapids = datapoints.map((datapoint, index) => this.rapids.locateRapid({
      instruction,
      truths: truths[index] ?? [],
      datapoint,
      context: contexts?.[index],
      mediaContext: mediaContexts?.[index],
      explanation,
    }));

    return this.createMixedSet(name, rapids, dimensions);
  }

  async createDrawSet(
    name: string,
    instruction: string,
    truths: Box[][],
    datapoints: string[],
    contexts?: string[],
    mediaContexts?: string[],
    explanation?: string,
    dimensions: string[] = [],
  ) {
    const rapids = datapoints.map((datapoint, index) => this.rapids.drawRapid({
      instruction,
      truths: truths[index] ?? [],
      datapoint,
      context: contexts?.[index],
      mediaContext: mediaContexts?.[index],
      explanation,
    }));

    return this.createMixedSet(name, rapids, dimensions);
  }

  async createTimestampSet(
    name: string,
    instruction: string,
    truths: Array<Array<[number, number]>>,
    datapoints: string[],
    contexts?: string[],
    mediaContexts?: string[],
    explanation?: string,
    dimensions: string[] = [],
  ) {
    const rapids = datapoints.map((datapoint, index) => this.rapids.timestampRapid({
      instruction,
      truths: truths[index] ?? [],
      datapoint,
      context: contexts?.[index],
      mediaContext: mediaContexts?.[index],
      explanation,
    }));

    return this.createMixedSet(name, rapids, dimensions);
  }

  async createMixedSet(name: string, rapids: ValidationRapid[], dimensions: string[] = []) {
    await this.context.ready;
    const created = await this.context.api.validation.postValidationSet({
      requestBody: { name },
    });

    const validationSet = new RapidataValidationSet(created.validationSetId, name, [...dimensions], this.context);
    if (dimensions.length > 0) {
      await validationSet.updateDimensions(dimensions);
    }

    for (const rapid of rapids) {
      await validationSet.addRapid(rapid);
    }

    return validationSet;
  }

  async getValidationSetById(validationSetId: string) {
    await this.context.ready;
    const validationSet = await this.context.api.validation.getValidationSet({ validationSetId });
    return new RapidataValidationSet(validationSet.id, validationSet.name, validationSet.dimensions, this.context);
  }

  async findValidationSets(name = "", amount = 10) {
    await this.context.ready;
    const result = await this.context.api.validation.getValidationSets({
      model: {
        page: 1,
        pageSize: Math.max(amount, 1),
        filter: name ? { name: { contains: name } } : undefined,
      },
    });

    return result.items.slice(0, amount).map((validationSet: Generated.ValidationSetModel) => new RapidataValidationSet(
      validationSet.id,
      validationSet.name,
      validationSet.dimensions ?? [],
      this.context,
    ));
  }
}

export class RapidataFlowManager {
  constructor(private readonly context: ClientContext) {}

  async createRankingFlow(
    name: string,
    instruction: string,
    maxResponseThreshold = 100,
    minResponseThreshold?: number,
    validationSetId?: string,
    settings?: RapidataSetting[],
  ) {
    await this.context.ready;
    const result = await this.context.api.rankingFlow.postFlowRanking({
      requestBody: {
        name,
        criteria: instruction,
        maxResponses: maxResponseThreshold,
        minResponses: minResponseThreshold,
        validationSetId,
        featureFlags: settings?.map((setting) => setting.toFeatureFlag()),
      },
    });

    return new RapidataFlow(result.flowId, name, this.context);
  }

  async getFlowById(flowId: string) {
    await this.context.ready;
    const flow = await this.context.api.flow.getFlow({ flowId });
    return new RapidataFlow(flow.id, flow.name, this.context);
  }

  async findFlows(amount = 10) {
    await this.context.ready;
    const result = await this.context.api.flow.getFlows({
      request: {
        page: 1,
        pageSize: Math.max(amount, 1),
      },
    });

    return result.items.slice(0, amount).map((flow: Generated.QueryFlowsEndpoint_Output) => new RapidataFlow(flow.id, flow.name, this.context));
  }
}

export class RapidataBenchmarkManager {
  constructor(readonly api: Pick<RapidataApiClient, "benchmark" | "leaderboard">) {}
}

async function createDatasetWithDatapoints(
  context: ClientContext,
  name: string,
  datapoints: Datapoint[],
  options?: {
    datasetId?: string;
    acceptFailedUploads?: boolean;
    orderId?: string;
    jobDefinitionId?: string;
  },
) {
  const datasetId = options?.datasetId
    ?? (await context.api.dataset.postDataset({ requestBody: { name } })).datasetId;

  if (!datasetId) {
    throw new RapidataError(`Failed to create dataset '${name}'.`);
  }

  const failedUploads: Array<FailedUpload<Datapoint>> = [];
  for (let index = 0; index < datapoints.length; index += 1) {
    const datapoint = datapoints[index]!;
    try {
      const asset = await context.uploader.createAssetInput(datapoint.asset, datapoint.dataType);
      const contextAsset = datapoint.mediaContext
        ? await context.uploader.createAssetInput(datapoint.mediaContext, "media")
        : undefined;

      await context.api.dataset.postDatasetDatapoint({
        datasetId,
        requestBody: {
          asset,
          context: datapoint.context,
          contextAsset,
          sortIndex: index,
          group: datapoint.group,
          transcription: datapoint.sentence,
          privateMetadata: datapoint.privateMetadata,
        },
      });
    } catch (error) {
      failedUploads.push(FailedUpload.fromException(datapoint, error));
    }
  }

  if (failedUploads.length > 0 && !options?.acceptFailedUploads) {
    throw new FailedUploadException(
      `Failed to upload ${failedUploads.length} datapoint(s).`,
      {
        failedUploads,
        datasetId,
        orderId: options?.orderId,
        jobDefinitionId: options?.jobDefinitionId,
      },
    );
  }

  return { id: datasetId, failedUploads };
}

function createReferee(
  responsesPerDatapoint: number,
  confidenceThreshold?: number,
  quorumThreshold?: number,
) {
  if (confidenceThreshold !== undefined && quorumThreshold !== undefined) {
    throw new Error("Cannot set both confidenceThreshold and quorumThreshold.");
  }

  if (quorumThreshold !== undefined) {
    return new QuorumReferee(quorumThreshold, responsesPerDatapoint);
  }

  if (confidenceThreshold !== undefined) {
    return new EarlyStoppingReferee(confidenceThreshold, responsesPerDatapoint);
  }

  return new NaiveReferee(responsesPerDatapoint);
}

async function createOrder(context: ClientContext, options: CreateOrderBaseOptions) {
  await context.ready;

  const referee = createReferee(
    options.responsesPerDatapoint,
    options.confidenceThreshold,
    options.quorumThreshold,
  );

  const created = await context.api.order.postOrder({
    requestBody: {
      orderName: options.name,
      workflow: options.workflow.toModel(),
      referee: referee.toModel(),
      userFilters: options.filters?.map((filter) => filter.toModel()),
      validationSetId: options.validationSetId && !options.selections?.length
        ? options.validationSetId
        : undefined,
      featureFlags: options.settings?.map((setting) => setting.toFeatureFlagModel()),
      selections: options.selections?.map((selection) => selection.toModel()),
    } as Generated.CreateOrderModel,
  });

  const order = new RapidataOrder(created.orderId, options.name, context, {
    pipelineId: created.pipelineId,
    campaignId: created.campaignId ?? undefined,
  });

  if (!created.datasetId) {
    return order;
  }

  await createDatasetWithDatapoints(context, `${options.name}_dataset`, options.datapoints, {
    datasetId: created.datasetId,
    orderId: created.orderId,
  });

  try {
    await context.api.order.postOrderPreview({
      orderId: created.orderId,
      requestBody: { ignoreFailedDatapoints: true },
    });
  } catch (error) {
    logger.debug("Failed to switch order %s into preview: %s", created.orderId, error);
  }

  return order;
}

async function createJobDefinition(
  context: ClientContext,
  options: {
    name: string;
    workflow: Workflow;
    datapoints: Datapoint[];
    responsesPerDatapoint: number;
    confidenceThreshold?: number;
    quorumThreshold?: number;
    settings?: RapidataSetting[];
  },
) {
  await context.ready;
  const dataset = await createDatasetWithDatapoints(context, `${options.name}_dataset`, options.datapoints);
  const referee = createReferee(
    options.responsesPerDatapoint,
    options.confidenceThreshold,
    options.quorumThreshold,
  );

  const created = await context.api.job.postJobDefinition({
    requestBody: {
      definitionName: options.name,
      workflow: options.workflow.toModel(),
      referee: referee.toModel(),
      datasetId: dataset.id,
      featureFlags: options.settings?.map((setting) => setting.toFeatureFlag()),
    } as Generated.CreateJobDefinitionEndpoint_Input,
  });

  return new RapidataJobDefinition(created.definitionId, options.name, context);
}

type AddExampleRequest = Generated.AddExampleToAudienceEndpoint_Input & Record<string, unknown>;

export class RapidataClient {
  readonly api: RapidataApiClient;

  readonly order: RapidataOrderManager;

  readonly validation: ValidationSetManager;

  readonly flow: RapidataFlowManager;

  readonly job: RapidataJobManager;

  readonly mri: RapidataBenchmarkManager;

  readonly audience: RapidataAudienceManager;

  private readonly uploader: AssetUploader;

  private readonly context: ClientContext;

  readonly ready: Promise<void>;

  constructor(options: RapidataClientOptions = {}) {
    tracer.setSessionId(randomUUID().replaceAll("-", ""));

    const environment = normalizeEnvironment(options.environment ?? DEFAULT_ENVIRONMENT);
    if (environment !== DEFAULT_ENVIRONMENT) {
      rapidataConfig.logging.enableOtlp = false;
    }

    this.api = new RapidataApiClient(options);
    this.uploader = new AssetUploader(this.api);
    this.context = {
      api: this.api,
      uploader: this.uploader,
      ready: Promise.resolve(),
      appBaseUrl: `https://app.${environment}`,
      apiBaseUrl: `https://api.${environment}`,
    };
    this.ready = this.initialize();
    this.context.ready = this.ready;

    this.order = new RapidataOrderManager(this.context);
    this.validation = new ValidationSetManager(this.context);
    this.flow = new RapidataFlowManager(this.context);
    this.job = new RapidataJobManager(this.context);
    this.mri = new RapidataBenchmarkManager(this.api);
    this.audience = new RapidataAudienceManager(this.context);
  }

  async resetCredentials() {
    await this.api.resetCredentials();
  }

  clearAllCaches() {
    this.uploader.clearCache();
  }

  private async initialize() {
    await this.checkVersion();
    await this.checkBetaFeatures();
  }

  private async checkBetaFeatures() {
    try {
      const result = await this.api.getUserInfo();
      const clientId = typeof result.sub === "string" ? result.sub : undefined;
      const email = typeof result.email === "string" ? result.email : undefined;
      if (clientId || email) {
        tracer.setUserInfo({ clientId, email });
      }

      const role = result.role;
      const roles = Array.isArray(role) ? role : typeof role === "string" ? [role] : [];
      if (roles.includes("Admin")) {
        rapidataConfig.enableBetaFeatures = true;
      }
    } catch (error) {
      logger.debug("Failed to check beta features: %s", error);
    }
  }

  private async checkVersion() {
    try {
      const response = await fetch(
        `https://api.github.com/repos/${LATEST_RELEASE_REPOSITORY}/releases/latest`,
        {
          headers: { Accept: "application/vnd.github+json" },
          signal: AbortSignal.timeout(1_000),
        },
      );
      if (!response.ok) {
        return;
      }

      const payload = await response.json() as { tag_name?: string };
      const latestVersion = payload.tag_name?.replace(/^v/, "");
      if (latestVersion && compareVersions(latestVersion, SDK_VERSION) > 0) {
        managedPrint(`A new version of the Rapidata SDK is available: ${latestVersion}\nYour current version is: ${SDK_VERSION}`);
      }
    } catch (error) {
      logger.debug("Failed to check for updates: %s", error);
    }
  }
}

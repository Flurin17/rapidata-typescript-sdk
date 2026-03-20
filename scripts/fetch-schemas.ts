import { mkdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const SERVICES = [
  "asset",
  "audience",
  "order",
  "dataset",
  "pipeline",
  "identity",
  "rapid",
  "campaign",
  "validation",
  "workflow",
  "leaderboard",
  "flow",
] as const;

type JsonObject = Record<string, unknown>;

const schemaDir = path.resolve("openapi/schemas");
const joinedSpecPath = path.join(schemaDir, "rapidata.openapi.json");
const filteredSpecPath = path.join(schemaDir, "rapidata.filtered.openapi.json");

function getEnvironment() {
  const envIndex = process.argv.findIndex(
    (arg) => arg === "--environment" || arg === "--env" || arg === "-e",
  );
  const environment = envIndex >= 0 ? process.argv[envIndex + 1] : "prod";

  if (environment !== "prod" && environment !== "local") {
    throw new Error(`Unknown environment "${environment}". Expected "prod" or "local".`);
  }

  return environment;
}

function getBaseHost(environment: string) {
  return environment === "local" ? "api.rapidata.dev" : "api.rabbitdata.ch";
}

async function fetchJson(url: string) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.status} ${response.statusText}`);
  }

  return response.json() as Promise<Record<string, unknown>>;
}

function removeDeprecatedOperations(spec: Record<string, unknown>) {
  const pathsValue = spec.paths;
  if (!pathsValue || typeof pathsValue !== "object") {
    return spec;
  }

  const filteredPaths = Object.fromEntries(
    Object.entries(pathsValue as Record<string, Record<string, unknown>>)
      .map(([route, operations]) => {
        const filteredOperations = Object.fromEntries(
          Object.entries(operations).filter(([, operation]) => {
            if (!operation || typeof operation !== "object") {
              return true;
            }

            const typedOperation = operation as { deprecated?: boolean };
            return typedOperation.deprecated !== true;
          }),
        );

        return [route, filteredOperations];
      })
      .filter(([, operations]) => Object.keys(operations as Record<string, unknown>).length > 0),
  );

  return {
    ...spec,
    paths: filteredPaths,
  };
}

function sortJson(value: unknown): unknown {
  if (Array.isArray(value)) {
    return value.map(sortJson);
  }

  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value)
        .sort(([left], [right]) => left.localeCompare(right))
        .map(([key, nestedValue]) => [key, sortJson(nestedValue)]),
    );
  }

  return value;
}

function stableStringify(value: unknown) {
  return JSON.stringify(sortJson(value));
}

function mergeObjectMaps(
  target: JsonObject,
  source: JsonObject,
  conflictLabel: string,
) {
  for (const [key, value] of Object.entries(source)) {
    if (!(key in target)) {
      (target as Record<string, unknown>)[key] = value;
      continue;
    }

    if (stableStringify(target[key]) !== stableStringify(value)) {
      console.warn(`Keeping existing ${conflictLabel}.${key} definition during OpenAPI merge.`);
    }
  }
}

function mergeSpecs(specs: JsonObject[]) {
  if (specs.length === 0) {
    throw new Error("No specs were downloaded.");
  }

  const firstSpec = specs[0]!;
  const rest = specs.slice(1);
  const merged: JsonObject = structuredClone(firstSpec);
  const mergedPaths = (merged.paths ??= {}) as JsonObject;
  const mergedComponents = (merged.components ??= {}) as JsonObject;
  const mergedTags = Array.isArray(merged.tags) ? [...merged.tags] : [];
  const seenTagNames = new Set(
    mergedTags
      .filter((tag): tag is { name?: string } => typeof tag === "object" && tag !== null)
      .map((tag) => tag.name)
      .filter((name): name is string => typeof name === "string"),
  );

  for (const spec of rest) {
    const sourcePaths = (spec.paths ?? {}) as JsonObject;
    mergeObjectMaps(mergedPaths, sourcePaths, "paths");

    const sourceComponents = (spec.components ?? {}) as JsonObject;
    for (const [componentSection, componentValue] of Object.entries(sourceComponents)) {
      const targetSectionValue = mergedComponents[componentSection];
      const targetSection = (
        targetSectionValue && typeof targetSectionValue === "object"
          ? targetSectionValue
          : ((mergedComponents[componentSection] = {}) as JsonObject)
      ) as JsonObject;
      mergeObjectMaps(targetSection, (componentValue ?? {}) as JsonObject, `components.${componentSection}`);
    }

    if (Array.isArray(spec.tags)) {
      for (const tag of spec.tags) {
        if (typeof tag !== "object" || tag === null) {
          continue;
        }

        const tagName = "name" in tag && typeof tag.name === "string" ? tag.name : undefined;
        if (!tagName || seenTagNames.has(tagName)) {
          continue;
        }

        seenTagNames.add(tagName);
        mergedTags.push(tag);
      }
    }
  }

  if (mergedTags.length > 0) {
    merged.tags = mergedTags;
  }

  return merged;
}

async function main() {
  const environment = getEnvironment();
  const baseHost = getBaseHost(environment);

  await rm(schemaDir, { recursive: true, force: true });
  await mkdir(schemaDir, { recursive: true });

  const downloadedSpecs: JsonObject[] = [];
  for (const service of SERVICES) {
    const url = `https://${baseHost}/${service}/openapi/v1.json`;
    const outputPath = path.join(schemaDir, `${service}.openapi.json`);
    const schema = await fetchJson(url);
    await writeFile(outputPath, `${JSON.stringify(schema, null, 2)}\n`);
    downloadedSpecs.push(schema);
  }

  const joinedSpec = mergeSpecs(downloadedSpecs);
  await writeFile(joinedSpecPath, `${JSON.stringify(joinedSpec, null, 2)}\n`);
  const filteredSpec = removeDeprecatedOperations(joinedSpec);
  await writeFile(filteredSpecPath, `${JSON.stringify(filteredSpec, null, 2)}\n`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

import { execFile } from "node:child_process";
import { mkdir, rm } from "node:fs/promises";
import { promisify } from "node:util";
import path from "node:path";
import process from "node:process";

const inputSpecPath = path.resolve("openapi/schemas/rapidata.filtered.openapi.json");
const outputDir = path.resolve("src/generated");
const generatorCliPath = path.resolve("node_modules/openapi-typescript-codegen/bin/index.js");
const execFileAsync = promisify(execFile);

async function main() {
  await rm(outputDir, { recursive: true, force: true });
  await mkdir(outputDir, { recursive: true });

  await execFileAsync(process.execPath, [
    generatorCliPath,
    "--input",
    inputSpecPath,
    "--output",
    outputDir,
    "--client",
    "fetch",
    "--useOptions",
    "--useUnionTypes",
    "--exportSchemas",
    "false",
  ], {
    cwd: process.cwd(),
  });
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

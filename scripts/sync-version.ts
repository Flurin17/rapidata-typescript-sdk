import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const packageJsonPath = path.resolve("package.json");
const versionFilePath = path.resolve("src/version.ts");

async function main() {
  const packageJson = JSON.parse(await readFile(packageJsonPath, "utf8")) as { version?: string };
  if (!packageJson.version) {
    throw new Error("package.json does not contain a version field.");
  }

  await writeFile(
    versionFilePath,
    `export const SDK_VERSION = "${packageJson.version}";\n`,
    "utf8",
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

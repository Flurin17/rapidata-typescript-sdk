import { mkdir, mkdtemp, readFile, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("open", () => ({
  default: vi.fn(async () => undefined),
}));

import openBrowser from "open";
import { RapidataClient, rapidataConfig } from "../src/index";

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "content-type": "application/json",
    },
  });
}

describe("authentication bootstrap", () => {
  let originalHome: string | undefined;
  let tempHome: string;

  beforeEach(async () => {
    originalHome = process.env.HOME;
    tempHome = await mkdtemp(path.join(tmpdir(), "rapidata-ts-sdk-"));
    process.env.HOME = tempHome;
    rapidataConfig.enableBetaFeatures = false;
    rapidataConfig.logging.enableOtlp = true;
  });

  afterEach(() => {
    if (originalHome) {
      process.env.HOME = originalHome;
    } else {
      delete process.env.HOME;
    }
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it("reuses stored credentials, updates last_used, and can reset them", async () => {
    const credentialsPath = path.join(tempHome, ".config", "rapidata", "credentials.json");
    await mkdir(path.dirname(credentialsPath), { recursive: true });
    await writeFile(
      credentialsPath,
      `${JSON.stringify({
        "https://auth.rapidata.ai": [
          {
            display_name: "Stored Client",
            client_id: "stored-client",
            client_secret: "stored-secret",
            endpoint: "https://auth.rapidata.ai",
            created_at: "2025-01-01T00:00:00.000Z",
            last_used: "2025-01-02T00:00:00.000Z",
          },
        ],
      }, null, 2)}\n`,
    );

    const fetchMock = vi.fn(async (input: string | URL, init?: RequestInit) => {
      const url = String(input);
      if (url.includes("/releases/latest")) {
        return jsonResponse({ tag_name: "v0.1.0" });
      }
      if (url.endsWith("/connect/token")) {
        expect(String(init?.body)).toContain("client_id=stored-client");
        expect(String(init?.body)).toContain("client_secret=stored-secret");
        return jsonResponse({
          access_token: "access-token",
          token_type: "Bearer",
          expires_in: 3600,
        });
      }
      if (url.endsWith("/connect/userinfo")) {
        return jsonResponse({
          sub: "stored-client",
          email: "admin@example.com",
          role: ["Admin"],
        });
      }
      throw new Error(`Unexpected fetch: ${url}`);
    });
    vi.stubGlobal("fetch", fetchMock);

    const client = new RapidataClient();
    await client.ready;

    expect(rapidataConfig.enableBetaFeatures).toBe(true);

    const storedAfterReady = JSON.parse(await readFile(credentialsPath, "utf8")) as Record<string, Array<Record<string, string>>>;
    expect(storedAfterReady["https://auth.rapidata.ai"]?.[0]?.last_used).not.toBe("2025-01-02T00:00:00.000Z");

    await client.resetCredentials();

    const storedAfterReset = JSON.parse(await readFile(credentialsPath, "utf8")) as Record<string, unknown>;
    expect(storedAfterReset["https://auth.rapidata.ai"]).toBeUndefined();
  });

  it("bootstraps new credentials through the bridge-token browser flow", async () => {
    const fetchMock = vi.fn(async (input: string | URL, init?: RequestInit) => {
      const url = String(input);
      if (url.includes("/releases/latest")) {
        return jsonResponse({ tag_name: "v0.1.0" });
      }
      if (url.includes("/identity/bridge-token?clientId=rapidata-cli")) {
        return jsonResponse({ readKey: "read-key", writeKey: "write-key" });
      }
      if (url.includes("/identity/bridge-token?readKey=read-key")) {
        const attempt = fetchMock.mock.calls.filter(([request]) => String(request).includes("readKey=read-key")).length;
        if (attempt === 1) {
          return jsonResponse({ message: "pending" }, 202);
        }
        return jsonResponse({ accessToken: "bridge-access-token" });
      }
      if (url.endsWith("/Client")) {
        expect(init?.headers).toBeDefined();
        return jsonResponse({
          clientId: "new-client",
          clientSecret: "new-secret",
        });
      }
      if (url.endsWith("/connect/token")) {
        return jsonResponse({
          access_token: "oauth-token",
          token_type: "Bearer",
          expires_in: 3600,
        });
      }
      if (url.endsWith("/connect/userinfo")) {
        return jsonResponse({
          sub: "new-client",
          email: "user@example.com",
          role: ["User"],
        });
      }
      throw new Error(`Unexpected fetch: ${url}`);
    });
    vi.stubGlobal("fetch", fetchMock);

    const client = new RapidataClient();
    await client.ready;

    expect(openBrowser).toHaveBeenCalledTimes(1);
    expect(openBrowser).toHaveBeenCalledWith(expect.stringContaining("writeKey=write-key"));

    const credentialsPath = path.join(tempHome, ".config", "rapidata", "credentials.json");
    const storedCredentials = JSON.parse(await readFile(credentialsPath, "utf8")) as Record<string, Array<Record<string, string>>>;
    expect(storedCredentials["https://auth.rapidata.ai"]?.[0]).toMatchObject({
      client_id: "new-client",
      client_secret: "new-secret",
    });
  });
});

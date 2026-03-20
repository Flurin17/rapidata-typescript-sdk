import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("open", () => ({
  default: vi.fn(async () => undefined),
}));

import * as otelApi from "@opentelemetry/api";
import { RapidataApiClient, SDK_VERSION } from "../src/index";
import type { RapidataError } from "../src/index";

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "content-type": "application/json",
    },
  });
}

describe("RapidataApiClient", () => {
  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it("injects auth and X-Client headers and caches lazy service proxies", async () => {
    const injectSpy = vi.spyOn(otelApi.propagation, "inject");
    const fetchMock = vi.fn(async (input: string | URL, init?: RequestInit) => {
      const url = String(input);
      if (url.endsWith("/connect/token")) {
        return jsonResponse({
          access_token: "oauth-token",
          token_type: "Bearer",
          expires_in: 3600,
        });
      }
      if (url.endsWith("/order/ord_1")) {
        const headers = new Headers(init?.headers);
        expect(headers.get("authorization")).toBe("Bearer oauth-token");
        expect(headers.get("x-client")).toBe(`RapidataTypeScriptSDK/${SDK_VERSION}`);
        return jsonResponse({
          orderName: "Order 1",
          customerMail: "owner@example.com",
          orderDate: "2025-01-01T00:00:00Z",
          state: "Created",
          pipelineId: "pipe_1",
          isLocked: false,
          isPublic: false,
        });
      }
      throw new Error(`Unexpected fetch: ${url}`);
    });
    vi.stubGlobal("fetch", fetchMock);

    const api = new RapidataApiClient({
      clientId: "client-id",
      clientSecret: "client-secret",
    });

    expect(api.order).toBe(api.order);

    const order = await api.order.getOrder({ orderId: "ord_1" });
    expect(order.orderName).toBe("Order 1");
    expect(injectSpy).toHaveBeenCalled();
  });

  it("normalizes generated errors into RapidataError", async () => {
    const fetchMock = vi.fn(async (input: string | URL) => {
      const url = String(input);
      if (url.endsWith("/connect/token")) {
        return jsonResponse({
          access_token: "oauth-token",
          token_type: "Bearer",
          expires_in: 3600,
        });
      }
      if (url.endsWith("/order/ord_401")) {
        return jsonResponse({ detail: "Unauthorized" }, 401);
      }
      throw new Error(`Unexpected fetch: ${url}`);
    });
    vi.stubGlobal("fetch", fetchMock);

    const api = new RapidataApiClient({
      clientId: "client-id",
      clientSecret: "client-secret",
    });

    await expect(api.order.getOrder({ orderId: "ord_401" })).rejects.toEqual(
      expect.objectContaining<RapidataError>({
        name: "RapidataError",
        message: "Unauthorized",
        statusCode: 401,
      }),
    );
  });
});

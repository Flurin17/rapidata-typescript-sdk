import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("open", () => ({
  default: vi.fn(async () => undefined),
}));

import { RapidataClient } from "../src/index";

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "content-type": "application/json",
    },
  });
}

describe("parity managers", () => {
  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it("creates classification orders, uploads datapoints, previews, and submits with preceding order support", async () => {
    const requests: Array<{ url: string; init?: RequestInit }> = [];
    const fetchMock = vi.fn(async (input: string | URL, init?: RequestInit) => {
      const url = String(input);
      requests.push({ url, init });

      if (url.includes("/releases/latest")) {
        return jsonResponse({ tag_name: "v0.1.0" });
      }
      if (url.endsWith("/connect/userinfo")) {
        return jsonResponse({ sub: "client", email: "user@example.com", role: ["User"] });
      }
      if (url.endsWith("/order")) {
        return jsonResponse({
          orderId: "ord_1",
          datasetId: "ds_1",
          pipelineId: "pipe_1",
          campaignId: "camp_1",
        });
      }
      if (url.endsWith("/dataset/ds_1/datapoint")) {
        return jsonResponse({ datapointId: crypto.randomUUID?.() ?? "dp_1" });
      }
      if (url.endsWith("/order/ord_1/preview")) {
        return jsonResponse({});
      }
      if (url.endsWith("/order/ord_1")) {
        if (init?.method === "PATCH") {
          return jsonResponse({});
        }
        return jsonResponse({
          orderName: "Test Order",
          customerMail: "owner@example.com",
          orderDate: "2025-01-01T00:00:00Z",
          state: "Created",
          pipelineId: "pipe_1",
          isLocked: false,
          isPublic: false,
        });
      }
      if (url.endsWith("/order/ord_1/submit")) {
        return jsonResponse({});
      }
      throw new Error(`Unexpected fetch: ${url}`);
    });
    vi.stubGlobal("fetch", fetchMock);

    const client = new RapidataClient({
      token: { accessToken: "static-token" },
    });
    await client.ready;

    const order = await client.order.createClassificationOrder(
      "Test Order",
      "Pick one",
      ["Yes", "No"],
      ["alpha", "beta"],
      "text",
    );

    expect(order.id).toBe("ord_1");
    expect(requests.filter(({ url }) => url.endsWith("/dataset/ds_1/datapoint"))).toHaveLength(2);

    await order.run("after-order-id");

    const patchRequest = requests.find(({ url, init }) => url.endsWith("/order/ord_1") && init?.method === "PATCH");
    expect(patchRequest).toBeDefined();
    expect(JSON.parse(String(patchRequest?.init?.body))).toMatchObject({
      precedingOrderId: "after-order-id",
    });

    const submitRequest = requests.find(({ url }) => url.endsWith("/order/ord_1/submit"));
    expect(submitRequest).toBeDefined();
    expect(JSON.parse(String(submitRequest?.init?.body))).toMatchObject({
      ignoreFailedDatapoints: true,
    });
  });

  it("creates validation sets and assigns jobs to audiences", async () => {
    const requests: Array<{ url: string; init?: RequestInit }> = [];
    const fetchMock = vi.fn(async (input: string | URL, init?: RequestInit) => {
      const url = String(input);
      requests.push({ url, init });

      if (url.includes("/releases/latest")) {
        return jsonResponse({ tag_name: "v0.1.0" });
      }
      if (url.endsWith("/connect/userinfo")) {
        return jsonResponse({ sub: "client", email: "user@example.com", role: ["User"] });
      }
      if (url.endsWith("/validation-set")) {
        return jsonResponse({ validationSetId: "vs_1" });
      }
      if (url.endsWith("/validation-set/vs_1")) {
        return jsonResponse({});
      }
      if (url.endsWith("/validation-set/vs_1/rapid")) {
        return jsonResponse({});
      }
      if (url.endsWith("/audience")) {
        return jsonResponse({ id: "aud_1" });
      }
      if (url.endsWith("/job")) {
        return jsonResponse({ jobId: "job_1", recruitingStarted: true });
      }
      if (url.endsWith("/job/job_1")) {
        return jsonResponse({
          jobId: "job_1",
          name: "Job Run",
          definitionId: "def_1",
          audienceId: "aud_1",
          revisionNumber: 1,
          pipelineId: "pipe_job",
          status: "Created",
          createdAt: "2025-01-01T00:00:00Z",
          ownerId: "owner",
          ownerMail: "owner@example.com",
        });
      }
      throw new Error(`Unexpected fetch: ${url}`);
    });
    vi.stubGlobal("fetch", fetchMock);

    const client = new RapidataClient({
      token: { accessToken: "static-token" },
    });
    await client.ready;

    const validationSet = await client.validation.createClassificationSet(
      "Validation Set",
      "Pick one",
      ["Yes", "No"],
      ["sample text"],
      [["Yes"]],
      "text",
      undefined,
      undefined,
      undefined,
      ["quality"],
    );

    expect(validationSet.id).toBe("vs_1");
    const patchBodies = requests
      .filter(({ url }) => url.endsWith("/validation-set/vs_1"))
      .map(({ init }) => JSON.parse(String(init?.body)));
    expect(patchBodies).toContainEqual(expect.objectContaining({ dimensions: ["quality"] }));

    const rapidRequest = requests.find(({ url }) => url.endsWith("/validation-set/vs_1/rapid"));
    expect(JSON.parse(String(rapidRequest?.init?.body))).toMatchObject({
      payload: expect.objectContaining({ _t: "ClassifyPayload" }),
      truth: expect.objectContaining({ _t: "AttachCategoryTruth" }),
    });

    const audience = await client.audience.createAudience("Audience 1");
    const job = await audience.assignJob("def_1", {
      name: "Job Run",
      priority: 42,
    });

    expect(job.id).toBe("job_1");
    const assignJobRequest = requests.find(({ url }) => url.endsWith("/job"));
    expect(JSON.parse(String(assignJobRequest?.init?.body))).toMatchObject({
      jobDefinitionId: "def_1",
      audienceId: "aud_1",
      name: "Job Run",
      priority: 42,
    });
  });
});

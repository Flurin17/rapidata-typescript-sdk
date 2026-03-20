# Rapidata TypeScript SDK

Standalone TypeScript SDK for the Rapidata API.

## Install

```bash
npm install @flurin17/rapidata-typescript-sdk
```

## Usage

```ts
import { RapidataClient } from "@flurin17/rapidata-typescript-sdk";

const client = new RapidataClient({
  clientId: process.env.RAPIDATA_CLIENT_ID,
  clientSecret: process.env.RAPIDATA_CLIENT_SECRET,
});

const orders = await client.order.findOrders("", 1);
console.log(orders.items);
```

## Features

- Handwritten high-level `RapidataClient` facade
- Generated low-level OpenAPI client under `@flurin17/rapidata-typescript-sdk/generated`
- Browser-based bridge-token bootstrap and local credential caching
- GitHub Actions release workflow with npm publishing

## Development

```bash
npm ci
npm run verify
```

## Release

This repository ships through GitHub Actions. The release workflow:

- bumps the package version
- syncs the runtime version constant
- runs lint, typecheck, tests, and build
- publishes the package to npm
- creates a Git tag and GitHub release

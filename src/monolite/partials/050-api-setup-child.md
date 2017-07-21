---
title: Child app setup
category: REST API
path: /v1/_setup/{app_name}
type: GET
---

**Requires authentication with the root app access/secret keys**

Creates a new child app and generates the first pair of API keys. You are responsible for creating the database table
and index for the new app. Equivalent to calling `Para.newApp()` from your Java code.

### Request

- `{app_name}` - the name of the child app

#### Parameters

- `sharedTable` - Set it to `false` if the app should have its own table
- `sharedIndex` - Set it to `false` if the app should have its own index

### Response

Returns the access and secret keys for this application which will be used for request signing.

- **status codes** - `200`, `403`

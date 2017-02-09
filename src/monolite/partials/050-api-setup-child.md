---
title: Child app setup
category: REST API
path: /v1/_setup/{app_name}
type: GET
---

**Requires authentication with the root app access/secret keys**

Creates a new child app and generates the first pair of API keys. You are responsible for creating the database table
and index for the new app.

### Request

- `{app_name}` - the name of the child app

### Response

Returns the access and secret keys for this application which will be used for request signing.

- **status codes** - `200`, `403`

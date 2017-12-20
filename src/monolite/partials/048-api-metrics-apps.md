---
title: System metrics
category: REST API
path: /v1/_metrics/{appid}
type: GET
---

Allows the root app to access the metrics of other apps. This endpoint is only accessible with the root app's credentials.
If a normal app calls this endpoint it will return the metrics for that app, exactly like `GET /v1/_metrics`.

### Request

- `{appid}` - the `id` of an app

#### Parameters

- `pretty` - setting this will enable pretty printing

### Response

- **status codes** - `200`

No content.
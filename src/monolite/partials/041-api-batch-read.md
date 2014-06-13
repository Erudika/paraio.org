---
title: Batch read
category: REST API
path: /v1/_batch
type: GET
---

Returns a list of objects given their `id` fields.
**Note:** Requests to this path and `/v1/{type}` are handled identically.

### Parameters

- `ids` - a list of `id`s of existing objects (required).

**Example:** `GET /v1/_batch?ids=id1&ids=id2&ids=id3`

### Response

- **status codes** - `200`, `400` (if no `ids` are specified)

Example response for reading 3 objects:

```js
[ { "id":"id1", ... }, { "id":"id2", ... }, { "id":"id3", ... } ]
```
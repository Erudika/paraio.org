---
title: Batch delete
category: REST API
path: /v1/_batch
type: DELETE
---

Deletes multiple objects with a single request.

### Request

- **body** - a JSON array of objects to update (required).

**Note:** The only required fields are `id` and `type`.
For example `DELETE [{ "id":"id1", "type":"myobject" }, { "id":"id2", "type":"myobject" }]`
will delete these two objects.

### Response

- **status codes** - `200`, `400` (if request body is missing)

No content.
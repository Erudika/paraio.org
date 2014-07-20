---
title: Batch delete
category: REST API
path: /v1/_batch
type: DELETE
---

Deletes multiple objects with a single request.

### Parameters

- `ids` - a list of `id`s of existing objects (required).

Example: `DELETE /v1/_batch?ids=1&ids=2` will delete the two objects with an `id` of `1` and `2`, respectively.

### Response

- **status codes** - `200`, `400` (if request maximum number of `ids` is over the limit of ~30)

No content.
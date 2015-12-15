---
title: Check permission
category: REST API
path: /v1/_permissions/{subjectid}/{resource}/{method}
type: GET
---

This checks if a subject is allowed to execute a specific type of request on a resource.

### Request

- `{subjectid}` - the subject/user `id` to grant permissions to. (required)
- `{resource}` - the name of the resource. (required)
- `{method}` - an HTTP method name. (required)

### Response

Returns a boolean plain text response - `true` or `false`.

- **status codes** - `200`, `400`, `404`

Example response:
```
true
```
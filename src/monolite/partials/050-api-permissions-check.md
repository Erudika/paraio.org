---
title: Check permission
category: REST API
path: /v1/_permissions/{subjectid}/{resource}/{method}
type: GET
---

This checks if a subject is allowed to execute a specific type of request on a resource.

There are several methods and flags which control which requests can go through. These are:
- `GET`, `POST`, `PUT`, `PATCH`, `DELETE` - use these to allow a certain method explicitly
- `?` - use this to enable public (unauthenticated) access to a resource
- `-` - use this to deny all access to a resource
- `*` - wildcard, allow all request to go through
- `OWN` - allow subject to only access objects they created

### Request

- `{subjectid}` - the subject/user `id` to grant permissions to, or wildcard `*`. (required)
- `{resource}` - the resource path or object type (URL encoded), or wildcard `*`. (required)
- `{method}` - an HTTP method or flag, listed above. (required)

### Response

Returns a boolean plain text response - `true` or `false`.

- **status codes** - `200`, `400`, `404`

Example response:
```
true
```
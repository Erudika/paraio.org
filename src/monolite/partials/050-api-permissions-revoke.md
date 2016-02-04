---
title: Revoke permissions
category: REST API
path: /v1/_permissions/{subjectid}/{resource}
type: DELETE
---

Revokes all permissions for a given subject and resource. If `{resource}` is not specified, revokes every permission
that has been granted to that subject.

### Request

- `{subjectid}` - the subject/user `id` to grant permissions to (required)
- `{resource}` - the resource path or object type (URL encoded). If omitted,
**all permissions** for that subject will be revoked. (optional)

### Response

Returns a JSON object containing the resource permissions for the given user.

- **status codes** - `200`, `400`, `404`

Example response:
```js
{
  "user1": [],
}
```
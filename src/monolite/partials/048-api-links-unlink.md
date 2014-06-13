---
title: Unlink objects
category: REST API
path: /v1/{type}/{id}/links
type: DELETE
---

Unlinks the object with the specified `{id}` from another object.

### Request

- `{type}` - the type of the first object, e.g. "users"
- `{id}` - the `id` of the first object

#### Parameters

- `type` - the `type` of the second object (required unless `all` is set)
- `id` - the `id` field of the second object (not required)
- `all` - if set, all linked objects will be unlinked from this one (not required, `id`, `type` are ignored if set)
- `childrenOnly` - if set, all child objects will be deleted rather than unlinked (be careful!)

**Note:**

- If `all` is not set and `id` is set - the two objects are unlinked.
- If both `all` and `id` are not set, but `childrenOnly` is set then the child objects with type `type` are **deleted**!
(these are the objects with `parentid` equal to `{id}` above)

### Response

- **status codes** - `200`

No content.
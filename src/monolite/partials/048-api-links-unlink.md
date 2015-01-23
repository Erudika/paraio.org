---
title: Unlink objects
category: REST API
path: /v1/{type}/{id}/links/{type2}/{id2}
type: DELETE
---

Unlinks or deletes the objects linked to the object with the specified `{id}`.

### Request

- `{type}` - the type of the first object, e.g. "users"
- `{id}` - the `id` of the first object
- `{type2}` - the `type` of the second object (not required, if this and `{id2}` are missing, it will unlink everything)
- `{id2}` - the `id` field of the second object (not required)

#### Parameters

- `all` -
- `childrenonly` - if set, all child objects will be deleted rather than unlinked (be careful!)

**Note:**
- If both `{type2}` and `{id2}` are not set, **all linked objects will be unlinked from this one**.
- If `id` is set - the two objects are unlinked.
- If `all` and `id` are not set, but `childrenonly` is set then the child objects with type `type` are **deleted**!
(these are the objects with `parentid` equal to `{id}` above)

### Response

- **status codes** - `200`

No content.
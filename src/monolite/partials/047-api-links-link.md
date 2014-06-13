---
title: Link objects
category: REST API
path: /v1/{type}/{id}/links
type: POST
---

This will link the object with `{id}` to another object with the specified id in the `id` parameter.
The created link represents a many-to-many relationship (see also [one-to-many relationships](#019-one-to-many)).

Creating one-to-many links is trivial - just set the `parentid` of an object (child) to be equal to
the `id` field of another object (parent).

### Request

- `{type}` - the type of the first object, e.g. "users"
- `{id}` - the `id` of the first object

#### Parameters

- `type` - the `type` of the second object (required)
- `id` - the `id` field of the second object (required)

### Response

Returns the `id` of the `Linker` object - the `linkId`.

- **status codes** - `200`, `400` (if any of the parameters are missing)

Example response:

```js
"linkid"
```
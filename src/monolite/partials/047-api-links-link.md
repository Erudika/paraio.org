---
title: Link objects
category: REST API
path: /v1/{type}/{id}/links/{id2}
type: POST
---

This will link the object with `{id}` to another object with the specified id in the `id` parameter.
The created link represents a many-to-many relationship (see also [one-to-many relationships](#019-one-to-many)).

Don't use this method for "one-to-many" links. Creating one-to-many links is trivial - just set the `parentid`
of an object (child) to be equal to the `id` field of another object (parent).

`PUT` requests to this resource are equivalent to `POST`.

### Request

- `{type}` - the type of the first object, e.g. "users"
- `{id}` - the `id` of the first object
- `{id2}` - the `id` field of the second object (required)

### Response

Returns the `id` of the `Linker` object - the `linkId` - which contains the types and ids of the two objects.

- **status codes** - `200`, `400` (if any of the parameters are missing)

Example response:

```js
"type1:id1:type2:id2"
```
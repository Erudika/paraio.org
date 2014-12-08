---
title: Read by id
category: REST API
path: /v1/_id/{id}
type: GET
---

Returns the object for the given `{id}`.

### Request

- `{id}` - the `id`

### Response

Returns a JSON object.

- **status codes** - `200`, `404`

Example response:
```js
{
	"id" : "417283630780387328",
  "timestamp" : 1409572755025,
  "type" : "user",
	"name" : "Gordon Freeman"
	...
}
```
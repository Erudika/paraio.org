---
title: Read object
category: REST API
path: /v1/{type}/{id}
type: GET
---

Returns an object of type `{type}`.

### Request

- `{type}` - the plural form of the object's type, e.g. "users"
- `{id}` - the `id`

**Note:** If `{id}` is omitted then the response will be a list of all objects of the specified type.

### Response

- **status codes** - `200`, `404`

Example response for a `Tag`:

```js
{
	"id":"tag:tag1",
	"timestamp":1399721289987,
	"type":"tag",
	"appid":"para",
	"name":"tag tag:tag1",
	"votes":0,
	"plural":"tags",
	"objectURI":"/tags/tag1",
	"tag":"tag1",
	"count":0
}
```
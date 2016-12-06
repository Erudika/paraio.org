---
title: Overwrite object
category: REST API
path: /v1/{type}/{id}
type: PUT
---

Overwrites an object of type `{type}`. If the object with this `{id}` doesn't exist then a new one will be created.

### Request

- **body** - the JSON data to merge with the stored object
- `{type}` - the plural form of the object's type, e.g. "users"
- `{id}` - the `id`

### Response

- **status codes** - `200`, `400`, `404`, `500`

Example response for a `Tag` with updated `count`:

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
	"count":55
}
```
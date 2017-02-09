---
title: Update object
category: REST API
path: /v1/{type}/{id}
type: PATCH
---

Updates an existing object of type `{type}`. Partial objects are supported, meaning that only a few fields could be
updated, without having to send the whole object.

**Vote requests**: these are a special kind of `PATCH` request, which has a body like `{"_voteup": "user123"}` or
`{"_votedown": "user123"}`. Here `user123` is the `id` of the voter. A successful vote request either increments or
decrements the `votes` field by 1.

### Request

- **body** - the JSON object to merge with the stored object **OR** a vote request body like `{"_voteup": "user123"}`
- `{type}` - the plural form of the object's type, e.g. "users"
- `{id}` - the `id`

### Response

- **status codes** - `200`, `400`, `404`, `500`, vote requests return `true` or `false`

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
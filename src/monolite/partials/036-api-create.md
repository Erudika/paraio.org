---
title: Create object
category: REST API
path: /v1/{type}
type: POST
---

Creates a new object of type `{type}`. You can also create objects with custom types and fields (since v1.4.0).

### Request

- **body** - the JSON object to create
- `{type}` - the plural form of the object's type, e.g. "users"

**Example request body:**

```js
{
	"type":"tag",
	"plural":"tags",
	"tag":"tag1"
}
```
Notice how the `type` field is in singular form and the `plural` field is the plural form of the type's name.
These are required for mapping types to URLs.

### Response

- **status codes** - `201`, `400`

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

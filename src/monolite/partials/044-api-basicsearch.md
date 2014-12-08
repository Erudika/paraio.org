---
title: Basic search
category: REST API
path: /v1/{type}/search/{querytype}
type: GET
---

Searches for objects of type `{type}`.
**Note:** Requests to this path and `/v1/{type}` are handled identically.

### Request

- `{type}` - the plural form of the object's type, e.g. "users"
- `{querytype}` - the type of query to execute (optional, see [Search](#015-search))
- `{id}` - the `id`

#### Parameters

- `q` - a search query string (optional). Defaults to `*` (all).
- `desc` - sort order - `true` for descending (optional). Default is `true`.
- `sort` - the field to sort by (optional).
- `page` - starting page for results (optional). (note: page size is 30 items by default)

### Response

- **status codes** - `200`

Example response for querying all tags:
```js
{
	"page":0,
	"totalHits":3,
	"items":[{
		"id":"tag:tag3",
		"timestamp":1400077389250,
		"type":"tag",
		"appid":"para",
		"name":"tag tag:tag3",
		"votes":0,
		"plural":"tags",
		"objectURI":"/tags/tag3",
		"tag":"tag3",
		"count":0
	}, {
		"id":"tag:tag1",
		"timestamp":1400077383588,
		"type":"tag",
		"appid":"para",
		"name":"tag tag:tag1",
		"votes":0,
		"plural":"tags",
		"objectURI":"/tags/tag1",
		"tag":"tag1",
		"count":0
	}, {
		"id":"tag:tag2",
		"timestamp":1400077386726,
		"type":"tag",
		"appid":"para",
		"name":"tag tag:tag2",
		"votes":0,
		"plural":"tags",
		"objectURI":"/tags/tag2",
		"tag":"tag2",
		"count":0
	}]
}
```
---
title: Find linked objects
category: REST API
path: /v1/{type}/{id}/links
type: GET
---

Call this method to search for objects that linked to the object with the given `{id}`.

### Request

- `{type}` - the type of the first object, e.g. "users"
- `{id}` - the `id` of the first object

#### Parameters

- `type` - the `type` of the second object (required)
- `id` - the `id` field of the second object (not required)
- `childrenOnly` - if set and `id` is not set, will return a list of child objects
(these are the objects with `parentid` equal to `{id}` above)

### Response

- If the `id` parameter is specified, the response will be a boolean - `true` if objects are linked.
- If the `id` parameter is missing, the response will be a list of linked objects. (pagination parameters are applicable)
- `childrenOnly` - if set, the response will be a list of child objects (pagination parameters are applicable)

- **status codes** - `200`, `400` (if `type` parameter is missing)

Example response if `id` is missing:

```js
{
	"totalHits":X,
	"items":[
		...
	]
}
```
Response if `id` is specified: `true` or `false`
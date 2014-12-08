---
title: "Me" object
category: REST API
path: /v1/_me
type: GET
---

Returns the currently authenticated `User` or `App` object. If the request is unauthenticated 401 error is returned.

### Request

**No parameters**.

### Response

Returns the JSON object for the authenticated `User` or `App`.

- **status codes** - `200`, `401`

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
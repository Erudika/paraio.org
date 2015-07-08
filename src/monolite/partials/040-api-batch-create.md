---
title: Batch create
category: REST API
path: /v1/_batch
type: POST
---

Creates multiple objects with a single request. `PUT` requests to this resource are equivalent to `POST`.

### Request

- **body** - a JSON array of objects to create (required).

**Maximum request size is 1 megabyte.**

### Response

- **status codes** - `200`, `400`

Example response for creating 3 objects (returns a list of the created objects):

```js
[ { "id":"id1", ... }, { "id":"id2", ... }, { "id":"id3", ... } ]
```
---
title: Batch update
category: REST API
path: /v1/_batch
type: PUT
---

Updates multiple objects with a single request.

### Request

- **body** - a JSON array of objects to update (required).

**Maximum request size is 1 megabyte.**

### Response

- **status codes** - `200`, `400`

Example response for updating 3 objects (returns a list of the updated objects):

```js
[ { "id":"id1", ... }, { "id":"id2", ... }, { "id":"id3", ... } ]
```
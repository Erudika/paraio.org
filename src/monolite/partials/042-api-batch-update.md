---
title: Batch update
category: REST API
path: /v1/_batch
type: PATCH
---

Updates multiple objects with a single request. Partial objects are supported.
**Note:** These objects will not be validated as this would require us to read them first and validate them one by one.

### Request

- **body** - a JSON array of objects to update (required). The fields `id` and `type` are required for each object.

**Maximum request size is 1 megabyte.**

### Response

- **status codes** - `200`, `400`, `412`

If optimistic locking is enabled and the `DAO` implementation supports it, failed updates will be ignored and
omitted from the response array. Error `412` is returned only if all object failed to update due to version locking.

Example response for updating 3 objects (returns a list of the updated objects):

```js
[ {
    "id":"id1",
    "type":"type1",
    "name":"newName1", ...
  }, {
    "id":"id2",
    "type":"type2",
    "name":"newName2", ...
  }, {
     "id":"id3",
     "type":"type3",
     "name":"newName3", ...
} ]
```
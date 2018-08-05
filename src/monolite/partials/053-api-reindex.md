---
title: Rebuild index
category: REST API
path: /v1/_reindex
type: POST
---

Rebuilds the entire search index by reading all objects from the data store and reindexing them to a new index.
This operation is synchronous - the request will return a response once reindexing is complete.

**Example:** `POST /v1/_reindex`

### Request parameters

- `destinationIndex` - the name of the new index (optional).
**Use only if you have created the new destination index manually**.

### Response

Returns a JSON object.

- **status codes** - `200`, `404`

Example response - returns the result without envelope:
```js
{
   "reindexed": 154,
   "tookMillis": 365
}
```
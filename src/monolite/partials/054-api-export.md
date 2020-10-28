---
title: Data Export
category: REST API
path: /v1/_export
type: GET
---

Exports a ZIP backup archive of all the data in a Para app. The archive contains multiple JSON files
containing the Para objects.


### Request

- `{method}` - the name of the method to call (one of the above)

### Response

Returns `application/zip` response - the ZIP backup file.

- **status codes** - `200`

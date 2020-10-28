---
title: Data Import
category: REST API
path: /v1/_import
type: PUT
---

Imports a ZIP backup archive into an app, overwriting all existing objects.

### Request

Accepts only a `application/zip` request body which should be a previously exported ZIP backup file.

#### Parameters

- `filename` - the name of the file which is being restored. This will be saved as a record of the executed import job.

### Response

Returns an import summary object as JSON.

- **status codes** - `200`, `400` (if import job failed)

Example response - returns the result without envelope:
```js
{
  "id": "1232047097503551488",
  "timestamp": 1603827503065,
  "type": "paraimport",
  "appid": "test1",
  "count": 4502,
  "name": "myapp_20201026_155306.zip"
}
```
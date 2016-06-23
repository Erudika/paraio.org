---
title: Add custom setting
category: REST API
path: /v1/_settings/{key}
type: PUT
---

Adds a new custom app setting or overwrites an existing one.

### Request

- **body** - a JSON object with a single value field: `{ "value": "setting_value" }`,
the value can be `boolean`, `Number` or `String`.
- `{key}` - a key from the settings map

### Response

Returns back the value that was supplied.

- **status codes** - `200`

Example response:

```js
{
	"value": "123U3VTNifLPqnZ1W2",
}
```
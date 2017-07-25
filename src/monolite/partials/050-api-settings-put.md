---
title: Add custom setting
category: REST API
path: /v1/_settings/{key}
type: PUT
---

Adds a new custom app setting or overwrites an existing one. To overwrite all app settings, make a `PUT` request without
providing the `key` parameter, like so:

```
PUT /v1/_settings
{
	"fb_app_id": "123U3VTNifLPqnZ1W2",
	"fb_secret": "YXBwOnBhcmE11234151667",
	"signin_success": "/dashboard",
	"signin_failure": "/signin?error"
}
```
This will replace all app-specific settings with the JSON object in that request.

### Request

- **body** - a JSON object with a single value field: `{ "value": "setting_value" }`,
or an object containing all app-specific configuration properties.
- `{key}` - a key from the settings map **(optional)**. If `{key}` is missing, all app settings will be overwritten by
the JSON in the body of the request.

### Response

Returns an empty response.

- **status codes** - `200`
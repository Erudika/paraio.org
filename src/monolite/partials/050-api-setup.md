---
title: Initial setup (public)
category: REST API
path: /v1/_setup
type: GET
---

**This resource is publicly accessible without authentication.**

Creates the root application and generates the first pair of API keys. Calling this method will enable you to access
the REST API.

### Request

**No parameters**.

### Response

Returns the access and secret keys for this application which will be used for request signing.

- **status codes** - `200`

Example response:
```js
{
	"secretKey": "U3VTNifLPqnZ1W2S3pVVuKG4HOVbimMocdDMl8T69BB001AXGZtwZw==",
	"accessKey": "YXBwOnBhcmE=",
	"info": "Save the secret key! It is showed only once!"
}
```
Subsequent calls to this method return:

```js
{
	"code": 200
	"message": "All set!"
}
```
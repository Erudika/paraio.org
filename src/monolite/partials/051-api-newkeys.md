---
title: Reset API keys
category: REST API
path: /v1/newkeys
type: POST
---

This will reset your API secret key by generating a new one.
Make sure you save it and use it for signing future requests.

### Request

**No paramteres**.

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
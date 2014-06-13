---
title: Authentication
category: REST API
---

Para uses the **AWS Signature Version 4** algorithm for signing API requests. We chose this algorithm instead
of OAuth because it is less complicated and is already implemented inside the AWS Java SDK, which we have a direct
dependency. In terms of security, both algorithms are considered very secure so there's no compromise in that aspect.

In order to make a request to the API you need to have a pair of access and secret keys. Access keys are part of the
HTTP request and secret keys are used for signing only and must be kept safe.


### First-time setup

Call `GET /v1/setup` to get your first key pair. Once you do this you will get back a response like:

```js
{
	"secretKey": "U3VTNifLPqnZ1W2S3pVVuKG4HOVbimMocdDMl8T69BB001AXGZtwZw==",
	"accessKey": "YXBwOnBhcmE=",
	"info":		"Save the secret key! It is showed only once!"
}
```

Make sure you **save** these security credentials because the API can only be accessed with them. Once you have the
keys you can start making signed requests to the API. Also you can use these keys to create applications which will
have their own separate keys (see [Apps](#34)).

### Changing keys

Call `POST /v1/newkeys` to generate a new secret key (*the request must be signed with the old keys*).

> For more information see the [AWS documentation](http://docs.aws.amazon.com/AmazonS3/latest/API/sig-v4-authenticating-requests.html)
for REST authentication.
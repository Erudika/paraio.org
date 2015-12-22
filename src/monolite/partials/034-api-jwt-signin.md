---
title: Sign in (JWT)
category: REST API
path: /jwt_auth
type: POST
---

Takes an identity provider access token and fetches the user data from that provider. A new `User` object is created
if that user doesn't exist and is then returned. Access tokens are returned upon successful authentication
using one of the SDKs from Facebook, Google, Twitter, etc.

**Note:** Twitter uses OAuth 1 and gives you a token and a token secret so you must concatenate them first -
`{oauth_token}:{oauth_token_secret}`, and then use that as the provider access token.

### Request

- **body** - a JSON object containing `appid`, `provider` and `token` properties (required).

Request body example:
```
{
	"appid": "app:myapp",
	"provider": "facebook",
	"token": "eyJhbGciOiJIUzI1NiJ9.eWIiO..."
}
```
The `appid` is the id of your own app that you're trying to sing in to. The `provider` value is a string and can be
one of `facebook`, `google`, `twitter`, `github`, `linkedin`.

### Response

Returns a JSON object containing JWT properties and a `User` object. The returned JWT properties are:

- `access_token` - the JWT access token.
- `expires` - a Java timestamp of when the token will expire.
- `refresh` - a Java timestamp indicating when API clients should refresh their tokens,
usually 1 hour after token has been issued.

- **status codes** - `200`, `400`

Example response:
```js
{
	"jwt": {
		"access_token": "eyJhbGciOiJIUzI1NiJ9.eyJ...",
		"expires": 1450137214490,
		"refresh": 1450137216490
	},
	"user": {
		"id":"user1",
		"timestamp": 1399721289987,
		"type":"user",
		"appid":"myapp",
		...
	}
}
```
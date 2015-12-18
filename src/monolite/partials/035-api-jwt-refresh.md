---
title: Token refresh (JWT)
category: REST API
path: /jwt_auth
type: GET
---

Refreshes the access token if and only if the provided token is valid and not expired.
Tokens should be refreshed periodically in order to keep users logged in for longer periods of time.

### Request

Request should include an `Authorization: Bearer {JWT_TOKEN}` header containing a valid access token. (required)
As an alternative you could provide the token as query parameter instead of a header.

### Response

Returns a JSON object containing a **new** JWT token and the same `User` object. The returned JWT properties are:

- `access_token` - the JWT access token.
- `expires` - a Java timestamp of when the token will expire.
- `refresh` - a Java timestamp indicating when API clients should refresh their tokens.

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
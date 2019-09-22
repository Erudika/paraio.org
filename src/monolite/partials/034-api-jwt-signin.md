---
title: Sign in (JWT, public)
category: REST API
path: /jwt_auth
type: POST
---

Takes an identity provider access token and fetches the user data from that provider. A new `User` object is created
if that user doesn't exist and is then returned. Access tokens are returned upon successful authentication
using one of the SDKs from Facebook, Google, Twitter, etc.

**Note:** Twitter uses OAuth 1 and gives you a token and a token secret so you must concatenate them first -
`{oauth_token}:{oauth_token_secret}`, and then use that as the provider access token.
Also if you use the `password` provider, the `token` parameter must be in the format `{email}:{full_name}:{password}` or
`{email}::{password}` (must be `::` if name is empty). For LDAP the token looks similar - `{uid}:{password}` (single `:`).

Also keep in mind that when a new user signs in with a password and unverified email, through `/jwt_auth`,
Para will create the user but will return an error `400` indicating that the user is not active and cannot be authenticated.
Once the email is verified and the user is set to `active: true`, subsequent sign in attempts will be successful.

### Request

- **body** - a JSON object containing `appid`, `provider` and `token` properties (required).

Request body example for authenticating with email and password:
```
{
	"appid": "app:myapp",
	"provider": "password",
	"token": "user@domain.com::password123"
}
```
Request body example for Facebook:
```
{
	"appid": "app:myapp",
	"provider": "facebook",
	"token": "eyJhbGciOiJIUzI1NiJ9.eWIiO..."
}
```
The `appid` is the id of your own app that you're trying to sign in to. The `provider` field a string and can be
one of the following values:
- `facebook` - sign in with Facebook account,
- `google` - sign in with Google account,
- `twitter` - sign in with Twitter account,
- `github` - sign in with GitHub account,
- `linkedin` - sign in with LinkedIn account,
- `microsoft` - sign in with Microsoft account,
- `slack` - sign in with Slack account,
- `password` - sign in with email and password.
- `oauth2` - sign in with generic OAuth 2.
- `oauth2second` - sign in with "second" generic OAuth 2 provider.
- `oauth2third` - sign in with "third" generic OAuth 2 provider.
- `ldap` - sign in with LDAP.

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

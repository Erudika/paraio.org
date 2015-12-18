---
title: Revoke all tokens (JWT)
category: REST API
path: /jwt_auth
type: DELETE
---

Revokes all user tokens for the user that is currently logged in. This would be equivalent to "logout everywhere".
**Note:** Generating a new API secret on the server will also invalidate all client tokens.

### Request

Request should include an `Authorization: Bearer {JWT_TOKEN}` header containing a valid access token. (required)
As an alternative you could provide the token as query parameter instead of a header.

### Response

Returns a JSON object containing a **new** JWT token and the same `User` object. The returned JWT properties are:

- `access_token` - the JWT access token.
- `expires` - a Java timestamp of when the token will expire.
- `refresh` - a Java timestamp indicating when API clients should refresh their tokens.

- **status codes** - `200`, `400`

Example response (response is empty):
```
200 OK
```
---
title: Custom authentication
category: Security
---

Para supports custom authentication providers through its "passwordless" filter. This means that you can send any user
info to Para and it will authenticate that user automatically without passwords.

This mechanism is implemented in the `PasswordlessAuthFilter` class.

The default URL for this filter is `/passwordless_auth` and all requests to this location will be intercepted and processed
by it. It accepts the following parameters:
- `token` - a JWT generated on an external backend (for example your login server).
- `appid` - the Para app identifier
- `redirect` - if set to `false` redirects are disabled and JWT is returned in response body

Also see the configuration properties `para.security.signin_success` and `para.security.signin_failure` in section Config.
These can be set for each app individually as `signin_success` and `signin_failure` in the app's settings.
For apps other than the root app use `/passwordless_auth?appid=myapp`.

You can disable redirects and configure the filter to return the authentication JWT directly in the response body with the
request parameter `?redirect=false`. If the authentication is succesful, a `text/plain` response is returned containing
the actual Para JWT which can later be presented to the `/v1/_me` endpoint for checking if a user is logged in.

Custom authentication flow:

1. A user wants to sign in to Para and clicks a button
2. The button redirects the user to a remote login page you or your company set up.
3. The user enters their credentials and logs in.
4. If the credentials are valid, you send back a special JSON Web Token (JWT) to Para with the user's basic information.
5. Para verifies the token and if it's valid, the request is redirected to the `signin_success` URL, otherwise to the
`signin_failure` URL

The JWT must contain the following claims:

- `email` - user's email address
- `name` - user's display name
- `identifier` - some unique ID for that user in the format `custom:1234`
- `appid` - the Para app identifier (optional)

The JWT signature is verified using the secret key value which you provide in your configuration:
- for the root app `app:para` set `para.app_secret_key = "long_random_string"`
- for child apps - add a property to the app's `settings` field:
```
{
	"id": "app:myapp",
	"settings": {
		"app_secret_key": "long_random_string"
	}
}
```
This key must be at least 32 symbols in length and random. **This key is different from the Para secret key for your app.**
The JWT should have a short validity period (e.g. 10 min). The JWT should also contain the claims `iat` and `exp` and
optionally `nbf`.

Once you generate the JWT on your backend (step 4 above), redirect the successful login request back to Para:
```
GET https://para-host/passwordless_auth?appid=myapp&token=eyJhbGciOiJIUzI1NiI..
```
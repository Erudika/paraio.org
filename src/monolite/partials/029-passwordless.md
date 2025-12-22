---
title: Custom authentication
category: Security
---

Para supports custom authentication providers through its "passwordless" filter. This means that you can send any user
info to Para and it will authenticate that user automatically without passwords.

This mechanism is implemented in the `PasswordlessAuthFilter` class.

The default URL for this filter is `/passwordless_auth` and all requests to this location will be intercepted and processed
by it. It accepts the following query parameters:
- `token` or `jwt` - a JWT generated on an external backend (for example your login server), or a short-lived ID token from Para (e.g. returned after social login succeeds).
- `appid` - the Para app identifier
- `redirect` - if set to `false` redirects are disabled and JWT is returned in response body as plain text

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
4. If the credentials are valid, your backend generates a JSON Web Token (JWT) and sends it to Para at `/passwordless_auth?token=?` containing the user's data.
5. Para verifies the token and if it's valid, the request is redirected to the `signin_success` URL, otherwise to the
`signin_failure` URL

The token sent to the passwordless authentication filter must be in the JWT format and must contain the following claims:

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

Here's another example for an authentication flow, alternative to the above, combining social login and the passwordless authentication filter:
Let's say you have the following configuration:
```ini
para.gp_app_id = "google app id"
para.gp_secret = "google app secret"
para.security.returnto = "http://localhost:8080/dashboard"
para.security.signin_success = "http://localhost:8080/passwordless_auth?jwt=id&httpOnlyCookie=true&sameSiteCookie=Lax"
para.security.signin_failure = "http://localhost:8080/signin?error?cause=?"
```
1. A user wants to sign in with their Google account to your application and clicks "Sign in with a Google account"
2. The button redirects the user to the Google sign-in page.
3. The user enters their credentials and logs in.
4. If the credentials are valid, Google redirects the user back to `http://locahost:8080/google_auth` (make sure that URL is whitelisted with Google).
5. Para verifies authentication and, if it's valid, redirects the user to `http://localhost:8080/passwordless_auth?jwt=id`
6. The passwordless authentication filter takes the supplied ID token and saves it as a cookie in the user's browser then redirects to `http://localhost:8080/dashboard`

If there's a failure, Para redirects the user to `http://localhost:8080/signin?error?cause=?` and fills in the parameter `cause` with an error message.


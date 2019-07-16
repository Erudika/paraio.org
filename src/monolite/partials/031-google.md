---
title: Google support
category: Security
---

> This describes the web authentication flow with Google. You could also login with an existing access token from
> Google [through the API](#034-api-jwt-signin). This web flow sets a cookie, the API returns a JWT instead.

First of all you need to have your API credentials ready by creating an app in the Google Dev Console.
Then add them to your `application.conf` configuration file:
```
para.gp_app_id = "..."
para.gp_secret = "..."
```
Or add these through the [app settings API](#050-api-settings-put):
```
{
	"gp_app_id": "..."
	"gp_secret": "..."
	"signin_success": "http://success.url"
	"signin_failure": "http://failure.url"
}
```
If you want Para to generate a JWT token upon successful authentication, add the `jwt=?` parameter to your
`signin_success` url. For example `{ "signin_success": "http://success.url?jwt=?" }`.
Para will redirect the user back to your host URL with the generated access token.

Another, slightly more secure, option to receive the JWT from Para is to set the query parameter `?jwt=incookie`, e.g.
`para.signin_success = "http://success.url?jwt=incookie"`. This will make Para pass the token inside a cookie header with
name `appid-auth` where `appid` is the app identifier of your client application. For example, the header for an app like
Scoold will look like `Cookie: scoold-auth={jwt_value}`.

Support for logging in with Google acoounts is implemented by the `GoogleAuthFilter`.
This filter responds to requests at `/google_auth`.

The endpoint expects an `appid` value from the 'state' parameter, e.g. `?state={appid}`. If that parameter is missing,
the default (root) app will be used as authentication target.

To initiate a login with Google just redirect the user to the Google OAuth endpoint:
```
accounts.google.com/o/oauth2/v2/auth
```
Pass the parameter `redirect_uri=/google_auth` so Para can handle the response from Google.
For apps other than the root app use `redirect_uri=/google_auth?state=myapp` instead.

**Note:** You need to [register a new application with Google](https://console.developers.google.com/iam-admin/projects)
in order to obtain an access and secret keys.

Below is an example Javascript code for a Google login button:

```js
$("#googleLoginBtn").click(function() {
		var baseUrl = window.location.origin;
		window.location = "https://accounts.google.com/o/oauth2/v2/auth?" +
				"client_id={GOOGLE_APP_ID}&response_type=code" +
				"&scope=openid%20email&redirect_uri=" + baseUrl + "/google_auth" +
				"&state=" + APPID + "&" + "openid.realm=" + baseUrl;
		return false;
});
```
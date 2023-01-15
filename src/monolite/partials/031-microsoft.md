---
title: Microsoft support
category: Security
---

> This describes the web authentication flow with Microsoft. You could also login with an existing access token from
> Microsoft [through the API](#034-api-jwt-signin). This web flow sets a cookie, the API returns a JWT instead.

First of all you need to have your API credentials ready by creating an app on Microsoft.
Then add them to your `application.conf` configuration file:
```
para.ms_app_id = "..."
para.ms_secret = "..."
para.security.signin_success = "http://success.url"
para.security.signin_failure = "http://failure.url"
```
Or add these through the [app settings API](#050-api-settings-put):
```
{
	"ms_app_id": "..."
	"ms_secret": "..."
	"signin_success": "http://success.url"
	"signin_failure": "http://failure.url"
}
```
Para can return a short-lived ID token back to the client which initiated the request. Add `jwt=id` to your
`signin_success` url. For example `{ "signin_success": "http://success.url?jwt=id" }`. The `id` value of the parameter
will be replaced with the actual JWT ID token, which you can use to call `paraClient.signIn("passwordless", idToken)` to
get the long-lived session token.

Support for logging in with Microsoft accounts is implemented by the `MicrosoftAuthFilter`.
This filter responds to requests at `/microsoft_auth`.

The endpoint expects an `appid` value from the 'state' parameter, e.g. `?state={appid}`. If that parameter is missing,
the default (root) app will be used as authentication target.

To initiate a login with Microsoft just redirect the user to the Microsoft OAuth endpoint:
```
login.microsoftonline.com/common/oauth2/v2.0/authorize
```
Pass the parameter `redirect_uri=/microsoft_auth?state=myapp` so Para can handle the response from Microsoft.

**Note:** You need to [register a new application with Microsoft](https://apps.dev.microsoft.com/#/appList)
in order to obtain an access and secret keys.

Below is an example Javascript code for a Microsoft login button:

```js
$("#microsoftLoginBtn").click(function() {
		window.location = "https://login.microsoftonline.com/common/oauth2/v2.0/authorize?" +
				"response_type=code&client_id={MICROSOFT_APP_ID}" +
				"&scope=https%3A%2F%2Fgraph.microsoft.com%2Fuser.read&state=" + APPID +
				"&redirect_uri=" + window.location.origin + "/microsoft_auth;
		return false;
});
```
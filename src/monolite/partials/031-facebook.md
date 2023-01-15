---
title: Facebook support
category: Security
---

> This describes the web authentication flow with Facebook. You could also login with an existing access token from
> Facebook [through the API](#034-api-jwt-signin). This web flow sets a cookie, the API returns a JWT instead.

First of all you need to have your API credentials ready by creating an app in the Facebook Dev Center.
Then add them to your `application.conf` configuration file:
```
para.fb_app_id = "..."
para.fb_secret = "..."
```
Or add these through the [app settings API](#050-api-settings-put):
```
{
	"fb_app_id": "..."
	"fb_secret": "..."
	"signin_success": "http://success.url"
	"signin_failure": "http://failure.url"
}
```
Para can return a short-lived ID token back to the client which initiated the request. Add `jwt=id` to your
`signin_success` url. For example `{ "signin_success": "http://success.url?jwt=id" }`. The `id` value of the parameter
will be replaced with the actual JWT ID token, which you can use to call `paraClient.signIn("passwordless", idToken)` to
get the long-lived session token.

Support for logging in with Facebook is implemented by the `FacebookAuthFilter`. This filter responds to requests at
`/facebook_auth`.

The endpoint expects an `appid` value from the 'state' parameter, e.g. `?state={appid}`. If that parameter is missing,
the default (root) app will be used as authentication target.

To initiate a login with Facebook just redirect the user to the Facebook OAuth endpoint:
```
facebook.com/dialog/oauth
```
Pass the parameter `redirect_uri=/facebook_auth` so Para can handle the response from Facebook.
For apps other than the root app use `redirect_uri=/facebook_auth?state=myapp` instead.

**Note:** You need to [register a new application with Facebook](https://developers.facebook.com/)
in order to obtain an access and secret keys.

Below is an example Javascript code for a Facebook login button:

```js
$("#facebookLoginBtn").click(function() {
		window.location = "https://www.facebook.com/dialog/oauth?" +
				"response_type=code&client_id={FACEBOOK_APP_ID}" +
				"&scope=email&state=" + APPID +
				"&redirect_uri=" + window.location.origin + "/facebook_auth";
		return false;
});
```
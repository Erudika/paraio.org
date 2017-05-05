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
}
```
Support for logging in with Google acoounts is implemented by the `GoogleAuthFilter`.
This filter responds to requests at `/google_auth`.

To initiate a login with Google just redirect the user to the Google OAuth endpoint:
```
accounts.google.com/o/oauth2/auth
```
Pass the parameter `redirect_uri=/google_auth` so Para can handle the response from Google.
For apps other than the root app use `redirect_uri=/google_auth?appid=myapp` instead.

**Note:** You need to [register a new application with Google](https://console.developers.google.com/iam-admin/projects)
in order to obtain an access and secret keys.

Below is an example Javascript code for a Google login button:

```js
$("#googleLoginBtn").click(function() {
		var baseUrl = window.location.origin;
		window.location = "https://accounts.google.com/o/oauth2/auth?" +
				"client_id={GOOGLE_APP_ID}&response_type=code" +
				"&scope=openid%20email&redirect_uri=" + baseUrl + "/google_auth" +
				"&state=" + (new Date().getTime()) + "&" + "openid.realm=" + baseUrl;
		return false;
});
```
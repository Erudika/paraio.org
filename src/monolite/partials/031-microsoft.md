---
title: Microsoft support
category: Security
---

**Update:** From v1.17.1 we support an easier way to login with Microsoft [through the API](#034-api-jwt-signin).
Authentication is implemented using JWT tokens instead of cookies.

First of all you need to have your API credentials ready by creating an app on Microsoft.
Then add them to your `application.conf` configuration file:
```
para.ms_app_id = "..."
para.ms_secret = "..."
```
Or add these through the [app settings API](#050-api-settings-put):
```
{
	"ms_app_id": "..."
	"ms_secret": "..."
}
```
Support for logging in with Microsoft accounts is implemented by the `MicrosoftAuthFilter`.
This filter responds to requests at `/microsoft_auth`.

To initiate a login with Microsoft just redirect the user to the Microsoft OAuth endpoint
`login.microsoftonline.com/common/oauth2/v2.0/authorize`. Pass the parameter `redirect_uri=/microsoft_auth` so Para
can handle the response from Microsoft. For apps other than the root app use the `/microsoft_auth?appid=myapp` parameter.

**Note:** You need to [register a new application with Microsoft](https://apps.dev.microsoft.com/#/appList)
in order to obtain an access and secret keys.

Below is an example Javascript code for a Microsoft login button:

```js
$("#microsoftLoginBtn").click(function() {
		window.location = "https://login.microsoftonline.com/common/oauth2/v2.0/authorize?" +
				"response_type=code&client_id={MICROSOFT_APP_ID}" +
				"&scope=https%3A%2F%2Fgraph.microsoft.com%2Fuser.read&state=" + (new Date().getTime()) +
				"&redirect_uri=" + window.location.origin + "/microsoft_auth;
		return false;
});
```
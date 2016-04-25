---
title: Facebook support
category: Security
---

**Update:** From v1.17.1 we support an easier way to login with Facebook [through the API](#034-api-jwt-signin).
Authentication is implemented using JWT tokens instead of cookies.

First of all you need to have your API credentials ready by creating an app in the Facebook Dev Center.
Then add them to your `application.conf` configuration file:
```cfg
para.fb_app_id = "..."
para.fb_secret = "..."
```

Support for logging in with Facebook is implemented by the `FacebookAuthFilter`. This filter responds to requests at
`/facebook_auth`.

To initiate a login with Facebook just redirect the user to the Facebook OAuth endpoint
`facebook.com/dialog/oauth`. Pass the parameter `redirect_uri=/facebook_auth` so Para
can handle the response from Facebook.

**Note:** You need to register a new application with Facebook in order to obtain an access and secret keys.

Below is an example Javascript code for a Facebook login button:

```js
$("#facebookLoginBtn").click(function() {
		window.location = "https://www.facebook.com/dialog/oauth?" +
				"response_type=code&client_id={FACEBOOK_APP_ID}" +
				"&scope=email&state=" + (new Date().getTime()) +
				"&redirect_uri=" + window.location.origin + "/facebook_auth";
		return false;
});
```
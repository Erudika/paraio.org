---
title: Google+ support
category: Security
---

**Update:** From v1.17.1 we support an easier way to login with Google [through the API](#034-api-jwt-signin).
Authentication is implemented using JWT tokens instead of cookies.

First of all you need to have your API credentials ready by creating an app in the Google Dev Console.
Then add them to your `application.conf` configuration file:
```cfg
para.gp_app_id = "..."
para.gp_secret = "..."
```

Support for logging in with Google+ is implemented by the `GoogleAuthFilter`. This filter responds to requests at
`/google_auth`.

To initiate a login with Google+ just redirect the user to the Google OAuth endpoint
`accounts.google.com/o/oauth2/auth`. Pass the parameter `redirect_uri=/google_auth` so Para
can handle the response from Google+.

**Note:** You need to register a new application with Google+ in order to obtain an access and secret keys.

Below is an example Javascript code for a Google+ login button:

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
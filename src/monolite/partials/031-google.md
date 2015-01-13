---
title: Google+ support
category: Security
---

Support for logging in with Google+ is implemented by the `GoogleAuthFilter`. This filter responds to requests at
`/google_auth`.

To initiate a login with Google+ just redirect the user to the link Google OAuth endpoint
`https://accounts.google.com/o/oauth2/auth`. Pass the parameter `redirect_uri=/google_auth` so Para
can handle the response from Google+.

**Note:** You need to register a new application with Google+ in order to obtain an access and secret keys.

Below is an example Javascript code for a Google+ login button:

```js
$("#googleLoginBtn").click(function() {
		var baseUrl = window.location.origin;
		window.location = "https://accounts.google.com/o/oauth2/auth?" +
				"client_id={GOOGLE_APP_ID}&" +
				"response_type=code&scope=openid%20email&redirect_uri=" + baseUrl + "/google_auth&" +
				"state=" + (new Date().getTime()) + "&" + "openid.realm=" + baseUrl;
		return false;
});
```
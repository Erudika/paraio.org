---
title: Facebook support
category: Security
---

Support for logging in with Facebook is implemented by the `FacebookAuthFilter`. This filter responds to requests at
`/facebook_auth`.

To initiate a login with Facebook just redirect the user to the link Facebook API endpoint
`https://www.facebook.com/dialog/oauth`. Pass the parameter `redirect_uri=/facebook_auth` so Para
can handle the response from Facebook.

**Note:** You need to register a new application with Facebook in order to obtain an access and secret keys.

Below is an example Javascript code for a Facebook login button:

```js
$("#facebookLoginBtn").click(function() {
		window.location = "https://www.facebook.com/dialog/oauth?response_type=code" +
				"&client_id={FACEBOOK_APP_ID}&scope=email&state=" + (new Date().getTime()) + "&redirect_uri=" +
				window.location.origin + "/facebook_auth";
		return false;
});
```
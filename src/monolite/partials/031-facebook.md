---
title: Facebook support
category: Security
---

Support for logging in with Facebook is implemented by the `FacebookAuthFilter`. This filter responds to requests at
`/facebook_auth`.

The filter takes three parameters:

- `fbsig` - the signature of the authentication token (required)
- `fbemail` - the email of the user (used for registration)
- `fbname` - the name of the user (used for registration)

Below is an example JavaScript code for a Facebook login button:

```js
$("#fb-login-btn").on("click touchend", function() {
	FB.login(function(response) {
		if (response.authResponse) {
			FB.api("/me", function(resp) {
				window.location = "/facebook_auth?fbsig=" +
					encodeURIComponent(response.authResponse.signedRequest) +
					"&fbname=" + encodeURIComponent(resp.name) +
					"&fbemail=" + encodeURIComponent(resp.email);
			});
		} else {
			window.location = "/facebook_auth";
		}
	}, {scope: "email"});
	return false;
});
```
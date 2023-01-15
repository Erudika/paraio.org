---
title: Amazon support
category: Security
---

> This describes the web authentication flow with Amazon. You could also login with an existing access token from
> Amazon [through the API](#034-api-jwt-signin). This web flow sets a cookie, the API returns a JWT instead.

First of all you need to have your API credentials ready by creating an app on Amazon.
Then add them to your `application.conf` configuration file:
```
para.az_app_id = "..."
para.az_secret = "..."
para.security.signin_success = "http://success.url"
para.security.signin_failure = "http://failure.url"
```
Or add these through the [app settings API](#050-api-settings-put):
```
{
	"az_app_id": "..."
	"az_secret": "..."
	"signin_success": "http://success.url"
	"signin_failure": "http://failure.url"
}
```
Para can return a short-lived ID token back to the client which initiated the request. Add `jwt=id` to your
`signin_success` url. For example `{ "signin_success": "http://success.url?jwt=id" }`. The `id` value of the parameter
will be replaced with the actual JWT ID token, which you can use to call `paraClient.signIn("passwordless", idToken)` to
get the long-lived session token.

Support for logging in with Amazon accounts is implemented by the `AmazonAuthFilter`.
This filter responds to requests at `/amazon_auth`.

The endpoint expects an `appid` value from the 'state' parameter, e.g. `?state={appid}`. If that parameter is missing,
the default (root) app will be used as authentication target.

To initiate a login with Amazon just redirect the user to the Amazon OAuth endpoint:
```
www.amazon.com/ap/oa
```
Pass the parameter `redirect_uri=/amazon_auth?state=myapp` so Para can handle the response from Amazon.

**Note:** You need to [register a new application with Amazon](https://developer.amazon.com/loginwithamazon/console/site/lwa/overview.html)
in order to obtain an access and secret keys.

Below is an example Javascript code for a Amazon login button:

```js
$("#amazonLoginBtn").click(function() {
		window.location = "https://www.amazon.com/ap/oa?" +
				"response_type=code&client_id=" + AMAZON_APP_ID +
				"&scope=profile&state=" + APPID +
				"&redirect_uri=" + ENDPOINT + "/amazon_auth";
		return false;
});
```
---
title: Twitter support
category: Security
---

> This describes the web authentication flow with Twitter. You could also login with an existing access token from
> Twitter [through the API](#034-api-jwt-signin). This web flow sets a cookie, the API returns a JWT instead.

First of all you need to have your API credentials ready by creating an app on Twitter.
Then add them to your `application.conf` configuration file:
```
para.tw_app_id = "..."
para.tw_secret = "..."
```
Or add these through the [app settings API](#050-api-settings-put):
```
{
	"tw_app_id": "..."
	"tw_secret": "..."
	"signin_success": "http://success.url"
	"signin_failure": "http://failure.url"
}
```
Para can return a short-lived ID token back to the client which initiated the request. Add `jwt=id` to your
`signin_success` url. For example `{ "signin_success": "http://success.url?jwt=id" }`. The `id` value of the parameter
will be replaced with the actual JWT ID token, which you can use to call `paraClient.signIn("passwordless", idToken)` to
get the long-lived session token.

If you want Para to generate a JWT token upon successful authentication, add the `jwt=?` parameter to your
`signin_success` url. For example `{ "signin_success": "http://success.url?jwt=?" }`.
Para will redirect the user back to your host URL with the generated access token.
**Warning: this is less secure and not recommended because the JWT is present in the URL of a `GET` request.**

Support for logging in with Twitter is implemented by the `TwitterAuthFilter`. This filter responds to requests at
`/twitter_auth`.

The endpoint expects an `appid` value from the 'state' parameter, e.g. `?state={appid}`. If that parameter is missing,
the default (root) app will be used as authentication target.

To initiate a login with Twitter just redirect the user to the `/twitter_auth`. This will redirect the user to Twitter
for authentication. For apps other than the root app, redirect to `/twitter_auth?state=myapp`.

**Note:** You need to [register a new application with Twitter](https://apps.twitter.com/)
in order to obtain an access and secret keys.
The Twitter API does not share users' emails by default, you have to ask Twitter to
[whitelist your app first](https://dev.twitter.com/rest/reference/get/account/verify_credentials).

Below is an example Javascript code for a Twitter login button:

```js
$("#twitterLoginBtn").click(function() {
		window.location = "/twitter_auth";
		// for apps other than the root app use:
		// window.location = "/twitter_auth?state=" + APPID;
		return false;
});
```
---
title: Twitter support
category: Security
---

> This describes the web flow authentication with Twitter. You could also login with an existing access token from
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
}
```
Support for logging in with Twitter is implemented by the `TwitterAuthFilter`. This filter responds to requests at
`/twitter_auth`.

To initiate a login with Twitter just redirect the user to the `/twitter_auth`. This will redirect the user to Twitter
for authentication. For apps other than the root app, redirect to `/twitter_auth?appid=myapp`.

**Note:** You need to [register a new application with Twitter](https://apps.twitter.com/)
in order to obtain an access and secret keys.
The Twitter API does not share users' emails by default, you have to ask Twitter to
[whitelist your app first](https://dev.twitter.com/rest/reference/get/account/verify_credentials).

Below is an example Javascript code for a Twitter login button:

```js
$("#twitterLoginBtn").click(function() {
		window.location = "/twitter_auth";
		// for apps other than the root app use:
		// window.location = "/twitter_auth?appid=myapp";
		return false;
});
```
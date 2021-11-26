---
title: Slack support
category: Security
---

> This describes the web authentication flow with Slack. You could also login with an existing access token from
> Slack [through the API](#034-api-jwt-signin). This web flow sets a cookie, the API returns a JWT instead.

First of all you need to have your API credentials ready by creating an app on Slack.
Then add them to your `application.conf` configuration file:
```
para.sl_app_id = "..."
para.sl_secret = "..."
para.security.signin_success = "http://success.url"
para.security.signin_failure = "http://failure.url"
```
Or add these through the [app settings API](#050-api-settings-put):
```
{
	"sl_app_id": "..."
	"sl_secret": "..."
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

Support for logging in with Slack accounts is implemented by the `SlackAuthFilter`.
This filter responds to requests at `/slack_auth`.

The endpoint expects an `appid` value from the 'state' parameter, e.g. `?state={appid}`. If that parameter is missing,
the default (root) app will be used as authentication target.

To initiate a login with Slack just redirect the user to the Slack OAuth endpoint:
```
slack.com/oauth/authorize
```
Pass the parameter `redirect_uri=/slack_auth?state=myapp` so Para can handle the response from Slack.

**Note:** You need to [register a new application with Slack](https://api.slack.com/apps)
in order to obtain an access and secret keys.

Below is an example Javascript code for a Slack login button:

```js
$("#slackLoginBtn").click(function() {
		window.location = "https://slack.com/oauth/authorize?" +
				"response_type=code&client_id={SLACK_APP_ID}" +
				"&scope=identity.basic%20identity.email%20identity.team%20identity.avatar&state=" + APPID +
				"&redirect_uri=" + window.location.origin + "/slack_auth;
		return false;
});
```
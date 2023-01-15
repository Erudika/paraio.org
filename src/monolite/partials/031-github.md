---
title: GitHub support
category: Security
---

> This describes the web authentication flow with GitHub. You could also login with an existing access token from
> GitHub [through the API](#034-api-jwt-signin). This web flow sets a cookie, the API returns a JWT instead.

First of all you need to have your API credentials ready by creating an app on GitHub.
Then add them to your `application.conf` configuration file:
```
para.gh_app_id = "..."
para.gh_secret = "..."
```
Or add these through the [app settings API](#050-api-settings-put):
```
{
	"gh_app_id": "..."
	"gh_secret": "..."
	"signin_success": "http://success.url"
	"signin_failure": "http://failure.url"
}
```
Para can return a short-lived ID token back to the client which initiated the request. Add `jwt=id` to your
`signin_success` url. For example `{ "signin_success": "http://success.url?jwt=id" }`. The `id` value of the parameter
will be replaced with the actual JWT ID token, which you can use to call `paraClient.signIn("passwordless", idToken)` to
get the long-lived session token.

Support for logging in with GitHub is implemented by the `GitHubAuthFilter`. This filter responds to requests at
`/github_auth`.

The endpoint expects an `appid` value from the 'state' parameter, e.g. `?state={appid}`. If that parameter is missing,
the default (root) app will be used as authentication target.

To initiate a login with GitHub just redirect the user to the GitHub OAuth endpoint:
```
github.com/login/oauth/authorize
```
Pass the parameter `redirect_uri=/github_auth` so Para can handle the response from GitHub.
For apps other than the root app use `redirect_uri=/github_auth?state=myapp` instead.

**Note:** You need to [register a new application with GitHub](https://github.com/settings/profile)
in order to obtain an access and secret keys.

Below is an example Javascript code for a GitHub login button:

```js
$("#githubLoginBtn").click(function() {
		window.location = "https://github.com/login/oauth/authorize?" +
				"response_type=code&client_id={GITHUB_APP_ID}" +
				"&scope=user&state=" + APPID +
				"&redirect_uri=" + window.location.origin + "/github_auth";
		return false;
});
```
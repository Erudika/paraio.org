---
title: LinkedIn support
category: Security
---

> This describes the web authentication flow with LinkedIn. You could also login with an existing access token from
> LinkedIn [through the API](#034-api-jwt-signin). This web flow sets a cookie, the API returns a JWT instead.

First of all you need to have your API credentials ready by creating an app on LinkedIn.
Then add them to your `application.conf` configuration file:
```
para.in_app_id = "..."
para.in_secret = "..."
```
Or add these through the [app settings API](#050-api-settings-put):
```
{
	"in_app_id": "..."
	"in_secret": "..."
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

Support for logging in with LinkedIn is implemented by the `LinkedInAuthFilter`. This filter responds to requests at
`/linkedin_auth`.

The endpoint expects an `appid` value from the 'state' parameter, e.g. `?state={appid}`. If that parameter is missing,
the default (root) app will be used as authentication target.

To initiate a login with LinkedIn just redirect the user to the LinkedIn OAuth endpoint:
```
www.linkedin.com/oauth/v2/authorization
```
Pass the parameter `redirect_uri=/linkedin_auth` so Para can handle the response from LinkedIn.
For apps other than the root app use `redirect_uri=/linkedin_auth?state=myapp` instead.

**Note:** You need to [register a new application with LinkedIn](https://www.linkedin.com/developer/apps)
in order to obtain an access and secret keys.

Below is an example Javascript code for a LinkedIn login button:

```js
$("#linkedinLoginBtn").click(function() {
		window.location = "https://www.linkedin.com/oauth/v2/authorization?" +
				"response_type=code&client_id={LINKEDIN_APP_ID}" +
				"&scope=r_liteprofile%20r_emailaddress&state=" + APPID +
				"&redirect_uri=" + window.location.origin + "/linkedin_auth";
		return false;
});
```
---
title: OAuth 2.0 support
category: Security
---

A generic OAuth 2.0 filter is available for situations where you need to use your own authentication server.
It follows the standard OAuth 2.0 flow and requires that you redirect users to a login page first (on your server).
Then, upon successful login, the user is redirected back to `/oauth2_auth` and an access token is obtained.
Finally, the filter tries to get the user's profile with that token, from a specified server, which could be the same
server used for authentication.

Support for generic OAuth authentication is implemented by the `GenericOAuth2Filter`. The default URL for this filter is
`/oauth2_auth`.

The endpoint expects an `appid` value from the 'state' parameter, e.g. `?state={appid}`. If that parameter is missing,
the default (root) app will be used as authentication target.

These are the configuration options for this filter:

<table class="table table-striped">
	<thead>
		<tr>
			<th>property</th>
			<th>description</th>
		</tr>
	</thead>
	<tbody>
		<tr><td>

`para.security.oauth.profile_url`</td><td>API endpoint for user profile. </td></tr>
		<tr><td>

`para.security.oauth.token_url`</td><td>The URL from which the access token will be requested (via `POST`). </td></tr>
		<tr><td>

`para.security.oauth.scope`</td><td>The `scope` parameter of the access token request payload.</td></tr>
		<tr><td>

`para.security.oauth.accept_header`</td><td>The `Accept` header - if blank, the header won't be set. (default is blank). </td></tr>
		<tr><td>

`para.security.oauth.parameters.id`</td><td>The `id` parameter for requesting the user profile (default is `sub`). </td></tr>
		<tr><td>

`para.security.oauth.parameters.picture`</td><td>The `picture` parameter for requesting the user profile (default is `picture`). </td></tr>
		<tr><td>

`para.security.oauth.parameters.email`</td><td>The `email` parameter for requesting the user profile (default is `email`). </td></tr>
		<tr><td>

`para.security.oauth.parameters.name`</td><td>The `name` parameter for requesting the user profile (default is `name`). </td></tr>
		<tr><td>

`para.security.oauth.domain`</td><td> This domain name is used if a valid email can't be obtained (optional).</td></tr>
		<tr><td>

`para.security.oauth.token_delegation_enabled`</td><td> Enable/disable access token delegation. If enabled, access tokens will be saved
inside the user object's `password` field and sent for validation to the IDP on each authentication request (using JWTs). (default is `false`).
		</td></tr>
	</tbody>
</table>

You can configure the URLs for authentication success and failure in the configuration file (see [the config](#005-config))

You can also set all configuration properties through the [app settings API](#050-api-settings-put):
```
{
	"security.oauth.authz_url": "https://myidp.com/oauth/authorization",
	"security.oauth.token_url": "https://myidp.com/oauth/token",
	"security.oauth.profile_url": "https://myidp.com/oauth/userinfo",
	"security.oauth.scope": "openid email profile",
	...
	"signin_success": "http://success.url",
	"signin_failure": "http://failure.url"
}
```
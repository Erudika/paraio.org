---
title: OAuth 2.0 support
category: Security
---

A generic OAuth 2.0 filter is available for situations where you need to use your own authentication server.
It follows the standard OAuth 2.0 flow and requires that you redirect users to a login page first (on your server).
Then, upon successful login, the user is redirected back to `/oauth2_auth` with the access token.
Finally, the filter tries to get the user's profile with that token, from a specified server, which could be the same
server used for authentication.

Support for generic OAuth authentication is implemented by the `GenericOAuth2Filter`. The default URL for this filter is
`/oauth2_auth`.

These are the configuration options for this filter:

<table class="table table-striped">
	<thead>
		<tr>
			<th>property</th>
			<th>description</th>
		</tr>
	</thead>
	<tbody>
		<tr><td>`para.security.oauth.profile_url`</td><td>API endpoint for user profile. </td></tr>
		<tr><td>`para.security.oauth.token_url`</td><td>The URL from which the access token will be requested (via `POST`). </td></tr>
		<tr><td>`para.security.oauth.scope`</td><td>The `scope` parameter of the access token request payload.</td></tr>
		<tr><td>`para.security.oauth.accept_header`</td><td>The `Accept` header - if blank, the header won't be set. (default is blank). </td></tr>
		<tr><td>`para.security.oauth.parameters.id`</td><td>The `id` parameter for requesting the user profile (default is `id`). </td></tr>
		<tr><td>`para.security.oauth.parameters.picture`</td><td>The `picture` parameter for requesting the user profile (default is `picture`). </td></tr>
		<tr><td>`para.security.oauth.parameters.email`</td><td>The `email` parameter for requesting the user profile (default is `email`). </td></tr>
		<tr><td>`para.security.oauth.parameters.name`</td><td>The `name` parameter for requesting the user profile (default is `name`). </td></tr>
		<tr><td>`para.security.oauth.domain`</td><td> This domain name is used if a valid email can't be obtained (optional).</td></tr>
	</tbody>
</table>

You can configure the URLs for authentication success and failure in the configuration file (see [the config](#005-config))
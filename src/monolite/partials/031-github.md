---
title: GitHub support
category: Security
---

Support for logging in with GitHub is implemented by the `GitHubAuthFilter`. This filter responds to requests at
`/github_auth`.

To initiate a login with GitHub just redirect the user to the GitHub OAuth endpoint
`https://github.com/login/oauth/authorize`. Pass the parameter `redirect_uri=/github_auth` so Para
can handle the response from GitHub.

**Note:** You need to register a new application with GitHub in order to obtain an access and secret keys.

Below is an example Javascript code for a GitHub login button:

```js
$("#githubLoginBtn").click(function() {
		window.location = "https://github.com/login/oauth/authorize?" +
				"response_type=code&client_id={GITHUB_APP_ID}" +
				"&scope=user&state=" + (new Date().getTime()) +
				"&redirect_uri=" + window.location.origin + "/github_auth";
		return false;
});
```
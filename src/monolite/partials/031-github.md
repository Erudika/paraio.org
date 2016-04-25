---
title: GitHub support
category: Security
---

**Update:** From v1.17.1 we support an easier way to login with GitHub [through the API](#034-api-jwt-signin).
Authentication is implemented using JWT tokens instead of cookies.

First of all you need to have your API credentials ready by creating an app on GitHub.
Then add them to your `application.conf` configuration file:
```cfg
para.gh_app_id = "..."
para.gh_secret = "..."
```

Support for logging in with GitHub is implemented by the `GitHubAuthFilter`. This filter responds to requests at
`/github_auth`.

To initiate a login with GitHub just redirect the user to the GitHub OAuth endpoint
`github.com/login/oauth/authorize`. Pass the parameter `redirect_uri=/github_auth` so Para
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
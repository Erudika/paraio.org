---
title: Twitter support
category: Security
---

Support for logging in with Twitter is implemented by the `TwitterAuthFilter`. This filter responds to requests at
`/twitter_auth`.

To initiate a login with Twitter just redirect the user to the link Twitter OAuth endpoint
`https://www.linkedin.com/uas/oauth2/authorization`. Pass the parameter `redirect_uri=/twitter_auth` so Para
can handle the response from Twitter.

**Note:** You need to register a new application with Twitter in order to obtain an access and secret keys.
**The Twitter API does not share users' emails so users are assigned an invalid email
when signing in for the first time.**

Below is an example Javascript code for a Twitter login button:

```js
$("#twitterLoginBtn").click(function() {
		window.location = "https://www.linkedin.com/uas/oauth2/authorization?response_type=code" +
				"&client_id={TWITTER_APP_ID}&scope=r_emailaddress&state=" + (new Date().getTime()) + "&redirect_uri=" +
				window.location.origin + "/twitter_auth";
		return false;
});
```
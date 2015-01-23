---
title: Twitter support
category: Security
---

Support for logging in with Twitter is implemented by the `TwitterAuthFilter`. This filter responds to requests at
`/twitter_auth`.

To initiate a login with Twitter just redirect the user to the `/twitter_auth`. This will redirect the user to Twitter
for authentication.

**Note:** You need to register a new application with Twitter in order to obtain an access and secret keys.
**The Twitter API does not share users' emails so users are assigned an invalid email
when signing in for the first time.**

Below is an example Javascript code for a Twitter login button:

```js
$("#twitterLoginBtn").click(function() {
		window.location = "/twitter_auth";
		return false;
});
```
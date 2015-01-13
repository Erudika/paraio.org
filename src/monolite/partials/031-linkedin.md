---
title: LinkedIn support
category: Security
---

Support for logging in with LinkedIn is implemented by the `LinkedInAuthFilter`. This filter responds to requests at
`/linkedin_auth`.

To initiate a login with LinkedIn just redirect the user to the link LinkedIn OAuth endpoint
`https://www.linkedin.com/uas/oauth2/authorization`. Pass the parameter `redirect_uri=/linkedin_auth` so Para
can handle the response from LinkedIn.

**Note:** You need to register a new application with LinkedIn in order to obtain an access and secret keys.

Below is an example Javascript code for a LinkedIn login button:

```js
$("#linkedinLoginBtn").click(function() {
		window.location = "https://www.linkedin.com/uas/oauth2/authorization?response_type=code" +
				"&client_id={LINKEDIN_APP_ID}&scope=r_emailaddress&state=" + (new Date().getTime()) + "&redirect_uri=" +
				window.location.origin + "/linkedin_auth";
		return false;
});
```
---
title: LinkedIn support
category: Security
---

**Update:** From v1.17.1 we support an easier way to login with LinkedIn [through the API](#034-api-jwt-signin).
Authentication is implemented using JWT tokens instead of cookies.

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
}
```
Support for logging in with LinkedIn is implemented by the `LinkedInAuthFilter`. This filter responds to requests at
`/linkedin_auth`.

To initiate a login with LinkedIn just redirect the user to the LinkedIn OAuth endpoint
`linkedin.com/uas/oauth2/authorization`. Pass the parameter `redirect_uri=/linkedin_auth` so Para
can handle the response from LinkedIn.For apps other than the root app use the `/linkedin_auth?appid=myapp` parameter.

**Note:** You need to [register a new application with LinkedIn](https://www.linkedin.com/developer/apps)
in order to obtain an access and secret keys.

Below is an example Javascript code for a LinkedIn login button:

```js
$("#linkedinLoginBtn").click(function() {
		window.location = "https://www.linkedin.com/uas/oauth2/authorization?" +
				"response_type=code&client_id={LINKEDIN_APP_ID}" +
				"&scope=r_emailaddress&state=" + (new Date().getTime()) +
				"&redirect_uri=" + window.location.origin + "/linkedin_auth";
		return false;
});
```
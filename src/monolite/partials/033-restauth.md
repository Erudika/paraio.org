---
title: Authentication
category: REST API
---

Para uses the **AWS Signature Version 4** algorithm for signing API requests. We chose this algorithm instead
of OAuth because it is less complicated and is already implemented inside the AWS Java SDK, which we have a direct
dependency. In terms of security, both algorithms are considered very secure so there's no compromise in that aspect.

Para offers two ways of authentication - one for apps using API keys and one for insecure clients (mobile, JS) using JWT.
Apps authenticated with a secret key have full access to the API. Users authenticated with social login are issued JWT
tokens and have limited access to the API, for example they can't generate new API keys and they are authorized by
specific resource permissions (see [Resource permissions](#012-permissions)).

### Full access for apps

In order to make a request to the API you need to have a pair of access and secret keys. Access keys are part of the
HTTP request and secret keys are used for signing only and must be kept safe.

We recommend that you choose one of our API client libraries to handle the authentication for you.

### First-time setup

Call `GET /v1/_setup` to get your first key pair. Once you do this you will get back a response like:

```js
{
	"secretKey": "U3VTNifLPqnZ1W2S3pVVuKG4HOVbimMocdDMl8T69BB001AXGZtwZw==",
	"accessKey": "YXBwOnBhcmE=",
	"info":		"Save the secret key! It is showed only once!"
}
```

Make sure you **save** these security credentials because the API can only be accessed with them. Once you have the
keys you can start making signed requests to the API. Also you can use these keys to create applications which will
have their own separate keys (see [Apps](#34)).

**Note:** when a resource has public permissions you can access it without setting the `Authorization` header.
Simply specify your access key as a parameter:
```
GET /v1/public/resource?accessKey=app:myapp
```

### Changing keys

Call `POST /v1/_newkeys` to generate a new secret key (*the request must be signed with the old keys*).

### Disabling API security

To disable the API security completely, set the config parameter `para.security.api_security` to `false`.

If you wish to disable all API functions completely, set the config parameter `para.api_enabled" to `false`.

> For more information see the [AWS documentation](http://docs.aws.amazon.com/AmazonS3/latest/API/sig-v4-authenticating-requests.html)
for REST authentication.

### JSON Web Tokens - client access based on permissions

> **Important:** Access to the root app can be enabled or disabled for API clients.

To allow clients with access tokens to make API calls to the root app, use this configuration property:
```
para.clients_can_access_root_app = true
```
This is useful if you only have one app on the server. When hosting multiple apps on Para, this should be set to `false`.
This does not affect clients that use an `accessKey` and a `secretKey`, only those that use access tokens (JWT).

In production, when Para is deployed as a multitenant server (hosting many apps), it is recommended that API clients
are not allowed to access root app through the API with `para.clients_can_access_root_app = false`.

Para apps can create new users and grant them specific permissions by implementing social login (identity federation).
First a user authenticates with their social identity provider such as Facebook, then comes back to Para with the
`access_token` and is issued a new JSON Web Token that allows him to access the REST API.

JWT tokens are a new standard for authentication which is similar to cookies but is more secure, compact and stateless.
An encoded token looks like this:

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG
4gRG9lIiwiYWRtaW4iOnRydWV9.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ
```
When decoded the token looks like this:

```js
// HEADER:
{
  "alg": "HS256",
  "typ": "JWT"
}
// PAYLOAD:
{
  "sub": "587408205806571520",
  "appid": "app:para",
	"refresh": 1450137214490,
  "nbf": 1450133614,
	"exp": 1450738414,
	"iat": 1450133614
}
```

To authenticate with users with social login use the Para client:

```java
paraClient.signIn(String provider, String providerToken);
```
Supported providers are `facebook`, `google`, `twitter`, `github`, `linkedin`, `microsoft`, `password`, `oauth2`, `ldap`.

You will have to add the API credentials for each of these in your `application.conf` configuration file:
```bash
# facebook
para.fb_app_id = "..."
para.fb_secret = "..."
# google
para.gp_app_id = "..."
para.gp_secret = "..."
# linkedin
para.in_app_id = "..."
para.in_secret = "..."
# twitter
para.tw_app_id = "..."
para.tw_secret = "..."
# github
para.gh_app_id = "..."
para.gh_secret = "..."
# microsoft
para.ms_app_id = "..."
para.ms_secret = "..."
# generic oauth2
para.oa2_app_id = "..."
para.oa2_secret = "..."
```

For example calling `paraClient.signIn("facebook", "facebook_access_token")` should return a new `User` object and would
store the JWT token in memory. To get an access token from Facebook, use their JavaScript SDK.

After you call `paraClient.signIn()` and the request succeeds, the client caches the access token and **all subsequent
requests** to the API will include that token until `paraClient.signOut()` is called. This is different from the normal
operation using access and secret keys. Tokens can only authenticate users.

To get or set access tokens use:

```java
paraClient.getAccessToken();
paraClient.setAccessToken(String token);
```

To sign out and clear the JWT access token use:

```java
paraClient.signOut();
```

Tokens can also be revoked by calling `paraClient.revokeAllTokens()` but this only works for authenticated users.
The Para client takes care of refreshing the JWT tokens every hour and by default all tokens are valid for a week.

### Creating "super" tokens

Since v1.18.3 we've added the support for "super" JSON web tokens. These are just like normal tokens for users, but
instead of authenticating users we can authenticate apps with them. The give clients full access to the API, bypassing
permissions. You don't need to connect to a social identity provider like Facebook or Twitter - you simply generate
the tokens on the client-side. Your code will need both the access key and secret key for this purpose.

For example, lets assume we have some JavaScript app running in the browser and we need admin access to our Para app.
We could use the [JavaScript client for Para](https://github.com/Erudika/para-client-js) but putting the secret key
inside client-side code on the browser is *not a smart move*. So we pull in a library for generating JWT, like
[jsrsasign](https://github.com/kjur/jsrsasign) and we create the token ourselves. Here's a snippet:

```js
function getJWT(appid, secret) {
	var now = Math.round(new Date().getTime() / 1000);
	var sClaim = JSON.stringify({
		exp: now + (7 * 24 * 60 * 60), // expires at
		iat: now, // issued at
		nbf: now, // not valid before
		appid: appid // app id must be present
	});
	var sHeader = JSON.stringify({'alg': 'HS256', 'typ': 'JWT'});
	return KJUR.jws.JWS.sign(null, sHeader, sClaim, secret);
}
```

Your JS app could ask the user for the access keys, create a JWT and then discard the keys and use the newly generated
"super" token. Once we have this we can attach it to every request as a header:

```js
Authorization: Bearer eyJhbGciOiVCJ9.eyJzdWIiOi0._MKAH6SGiKSoqgwmqUaxuMyE
```
When calling the Para API from JavaScript in the browser, make sure you are running a web server and not as `file:///`
or your browser might not allow CORS requests. Also check that CORS is enabled in Para with `para.cors_enabled = true`.
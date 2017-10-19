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
specific resource permissions (see [Resource permissions](#011-permissions)).

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
operation using access and secret keys. Usually, tokens are used to authenticate users, unless they are "super" tokens,
which can authenticate apps (see below).

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

### Calling the API from Postman

You can access the protected API from Postman since it has support for the AWS Signature v4 algorithm, used in Para.
Open up Postman and in the "Authorization" tab choose "AWS Signature":

<div class="text-center>
<img src="data:image/png;base64,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">
</div>

<table class="table table-striped">
	<tbody>
		<tr><td>Access Key</td><td> Your Para access key, e.g. `app:myapp`.</td></tr>
		<tr><td>Secret Key</td><td> Your Para secret key.</td></tr>
		<tr><td>Region</td><td> Not used. It should always be `us-east-1`.</td></tr>
		<tr><td>Service Name</td><td> This should always be `para`.</td></tr>
	</tbody>
</table>
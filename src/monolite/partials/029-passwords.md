---
title: Simple authentication
category: Security
---

Para implements several authentication mechanisms which you can integrate in your application and make it easy to handle
user registrations and logins.

The classic way of logging users in is with usernames and passwords. Para implements that mechanism in the
`PasswordAuthFilter` class. It takes a username or email and a password and tries to find that user in the database.
If the user exists then it validates that the hash of the given password matches the hash in the database.
The hashing algorithm is **BCrypt**.

The default URL for this filter is `/password_auth` and all requests to this location will be intercepted and processed
by it. The default parameters to pass to it are `email` and `password`.

Also see the configuration properties `para.security.signin_success` and `para.security.signin_failure` in section Config.
These can be set for each app individually as `signin_success` and `signin_failure` in the app's settings.
For apps other than the root app use `/password_auth?appid=myapp`.

Here's an example HTML form for initiating password-based authentication:

```html
<form method="post" action="/password_auth">
	<input type="email" name="email">
	<input type="password" name="password">
	<input type="submit">
</form>
```
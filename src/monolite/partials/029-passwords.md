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

### Creating users programmatically

You can create users from your Java code by using a `ParaClient`. By default, users are created with `active = false`,
i.e. the account is locked until the email address is verified. You can disable email verification with
`para.security.allow_unverified_emails = true`. Another way to get around this is to "verify" the user manually, like so:

```java
// user is created but account is locked
paraClient.signIn("password", "user@example.com:Morgan Freeman:pass123");
// read identifier first to get the user id
ParaObject identifier = paraClient.read("user@example.com");
User user = paraClient.read(identifier.getCreatorid());
user.setActive(true);
User updated = paraClient.update(user); // user is now active
```

After executing the code above, any subsequent calls to `paraClient.signIn()` will be successful and the authenticated
user object will be returned.
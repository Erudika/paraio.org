---
title: OpenID support
category: Security
---

Support for OpenID authentication is implemented by the `OpenIDAuthFilter`. The default URL for this filter is
`/openid_auth`.

The filter takes a request with the `openid_identifier` parameter and redirects the user to their OpenID provider for
verification. Once the user's identity is verified, the provider redirects the user back to our filter and the user gets
either logged in or registered.

You can configure the URLs for authentication success and failure in the configuration file (see [the config](#005-config))
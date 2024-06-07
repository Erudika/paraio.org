---
title: CSRF protection
category: Security
---

Cross-Site Request Forgery protection is enabled by default for all `POST`, `PUT` and `DELETE` requests.
It works by verifying that incoming requests contain a security token (CSRF token) and it matches the one stored on the
server. CSRF protection is disabled for API requests.

To disable the CSRF protection set `para.security.csrf_protection` to `false`.

For example, if you wish to integrate CSRF protection with AngularJS you can do so by setting
the cookie name to `XSRF-TOKEN` which is the default cookie used by AngularJS. Also you need to configure AngularJS to
send the correct CSRF header to Para which is `X-CSRF-TOKEN` like so:

```js
$httpProvider.defaults.xsrfHeaderName = "X-CSRF-TOKEN";
```

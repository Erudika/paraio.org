---
title: Apps
category: Core classes
---

Apps allow you to have separate namespaces and data models for different purposes. Each app lives in its own separate
database and is independent from apps.

Apps have a unique `appid` key which is used to identify them. They also have a set of data types. Data types can be
created on-the-fly, for example you can create a type called "article" and it will have its own API URL at
`/v1/article`

Initially Para creates a default root app with an `id` equal to the value of the `para.app_name`
configuration parameter. If you need to have only one app then you don't need to do anything. If you want to have
multiple apps then you can simply create them with `appid` equal to the root app's `id`.

Currently Para organizes objects in **one table per app** and uses a single shared search index unless that app sets
`shared = false`. If this is the case then a separate search index is created for that app. It is possible to make
Para use a single database table for all apps by prefixing `id` fields (e.g. `app1_id1`: `{data}`) but this is not yet
implemented.

You can set custom settings to each app through the settings API `/v1/_settings` using `GET`, `PUT` and `DELETE`.
These can be OAuth credentials for social apps or other configuration details that are specific for the app.

### Social sign-in for apps

In v1.19 apps can have their own separate credentials for social sign-in, like an OAuth `app_id` and `secret`. These
are stored within the app object and can be used to create/login users to the app that has these credentials.
For example, we can send a request to `/facebook_auth?appid=myapp` where `myapp` is not the root app. This will tell
Para to look for Facebook keys inside that app. This allows for each Para app to have a corresponding Facebook app
(or any other app on the supported social networks, see [JWT sign in](#034-api-jwt-signin)).

Additionally, we've added two custom settings which can tell Para where to redirect users after a successful login or a
login failure. These are `signin_success` and `signin_failure` (see [Custom Settings](#050-api-settings-get)).
Here's an example of all settings combined:

```js
{
	"fb_app_id": "123U3VTNifLPqnZ1W2",
	"fb_secret": "YXBwOnBhcmE11234151667",
	"signin_success": "/dashboard",
	"signin_failure": "/signin?error"
}
```

Note that these settings will work for the traditional authentication flow through the browser and the standard
endpoints `/facebook_auth?appid=myapp`, `/github_auth?appid=myapp`, `/google_auth?appid=myapp`, and the rest.
The other way of authenticating users is through the JWT sign in API which requires an OAuth access token and doesn't
require stored OAuth credentials - these are not even checked because we are supplied with a ready-to-use token.
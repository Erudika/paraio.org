---
title: Apps
category: Core classes
---

Apps allow you to have separate namespaces and data models for different purposes. Each app lives in its own separate
database table and is independent from apps.

Each app has a unique identifier, like "my-custom-app". When an object is created, Para will attach the app identifier
to it automatically. Apps also have a set of data types, as set of permissions and validation constraints.
Data types can be created on-the-fly, for example you can create a type called "article" and it will have be
available as a new API resource at `/v1/article` (and in plural form `/v1/articles`).

### Creating and deleting apps

Initially Para creates a default root app with an `id` equal to the value of the `para.app_name`
configuration parameter. If you need to have only one app then you don't need to do anything. If you want to create
multiple apps then you must call `Para.newApp()` or make an authenticated request to the API `GET /v1/_setup/{app_name}`.
This is a special API request and it **must** be signed with the keys of the *root app*.
Alternatively, download the [Para CLI](https://github.com/Erudika/para-cli) and run:
```sh
$ para-cli setup
$ para-cli new-app "my-app" --name "My new app"
```

Every app can delete itself through the API with `DELETE /v1/app/myapp`. Another way to do this is by programmatically
calling `app.delete()` from your code.

Currently Para organizes objects in **one table per app** and uses a single shared search index unless that app has
`sharingIndex` set to `false`. If this is the case then a separate search index is created for that app.
It is possible to make Para use a single database table for all apps by prefixing `id` fields
(e.g. `app1_id1`: `{data}`) but this is not yet implemented.

You can also set custom settings for each app through the settings API `/v1/_settings` using `GET`, `PUT` and `DELETE`.
These can be OAuth credentials for social apps or other configuration details that are specific for the app.

### Social sign-in for apps

Apps can have their own separate credentials for social sign-in, like an OAuth `app_id` and `secret`. These
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
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
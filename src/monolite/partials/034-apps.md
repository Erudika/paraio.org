---
title: Apps
category: REST API
---

> **Note:** This feature is still being developed and might change.

Apps allow you to have separate namespaces and data models for different purposes. Apps will have separate data tables
and their objects will be independent from one another.

Apps have a unique `appid` key which is used to identify them. They also have a set of data types. Data types can be
created on-the-fly, for example you can create a type called "article" and it will have its own API URL at
`/v1/article`

Initially Para creates a default root app with an `appid` equal to the value of the `para.app_name`
configuration parameter.
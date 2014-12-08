---
title: List types
category: REST API
path: /v1/_types
type: GET
---

Returns a list of all known types for this application, including core types and user-defined types.
User-defined types are custom types which can be defined through the REST API and allow the users to call
the standard CRUD methods on them as if they were defined as regular Para objects.
See [User-defined classes](#010-userdefined) for more details.

### Request

**No parameters**.

### Response

Returns a list of all types that are defined for this application.

- **status codes** - `200`

Example response for querying all types:
```js
[
	"addresses":"address",
	"apps":"app",
	"sysprops":"sysprop",
	"tags":"tag",
	"translations":"translation",
	"users":"user",
	"votes":"vote"
]
```
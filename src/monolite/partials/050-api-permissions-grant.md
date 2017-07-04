---
title: Grant permissions
category: REST API
path: /v1/_permissions/{subjectid}/{resource}
type: PUT
---

Grants a set of permissions (allowed HTTP methods) to a subject for a given resource.

There are several methods and flags which control which requests can go through. These are:
- `GET`, `POST`, `PUT`, `PATCH`, `DELETE` - use these to allow a certain method explicitly
- `?` - use this to enable public (unauthenticated) access to a resource
- `-` - use this to deny all access to a resource
- `*` - wildcard, allow all request to go through

### Request

- **body** - a JSON array of permitted HTTP methods/flags, listed above (required).
- `{subjectid}` - the subject/user `id` to grant permissions to (required)
- `{resource}` - the resource path or object type (URL encoded), for example
`posts` corresponds to `/v1/posts`, `posts%2F123` corresponds to `/v1/posts/123` (required)

### Response

Returns a JSON object containing the resource permissions for the given user.

- **status codes** - `200`, `400`, `404`

Example response:
```js
{
  "user2": {
		"posts": ["GET", "POST"]
	}
}
```
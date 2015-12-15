---
title: List permissions
category: REST API
path: /v1/_permissions/{subjectid}
type: GET
---

Returns a permissions objects containing all permissions. If `{subjectid}` is provided, the returned object contains
only the permissions for that subject.

### Request

- `{subjectid}` - the subject/user `id` (optional)

### Response

Returns a JSON object containing the resource permissions for the given user.

- **status codes** - `200`, `400`, `404`

Example response:
```js
{
  "*": {
		"*": ["GET"]
	},
  "user1": [],
  "user2": {
		"posts": ["GET", "POST"]
	},
  "user3": {
    "*": ["*"]
  }
}
```
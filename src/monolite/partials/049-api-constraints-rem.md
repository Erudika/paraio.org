---
title: Remove constraint
category: REST API
path: /v1/_constraints/{type}/{field}/{cname}
type: DELETE
---

Removes a validation constraint from the list of constraints for the given field and type.

### Request

- `{type}` - the object type to which the constraint applies (required)
- `{field}` - the name of the field to which the constraint applies (required)
- `{cname}` - the constraint name (required, see the table above)

### Response

Returns a JSON object containing the validation constraints for the given type.

- **status codes** - `200`, `400`

Example response:
```js
{
	"User" : {
		"identifier" : {
			"required" : {
				"message" : "messages.required"
			}
		},
		"groups" : {
			"required" : {
				"message" : "messages.required"
			}
		},
		"email" : {
			"required" : {
				"message" : "messages.required"
			},
			"email" : {
				"message" : "messages.email"
			}
		}
	},
	...
}
```